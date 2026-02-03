"use client";

import { createClient } from "@/lib/supabase/client";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard, Package, ShoppingCart, Tag, Image as ImageIcon, Users, Settings, Home, FileEdit, BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/banners", label: "Banners", icon: ImageIcon },
  { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
  { href: "/admin/home-content", label: "Home Content", icon: FileEdit },
  { href: "/admin/about", label: "About Page", icon: Info },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        window.location.href = "/";
        return;
      }

      setUser(user);
      setIsAuthorized(true);
      setIsLoading(false);
    }

    checkAuth();
  }, [supabase]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-green-700">Admin Panel</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 border-r bg-white fixed left-0 top-0 bottom-0 overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-green-700">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Management Dashboard</p>
        </div>
        <nav className="space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-green-50 text-green-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-500 mt-4 border-t pt-4"
          >
            <Home className="h-5 w-5" />
            ← Back to Store
          </Link>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={cn(
            "absolute top-0 left-0 bottom-0 w-64 bg-white shadow-xl transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-green-700">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1">Management Dashboard</p>
          </div>
          <nav className="space-y-1 p-3 overflow-y-auto max-h-[calc(100vh-100px)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-green-50 text-green-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-500 mt-4 border-t pt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              ← Back to Store
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
