import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BannerManagement } from "@/components/admin/banner-management";
import { redirect } from "next/navigation";

export default async function AdminBannersPage() {
  const supabase = await createClient();

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  const { data: banners } = await supabase
    .from("banners")
    .select("*")
    .order("display_order");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Hero Banners</h1>
          <p className="text-muted-foreground mt-2">
            Manage homepage hero slider banners
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Homepage Banner Slider</CardTitle>
        </CardHeader>
        <CardContent>
          <BannerManagement initialBanners={banners || []} />
        </CardContent>
      </Card>
    </div>
  );
}
