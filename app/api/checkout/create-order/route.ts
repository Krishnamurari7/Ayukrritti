import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createRazorpayInstance } from "@/lib/razorpay/client";
import { generateOrderNumber } from "@/lib/utils";

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
    const { shippingAddress, paymentMethod } = body;

    // Fetch cart items
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select(`
        id,
        product_id,
        quantity,
        product:products (
          id,
          name,
          slug,
          price,
          stock_quantity,
          images:product_images (image_url)
        )
      `)
      .eq("user_id", user.id);

    if (cartError || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = cartItems.reduce(
      (acc: number, item: any) => acc + item.product.price * item.quantity,
      0
    );
    const tax = subtotal * 0.08;
    const shipping = subtotal >= 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    // Check inventory and lock stock
    for (const item of cartItems) {
      const cartItem = item as any;
      const { data: lockResult } = await supabase.rpc("check_and_lock_inventory", {
        p_product_id: cartItem.product_id,
        p_quantity: cartItem.quantity,
        p_order_id: null, // Will update after order creation
      });

      if (!lockResult) {
        return NextResponse.json(
          { error: `Insufficient stock for ${cartItem.product.name}` },
          { status: 400 }
        );
      }
    }

    const orderNumber = generateOrderNumber();

    // Create Razorpay order if payment method is razorpay
    let razorpayOrderId = null;
    let razorpayOrder = null;

    if (paymentMethod === "razorpay") {
      try {
        const razorpay = await createRazorpayInstance();
        razorpayOrder = await razorpay.orders.create({
          amount: Math.round(total * 100), // Convert to paise
          currency: "USD",
          receipt: orderNumber,
          notes: {
            order_number: orderNumber,
            user_id: user.id,
          },
        });
        razorpayOrderId = razorpayOrder.id;
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message || "Failed to create payment order" },
          { status: 500 }
        );
      }
    }

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        subtotal,
        tax,
        shipping,
        total,
        status: "pending",
        payment_method: paymentMethod,
        payment_status: paymentMethod === "cod" ? "pending" : "pending",
        razorpay_order_id: razorpayOrderId,
        shipping_address: shippingAddress,
      })
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    // Create order items
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product.name,
      product_image: item.product.images[0]?.image_url || null,
      quantity: item.quantity,
      price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }));

    await supabase.from("order_items").insert(orderItems);

    // Update inventory locks with order_id
    for (const item of cartItems) {
      await supabase
        .from("inventory_locks")
        .update({ order_id: order.id })
        .eq("product_id", item.product_id)
        .is("order_id", null);
    }

    // For COD, process the order immediately
    if (paymentMethod === "cod") {
      await supabase.rpc("process_order_payment", {
        p_order_id: order.id,
      });

      // Clear cart
      await supabase.from("cart_items").delete().eq("user_id", user.id);

      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber: order.order_number,
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      razorpayOrder: razorpayOrder,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
