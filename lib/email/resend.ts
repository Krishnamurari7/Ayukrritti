import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const fromEmail = process.env.ADMIN_EMAIL || "noreply@example.com";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function sendOrderConfirmationEmail(
  to: string,
  orderData: {
    orderNumber: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
  }
) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Your order ${orderData.orderNumber} has been confirmed.</p>
        <h2>Order Details:</h2>
        <ul>
          ${orderData.items
            .map(
              (item) =>
                `<li>${item.name} x ${item.quantity} - $${item.price}</li>`
            )
            .join("")}
        </ul>
        <p><strong>Total: $${orderData.total}</strong></p>
        <p><a href="${siteUrl}/account/orders/${orderData.orderNumber}">View Order</a></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}

export async function sendOrderShippedEmail(
  to: string,
  orderData: {
    orderNumber: string;
    trackingNumber?: string;
  }
) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Your order ${orderData.orderNumber} has been shipped`,
      html: `
        <h1>Your order is on its way!</h1>
        <p>Order ${orderData.orderNumber} has been shipped.</p>
        ${
          orderData.trackingNumber
            ? `<p>Tracking Number: <strong>${orderData.trackingNumber}</strong></p>`
            : ""
        }
        <p><a href="${siteUrl}/account/orders/${orderData.orderNumber}">Track Order</a></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send order shipped email:", error);
  }
}

export async function sendOrderDeliveredEmail(
  to: string,
  orderData: {
    orderNumber: string;
  }
) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Your order ${orderData.orderNumber} has been delivered`,
      html: `
        <h1>Your order has been delivered!</h1>
        <p>Order ${orderData.orderNumber} has been successfully delivered.</p>
        <p>We hope you enjoy your purchase!</p>
        <p><a href="${siteUrl}/account/orders/${orderData.orderNumber}">View Order</a></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send order delivered email:", error);
  }
}

export async function sendRefundProcessedEmail(
  to: string,
  refundData: {
    orderNumber: string;
    amount: number;
  }
) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Refund processed for order ${refundData.orderNumber}`,
      html: `
        <h1>Refund Processed</h1>
        <p>A refund of $${refundData.amount} has been processed for order ${refundData.orderNumber}.</p>
        <p>The amount will be credited to your original payment method within 5-7 business days.</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send refund email:", error);
  }
}

export async function sendLowStockAlert(
  productData: {
    name: string;
    sku: string;
    currentStock: number;
  }
) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `Low Stock Alert: ${productData.name}`,
      html: `
        <h1>Low Stock Alert</h1>
        <p>Product <strong>${productData.name}</strong> (SKU: ${productData.sku}) is running low on stock.</p>
        <p>Current Stock: <strong>${productData.currentStock}</strong></p>
        <p><a href="${siteUrl}/admin/products">Manage Inventory</a></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send low stock alert:", error);
  }
}
