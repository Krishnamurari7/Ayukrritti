import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { verifyWebhookSignature } from "@/lib/razorpay/webhook";
import {
  sendOrderConfirmationEmail,
  sendRefundProcessedEmail,
} from "@/lib/email/resend";
import { getRazorpayConfig } from "@/lib/razorpay/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Get Razorpay config
    const razorpayConfig = await getRazorpayConfig();
    const webhookSecret = process.env.WEBHOOK_SECRET || razorpayConfig.keySecret;

    // Verify webhook signature
    const isValid = verifyWebhookSignature(
      body,
      signature,
      webhookSecret
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    const supabase = await createAdminClient();

    // Handle different webhook events
    switch (event.event) {
      case "payment.authorized":
      case "payment.captured": {
        const paymentId = event.payload.payment.entity.id;
        const orderId = event.payload.payment.entity.order_id;

        // Find order by razorpay_order_id
        const { data: order } = await supabase
          .from("orders")
          .select("*")
          .eq("razorpay_order_id", orderId)
          .single();

        if (order && order.payment_status !== "paid") {
          // Update order
          await supabase
            .from("orders")
            .update({
              razorpay_payment_id: paymentId,
              payment_status: "paid",
              status: "processing",
            })
            .eq("id", order.id);

          // Process payment (deduct stock)
          await supabase.rpc("process_order_payment", {
            p_order_id: order.id,
          });

          // Send confirmation email
          const { data: orderItems } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          if (orderItems) {
            await sendOrderConfirmationEmail(order.email, {
              orderNumber: order.order_number,
              total: order.total,
              items: orderItems.map((item: any) => ({
                name: item.product_name,
                quantity: item.quantity,
                price: item.price,
              })),
            });
          }
        }
        break;
      }

      case "payment.failed": {
        const orderId = event.payload.payment.entity.order_id;

        // Find order
        const { data: order } = await supabase
          .from("orders")
          .select("id")
          .eq("razorpay_order_id", orderId)
          .single();

        if (order) {
          // Update order status
          await supabase
            .from("orders")
            .update({
              payment_status: "failed",
              status: "cancelled",
            })
            .eq("id", order.id);

          // Release inventory locks
          await supabase.rpc("release_inventory_lock", {
            p_order_id: order.id,
          });
        }
        break;
      }

      case "refund.processed": {
        const refundId = event.payload.refund.entity.id;
        const paymentId = event.payload.refund.entity.payment_id;
        const amount = event.payload.refund.entity.amount / 100; // Convert from paise

        // Find order by payment_id
        const { data: order } = await supabase
          .from("orders")
          .select("*")
          .eq("razorpay_payment_id", paymentId)
          .single();

        if (order) {
          // Update refund record
          await supabase
            .from("refunds")
            .update({
              status: "processed",
              razorpay_refund_id: refundId,
            })
            .eq("order_id", order.id);

          // Send refund email
          await sendRefundProcessedEmail(order.email, {
            orderNumber: order.order_number,
            amount: amount,
          });
        }
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${event.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
