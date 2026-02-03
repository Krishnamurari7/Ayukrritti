import { createClient } from "@/lib/supabase/server";
import { Footer } from "./Footer";

export async function FooterWrapper() {
  const supabase = await createClient();
  
  // Fetch site settings from database
  const { data: settingsData } = await supabase
    .from("site_settings")
    .select("*");

  // Convert to object format
  const settings: Record<string, any> = {};
  settingsData?.forEach((setting: any) => {
    settings[setting.key] = setting.value;
  });

  return <Footer settings={settings} />;
}
