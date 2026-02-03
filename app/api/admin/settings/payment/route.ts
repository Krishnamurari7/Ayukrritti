import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/crypto";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { keyId, keySecret, encrypt: shouldEncrypt } = body;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Key ID and Key Secret are required" },
        { status: 400 }
      );
    }

    // Encrypt the key secret if requested
    const secretToStore = shouldEncrypt ? encrypt(keySecret) : keySecret;

    // Update or insert key ID
    const { error: keyIdError } = await supabase
      .from("site_settings")
      .upsert(
        {
          key: "razorpay_key_id",
          value: keyId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key", ignoreDuplicates: false }
      );

    if (keyIdError) throw keyIdError;

    // Update or insert key secret
    const { error: keySecretError } = await supabase
      .from("site_settings")
      .upsert(
        {
          key: "razorpay_key_secret",
          value: secretToStore,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key", ignoreDuplicates: false }
      );

    if (keySecretError) throw keySecretError;

    return NextResponse.json({
      success: true,
      message: "Payment gateway credentials saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving payment credentials:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save credentials" },
      { status: 500 }
    );
  }
}
