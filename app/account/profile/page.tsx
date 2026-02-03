"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  KeyRound,
  Shield,
  Loader2,
  Check,
  Camera,
  Leaf,
} from "lucide-react";

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile({
            full_name: data.full_name || "",
            phone: data.phone || "",
            email: data.email || "",
          });
        }
      }
      setInitialLoading(false);
    }

    loadProfile();
  }, [supabase]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully!", {
        icon: <Check className="h-4 w-4" />,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a8f4a]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-green-100/50">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your personal information and account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Avatar Card */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] p-6 md:p-8">
              <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto">
                <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30 shadow-xl">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {profile.full_name?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase() || "?"}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                  <Camera className="h-4 w-4 text-[#1a8f4a]" />
                </button>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-emerald-400 rounded-full flex items-center justify-center ring-2 ring-white">
                  <Leaf className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </div>
            <CardContent className="p-5 md:p-6 text-center">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {profile.full_name || "Add your name"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{profile.email}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-[#1a8f4a] bg-green-50 rounded-full py-2 px-4">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Verified Account</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="border-0 shadow-sm mt-4 md:mt-6">
            <CardContent className="p-5 md:p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-[#1a8f4a]" />
                Account Tips
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#1a8f4a] mt-0.5 shrink-0" />
                  <span>Keep your phone number updated for order notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#1a8f4a] mt-0.5 shrink-0" />
                  <span>Use a strong password to secure your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#1a8f4a] mt-0.5 shrink-0" />
                  <span>Check your email for exclusive offers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="bg-green-100 p-2 rounded-lg">
                  <User className="h-5 w-5 text-[#1a8f4a]" />
                </div>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      value={profile.full_name}
                      onChange={(e) =>
                        setProfile({ ...profile, full_name: e.target.value })
                      }
                      className="pl-10 h-11 border-gray-200 focus:border-[#1a8f4a] focus:ring-[#1a8f4a]"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="pl-10 h-11 bg-gray-50 border-gray-200 text-gray-500"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Email is verified and cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="pl-10 h-11 border-gray-200 focus:border-[#1a8f4a] focus:ring-[#1a8f4a]"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#1a8f4a] hover:bg-[#157a3d] h-11 px-8 text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Password Section */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <KeyRound className="h-5 w-5 text-amber-600" />
                </div>
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Change Your Password
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  To change your password, we'll send a secure reset link to your
                  registered email address.
                </p>
                <Button
                  variant="outline"
                  asChild
                  className="border-amber-300 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                >
                  <a href="/forgot-password">
                    <KeyRound className="h-4 w-4 mr-2" />
                    Request Password Reset
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
