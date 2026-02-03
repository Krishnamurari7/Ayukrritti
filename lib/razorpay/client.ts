import Razorpay from "razorpay";
import { getRazorpayConfig } from "./config";

export interface RazorpayOrderOptions {
  amount: number; // in paise
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayPaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Create a Razorpay instance with dynamic credentials
 * This function fetches credentials from environment variables or database
 */
export async function createRazorpayInstance(): Promise<Razorpay> {
  const config = await getRazorpayConfig();
  
  return new Razorpay({
    key_id: config.keyId,
    key_secret: config.keySecret,
  });
}

// Legacy export for backward compatibility
// This will throw an error if credentials are not in environment variables
let razorpayInstance: Razorpay | null = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export const razorpay = razorpayInstance as Razorpay;
