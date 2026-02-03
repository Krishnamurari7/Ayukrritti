import { createClient } from "@/lib/supabase/server";
import { decrypt, isEncrypted } from "@/lib/crypto";

export interface RazorpayConfig {
  keyId: string;
  keySecret: string;
}

/**
 * Get Razorpay configuration from environment variables or database
 * Priority: Environment variables > Database settings
 */
export async function getRazorpayConfig(): Promise<RazorpayConfig> {
  // First, try to get from environment variables
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    return {
      keyId: process.env.RAZORPAY_KEY_ID,
      keySecret: process.env.RAZORPAY_KEY_SECRET,
    };
  }

  // Fallback to database settings
  try {
    const supabase = await createClient();
    
    const { data: keyIdData } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "razorpay_key_id")
      .single();

    const { data: keySecretData } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "razorpay_key_secret")
      .single();

    if (keyIdData?.value && keySecretData?.value) {
      let keySecret = keySecretData.value as string;
      
      // Decrypt if encrypted
      if (isEncrypted(keySecret)) {
        try {
          keySecret = decrypt(keySecret);
        } catch (error) {
          console.error("Error decrypting key secret:", error);
          // If decryption fails, use as-is (for backward compatibility)
        }
      }
      
      return {
        keyId: keyIdData.value as string,
        keySecret: keySecret,
      };
    }
  } catch (error) {
    console.error("Error fetching Razorpay config from database:", error);
  }

  throw new Error("Razorpay credentials not found. Please configure them in Admin Settings or environment variables.");
}
