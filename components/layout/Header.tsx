"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
  Home,
  Package,
  BookOpen,
  Info,
  Mail,
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
  { name: "Home", href: "/", icon: Home },
  {
    name: "All Products",
    href: "/products",
    icon: Package,
    hasDropdown: true,
    subLinks: [
      { name: "Face Care", href: "/products?category=face-care" },
      { name: "Hair Care", href: "/products?category=hair-care" },
      { name: "Body Care", href: "/products?category=body-care" },
      { name: "Health & Wellness", href: "/products?category=health-wellness" },
    ],
  },
  { name: "Blogs", href: "/blogs", icon: BookOpen },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Contact Us", href: "/contact", icon: Mail },
];

const promoItems = [
  { icon: Phone, text: "Free Consultation", shortText: "Consult" },
  { icon: Leaf, text: "100% Ayurvedic", shortText: "Ayurvedic" },
  { icon: Truck, text: "Free Shipping", shortText: "Free Ship" },
  { icon: Wallet, text: "Cash on Delivery", shortText: "COD" },
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
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

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

  // Calculate header height for mobile menu positioning
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled && "shadow-lg"
      )}
    >
      {/* Top Promotional Banner */}
      <div className="bg-gradient-to-r from-[#1a8f4a] via-[#D4AF37] to-[#1a8f4a] py-1.5 sm:py-2 px-2 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-6 md:gap-8 lg:gap-12">
            {promoItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap text-white font-medium drop-shadow-sm"
              >
                <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 shrink-0 text-white" />
                <span className="hidden md:inline text-xs lg:text-sm">{item.text}</span>
                <span className="md:hidden text-[10px] xs:text-xs text-white">
                  {item.shortText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b-2 border-[#D4AF37] py-2 sm:py-3 md:py-4 shadow-sm">
        <div className="container mx-auto px-2 sm:px-3 md:px-4">
          <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group min-w-0">
              <div className="transition-all duration-300 group-hover:scale-105 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Ayukrriti Ayurveda"
                  width={180}
                  height={60}
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
                  priority
                />
              </div>
              {/* Hide text on very small screens, show abbreviated on small, full on medium+ */}
              <div className="hidden xs:flex flex-col sm:flex-row sm:items-baseline ml-1 sm:ml-2 min-w-0">
                <span className="text-[#D4AF37] text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wide leading-tight truncate transition-colors duration-300 group-hover:text-[#B8941F]">
                  AYUKRRITI
                </span>
                <span className="text-[#1a8f4a] text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold sm:ml-1 md:ml-2 leading-tight truncate transition-colors duration-300 group-hover:text-[#157a3d]">
                  AYURVEDA
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop & Tablet */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xs lg:max-w-md xl:max-w-xl mx-2 lg:mx-4 xl:mx-8"
            >
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-r-none border-gray-300 focus:border-[#1a8f4a] focus:ring-[#1a8f4a] h-9 lg:h-10 xl:h-11 text-sm lg:text-base"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-gradient-to-r from-[#1a8f4a] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#1a8f4a] px-3 lg:px-4 xl:px-6 h-9 lg:h-10 xl:h-11 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Search className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
            </form>

            {/* Action Icons */}
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 hover:bg-gray-100 rounded-full"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Search"
              >
                <Search className="h-4 w-4 xs:h-5 xs:w-5 text-gray-600" />
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist" className="shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Wishlist"
                >
                  <Heart className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-white" />
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-white" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white text-[9px] xs:text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 flex items-center justify-center shadow-md">
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Account */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 shadow-md hover:shadow-lg transition-all duration-300 shrink-0"
                      aria-label="Account"
                    >
                      <User className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-white border border-gray-200 shadow-xl"
                  >
                    <div className="px-3 py-2 text-sm text-gray-600 bg-gradient-to-r from-gray-50 to-green-50 border-b border-gray-200 rounded-t-md truncate">
                      {user.email}
                    </div>
                    {userRole === "admin" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/admin"
                            className="font-semibold text-[#1a8f4a] hover:text-[#157a3d] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 rounded-md"
                          >
                            🛡️ Admin Panel
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-200" />
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link 
                        href="/account/dashboard" 
                        className="text-gray-700 hover:text-[#1a8f4a] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 rounded-md"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        href="/account/orders" 
                        className="text-gray-700 hover:text-[#1a8f4a] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 rounded-md"
                      >
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        href="/account/profile" 
                        className="text-gray-700 hover:text-[#1a8f4a] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 rounded-md"
                      >
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        href="/wishlist" 
                        className="text-gray-700 hover:text-[#1a8f4a] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 rounded-md"
                      >
                        My Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 rounded-md"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 flex items-center shadow-md hover:shadow-lg transition-all duration-300"
                    aria-label="Login"
                  >
                    <User className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-white" />
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 bg-gradient-to-br from-[#1a8f4a] to-[#157a3d] hover:from-[#157a3d] hover:to-[#1a8f4a] rounded-full shadow-md hover:shadow-lg transition-all duration-300 shrink-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
                ) : (
                  <Menu className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search - Expandable */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              mobileSearchOpen ? "max-h-20 mt-2 sm:mt-3 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <form onSubmit={handleSearch}>
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-r-none border-gray-300 focus:border-[#1a8f4a] focus:ring-[#1a8f4a] h-9 sm:h-10 text-sm"
                  autoFocus={mobileSearchOpen}
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-gradient-to-r from-[#1a8f4a] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#1a8f4a] px-3 sm:px-4 h-9 sm:h-10 shadow-md"
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
          <ul className="flex items-center justify-center">
            {navLinks.map((link, index) => (
              <li key={link.name} className="relative">
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center gap-1 px-3 xl:px-5 py-3 text-white text-sm font-medium transition-all duration-300 relative group",
                          "hover:bg-gradient-to-r hover:from-[#157a3d] hover:to-[#1a8f4a] hover:shadow-md",
                          "before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-[#D4AF37] before:transition-all before:duration-300",
                          "hover:before:w-full",
                          isActiveLink(link.href) && "bg-gradient-to-r from-[#157a3d] to-[#1a8f4a] shadow-md before:w-full"
                        )}
                      >
                        {link.name}
                        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-xl">
                      <DropdownMenuItem asChild>
                        <Link 
                          href={link.href} 
                          className="font-medium text-gray-700 hover:text-[#1a8f4a] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 rounded-md"
                        >
                          View All Products
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      {link.subLinks?.map((subLink) => (
                        <DropdownMenuItem key={subLink.name} asChild>
                          <Link 
                            href={subLink.href}
                            className="text-gray-700 hover:text-[#1a8f4a] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 rounded-md"
                          >
                            {subLink.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-3 xl:px-5 py-3 text-white text-sm font-medium transition-all duration-300 relative group",
                      "hover:bg-gradient-to-r hover:from-[#157a3d] hover:to-[#1a8f4a] hover:shadow-md",
                      "before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-[#D4AF37] before:transition-all before:duration-300",
                      "hover:before:w-full",
                      isActiveLink(link.href) && "bg-gradient-to-r from-[#157a3d] to-[#1a8f4a] shadow-md before:w-full"
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

      {/* Mobile Navigation Menu - Full Screen Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ top: headerHeight }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-out border-b-4 border-[#D4AF37]",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
          style={{ maxHeight: `calc(100vh - ${headerHeight}px)` }}
        >
          <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
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
                            "w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 font-semibold rounded-xl transition-all duration-300 relative group",
                            isActiveLink(link.href)
                              ? "bg-gradient-to-r from-[#1a8f4a] to-[#157a3d] text-white shadow-md hover:shadow-lg"
                              : "text-gray-800 hover:bg-gradient-to-r hover:from-[#1a8f4a]/10 hover:to-[#157a3d]/10 active:bg-gradient-to-r active:from-[#1a8f4a]/20 active:to-[#157a3d]/20 hover:shadow-sm"
                          )}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <IconComponent className={cn(
                              "h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300",
                              isActiveLink(link.href) ? "text-white" : "text-[#1a8f4a] group-hover:text-[#157a3d]"
                            )} />
                            <span className="text-sm sm:text-base">{link.name}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300",
                              isActiveLink(link.href) ? "text-white" : "text-[#1a8f4a] group-hover:text-[#157a3d]",
                              activeDropdown === link.name && "rotate-180"
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            activeDropdown === link.name
                              ? "max-h-96 mt-1"
                              : "max-h-0"
                          )}
                        >
                          <ul className="ml-3 sm:ml-4 space-y-0.5 pb-2 pl-3 sm:pl-4 border-l-2 border-[#D4AF37] bg-gradient-to-r from-gray-50 to-white rounded-r-xl">
                            <li>
                              <Link
                                href={link.href}
                                className="block px-3 sm:px-4 py-2 sm:py-2.5 text-[#1a8f4a] font-semibold hover:bg-gradient-to-r hover:from-[#1a8f4a] hover:to-[#157a3d] hover:text-white rounded-lg transition-all duration-300 text-sm sm:text-base hover:shadow-md"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                View All Products
                              </Link>
                            </li>
                            {link.subLinks?.map((subLink) => (
                              <li key={subLink.name}>
                                <Link
                                  href={subLink.href}
                                  className="block px-3 sm:px-4 py-2 sm:py-2.5 text-gray-700 font-medium hover:text-white hover:bg-gradient-to-r hover:from-[#1a8f4a] hover:to-[#157a3d] rounded-lg transition-all duration-300 text-sm sm:text-base hover:shadow-md"
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
                          "flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold rounded-xl transition-all duration-300 relative group",
                          isActiveLink(link.href)
                            ? "bg-gradient-to-r from-[#1a8f4a] to-[#157a3d] text-white shadow-md hover:shadow-lg"
                            : "text-gray-800 hover:bg-gradient-to-r hover:from-[#1a8f4a]/10 hover:to-[#157a3d]/10 active:bg-gradient-to-r active:from-[#1a8f4a]/20 active:to-[#157a3d]/20 hover:shadow-sm"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IconComponent className={cn(
                          "h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300",
                          isActiveLink(link.href) ? "text-white" : "text-[#1a8f4a] group-hover:text-[#157a3d]"
                        )} />
                        <span className="text-sm sm:text-base">{link.name}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Mobile User Actions */}
            {!user && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/login"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-[#1a8f4a] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#1a8f4a] text-white font-semibold py-2.5 sm:py-3 shadow-md rounded-xl text-sm sm:text-base">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Login / Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Quick Contact in Mobile Menu */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-600 text-xs sm:text-sm">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#1a8f4a]" />
                <span>Need Help? Call us at</span>
                <a 
                  href="tel:+919876543210" 
                  className="text-[#1a8f4a] font-semibold hover:text-[#157a3d] hover:underline transition-colors duration-200"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
