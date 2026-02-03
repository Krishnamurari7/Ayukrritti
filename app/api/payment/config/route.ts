import { NextResponse } from "next/server";
import { getRazorpayConfig } from "@/lib/razorpay/config";

export async function GET() {
  try {
    const config = await getRazorpayConfig();
    
    // Only return the public key ID, never the secret
    return NextResponse.json({
      keyId: config.keyId,
    });
  } catch (error: any) {
    console.error("Error fetching payment config:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch payment configuration" },
      { status: 500 }
    );
  }
}
