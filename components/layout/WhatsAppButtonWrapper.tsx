import { createClient } from "@/lib/supabase/server";
import { WhatsAppButton } from "./WhatsAppButton";

export async function WhatsAppButtonWrapper() {
  const supabase = await createClient();
  
  // Fetch WhatsApp number from settings
  const { data: whatsappSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "whatsapp_number")
    .single();

  const whatsappNumber = whatsappSetting?.value || "919876543210";

  return <WhatsAppButton whatsappNumber={whatsappNumber} />;
}
