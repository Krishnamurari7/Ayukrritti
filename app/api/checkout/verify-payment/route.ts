import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyRazorpaySignature } from "@/lib/razorpay/webhook";
import { sendOrderConfirmationEmail } from "@/lib/email/resend";
import { getRazorpayConfig } from "@/lib/razorpay/config";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      body;

    // Get Razorpay config
    const razorpayConfig = await getRazorpayConfig();

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      razorpayConfig.keySecret
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Update order with payment details
    const { data: order, error: updateError } = await supabase
      .from("orders")
      .update({
        razorpay_payment_id,
        payment_status: "paid",
        status: "processing",
      })
      .eq("id", orderId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Process order payment (deduct stock, release locks)
    await supabase.rpc("process_order_payment", {
      p_order_id: orderId,
    });

    // Clear user's cart
    await supabase.from("cart_items").delete().eq("user_id", user.id);

    // Fetch order items for email
    const { data: orderItems } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    // Send confirmation email
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

    return NextResponse.json({
      success: true,
      orderNumber: order.order_number,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: error.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
