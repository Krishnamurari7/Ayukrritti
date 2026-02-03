"use client";

import { createClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  User,
  LogOut,
  ChevronRight,
  Loader2,
  Leaf,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/account/dashboard",
    icon: LayoutDashboard,
    description: "Overview & quick actions",
  },
  {
    name: "My Orders",
    href: "/account/orders",
    icon: Package,
    description: "Track your orders",
  },
  {
    name: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
    description: "Manage delivery addresses",
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: User,
    description: "Manage your account",
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login?redirect=/account");
        return;
      }

      setUser(user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    }

    checkAuth();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#1a8f4a] mx-auto" />
          <p className="text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-emerald-50/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10 relative z-10">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-[#1a8f4a] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">My Account</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-green-100/50 overflow-hidden sticky top-28">
              {/* User Profile Card */}
              <div className="bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] p-5 text-white">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                      <span className="text-xl font-bold">
                        {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-400 rounded-full flex items-center justify-center ring-2 ring-white">
                      <Leaf className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-lg truncate">
                      {profile?.full_name || "Welcome!"}
                    </p>
                    <p className="text-white/80 text-sm truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-3">
                <ul className="space-y-1">
                  {sidebarLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href === "/account/orders" &&
                        pathname.startsWith("/account/orders"));

                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                            isActive
                              ? "bg-[#1a8f4a] text-white shadow-md shadow-green-200"
                              : "text-gray-600 hover:bg-green-50 hover:text-[#1a8f4a]"
                          )}
                        >
                          <link.icon
                            className={cn(
                              "h-5 w-5 transition-transform group-hover:scale-110",
                              isActive ? "text-white" : "text-[#1a8f4a]"
                            )}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{link.name}</p>
                            <p
                              className={cn(
                                "text-xs",
                                isActive
                                  ? "text-white/80"
                                  : "text-muted-foreground"
                              )}
                            >
                              {link.description}
                            </p>
                          </div>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isActive
                                ? "text-white/80"
                                : "text-gray-400 group-hover:translate-x-1"
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Logout Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start gap-3 px-4 py-3 h-auto text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </Button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
