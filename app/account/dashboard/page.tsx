import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Heart,
  User,
  Sparkles,
  MapPin,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

export default async function AccountDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get all orders for statistics
  const { data: allOrders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id);

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // Calculate statistics
  const totalOrders = allOrders?.length || 0;
  const totalSpent =
    allOrders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;
  const pendingOrders =
    allOrders?.filter(
      (o) => o.status === "pending" || o.status === "processing"
    ).length || 0;
  const deliveredOrders =
    allOrders?.filter((o) => o.status === "delivered").length || 0;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Spent",
      value: formatPrice(totalSpent),
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle2,
      color: "from-[#1a8f4a] to-[#157a3d]",
      bgColor: "bg-green-50",
      iconColor: "text-[#1a8f4a]",
    },
  ];

  const quickActions = [
    {
      title: "Browse Products",
      description: "Explore our Ayurvedic collection",
      icon: ShoppingBag,
      href: "/products",
      color: "bg-gradient-to-br from-[#1a8f4a] to-[#157a3d]",
    },
    {
      title: "My Addresses",
      description: "Manage delivery locations",
      icon: MapPin,
      href: "/account/addresses",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "My Wishlist",
      description: "View saved items",
      icon: Heart,
      href: "/wishlist",
      color: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      title: "Edit Profile",
      description: "Update your information",
      icon: User,
      href: "/account/profile",
      color: "bg-gradient-to-br from-violet-500 to-purple-600",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-green-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-100/50 to-emerald-100/30 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-[#1a8f4a]">Welcome back</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {profile?.full_name || "Valued Customer"}!
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your orders, track shipments, and update your account settings.
          </p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <CardContent className="p-4 md:p-5">
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`${stat.bgColor} p-2.5 md:p-3 rounded-xl`}>
                  <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground font-medium truncate">
                    {stat.title}
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden h-full">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`${action.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 group-hover:text-[#1a8f4a] transition-colors">
                        {action.title}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#1a8f4a] group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Orders</h2>
          {recentOrders && recentOrders.length > 0 && (
            <Link
              href="/account/orders"
              className="text-[#1a8f4a] hover:text-[#157a3d] text-sm font-medium flex items-center gap-1 group"
            >
              View all
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {recentOrders && recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Card
                key={order.id}
                className="border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300"
              >
                <CardContent className="p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-green-100 to-emerald-50 p-3 rounded-xl">
                        <Package className="h-5 w-5 text-[#1a8f4a]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          #{order.order_number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 justify-between sm:justify-end">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {formatPrice(order.total)}
                        </p>
                        <Badge
                          className={`${getStatusColor(order.status)} border text-xs font-medium`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-[#1a8f4a] text-[#1a8f4a] hover:bg-[#1a8f4a] hover:text-white shrink-0"
                      >
                        <Link href={`/account/orders/${order.order_number}`}>
                          Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Start your Ayurvedic wellness journey by exploring our natural products.
              </p>
              <Button
                asChild
                className="bg-[#1a8f4a] hover:bg-[#157a3d]"
              >
                <Link href="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
