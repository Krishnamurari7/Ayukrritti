"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Heart,
  Phone,
  Leaf,
  Truck,
  Wallet,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "All products",
    href: "/products",
    hasDropdown: true,
    subLinks: [
      { name: "Face Care", href: "/products?category=face-care" },
      { name: "Hair Care", href: "/products?category=hair-care" },
      { name: "Body Care", href: "/products?category=body-care" },
      { name: "Health & Wellness", href: "/products?category=health-wellness" },
    ],
  },
  { name: "Blogs", href: "/blogs" },
  { name: "About us", href: "/about" },
  { name: "Contact us", href: "/contact" },
];

const promoItems = [
  { icon: Phone, text: "Free expert consultation" },
  { icon: Leaf, text: "100% Ayurvedic" },
  { icon: Truck, text: "Free shipping" },
  { icon: Wallet, text: "Cash on delivery" },
];

export function Header() {
  const { user } = useAuth();
  const { itemCount } = useCart(user?.id);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Check if link is active
  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return pathname === href.split("#")[0];
    if (href.includes("?")) return pathname === href.split("?")[0];
    return pathname.startsWith(href);
  };

  // Fetch user role
  useEffect(() => {
    async function fetchUserRole() {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        
        setUserRole(profile?.role || null);
      } else {
        setUserRole(null);
      }
    }
    fetchUserRole();
  }, [user, supabase]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled && "shadow-lg"
      )}
    >
      {/* Top Promotional Banner */}
      <div className="bg-gradient-to-r from-[#1a8f4a] via-[#D4AF37] to-[#1a8f4a] text-white py-2 px-2">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-12 flex-wrap text-xs sm:text-sm">
            {promoItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
              >
                <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="hidden xs:inline sm:inline">{item.text}</span>
                <span className="xs:hidden sm:hidden">
                  {item.text.split(" ").slice(-1).join(" ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b-2 border-[#D4AF37] py-3 sm:py-4 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Ayukrriti Ayurveda"
                  width={180}
                  height={60}
                  className="h-12 sm:h-14 md:h-16 w-auto"
                  priority
                />
              </div>
            </Link>

            {/* Search Bar - Desktop & Tablet */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md lg:max-w-xl mx-4 lg:mx-8"
            >
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search for Face wash"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-r-none border-gray-300 focus:border-[#1a8f4a] focus:ring-[#1a8f4a] h-10 lg:h-11 text-sm lg:text-base"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-gradient-to-r from-[#1a8f4a] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#1a8f4a] px-4 lg:px-6 h-10 lg:h-11 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Search className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
            </form>

            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 sm:h-10 sm:w-10"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              >
                <Search className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full h-9 w-9 sm:h-10 sm:w-10 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full h-9 w-9 sm:h-10 sm:w-10 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center shadow-md animate-pulse">
                    {itemCount}
                  </span>
                </Button>
              </Link>

              {/* User Account */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full h-9 w-9 sm:h-10 sm:w-10 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm text-muted-foreground border-b mb-1">
                      {user.email}
                    </div>
                    {userRole === "admin" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="font-semibold text-green-600">
                            🛡️ Admin Panel
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/account/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/profile">Profile Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">My Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-600"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 sm:h-10 sm:w-10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search - Expandable */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300",
              mobileSearchOpen ? "max-h-16 mt-3" : "max-h-0"
            )}
          >
            <form onSubmit={handleSearch}>
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search for Face wash"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-r-none border-gray-300 focus:border-[#1a8f4a] focus:ring-[#1a8f4a] h-10"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-gradient-to-r from-[#1a8f4a] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#1a8f4a] px-4 h-10 shadow-md"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <nav className="bg-[#1a8f4a] hidden lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center flex-wrap">
            {navLinks.map((link, index) => (
              <li key={link.name} className="relative">
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center gap-1 px-3 xl:px-4 py-3 text-white text-sm font-medium hover:bg-[#157a3d] transition-colors",
                          isActiveLink(link.href) && "bg-[#2d5a27]"
                        )}
                      >
                        {link.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href={link.href} className="font-medium">
                          View All Products
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {link.subLinks?.map((subLink) => (
                        <DropdownMenuItem key={subLink.name} asChild>
                          <Link href={subLink.href}>{subLink.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-3 xl:px-4 py-3 text-white text-sm font-medium hover:bg-[#157a3d] transition-colors",
                      isActiveLink(link.href) && "bg-[#2d5a27] rounded"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
                {/* Separator */}
                {index !== navLinks.length - 1 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-px bg-white/30" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[106px] sm:top-[114px] z-40 transition-all duration-300",
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
            "absolute top-0 left-0 right-0 bg-white shadow-xl max-h-[calc(100vh-114px)] overflow-y-auto transition-transform duration-300",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.name ? null : link.name
                          )
                        }
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 font-medium rounded-lg transition-colors",
                          isActiveLink(link.href)
                            ? "bg-[#1a8f4a] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {link.name}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            activeDropdown === link.name && "rotate-180"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-200",
                          activeDropdown === link.name
                            ? "max-h-96 mt-1"
                            : "max-h-0"
                        )}
                      >
                        <ul className="ml-4 space-y-1 pb-2">
                          <li>
                            <Link
                              href={link.href}
                              className="block px-4 py-2 text-[#1a8f4a] font-medium hover:bg-gray-50 rounded-lg"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              View All Products
                            </Link>
                          </li>
                          {link.subLinks?.map((subLink) => (
                            <li key={subLink.name}>
                              <Link
                                href={subLink.href}
                                className="block px-4 py-2 text-gray-600 hover:text-[#1a8f4a] hover:bg-gray-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subLink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 font-medium rounded-lg transition-colors",
                        isActiveLink(link.href)
                          ? "bg-[#1a8f4a] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile User Actions */}
            {!user && (
              <div className="mt-4 pt-4 border-t">
                <Link
                  href="/login"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-[#1a8f4a] hover:bg-[#157a3d]">
                    Login / Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
