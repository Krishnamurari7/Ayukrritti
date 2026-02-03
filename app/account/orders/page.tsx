import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingBag,
  ArrowRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Calendar,
  CreditCard,
  Filter,
} from "lucide-react";

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Calculate stats
  const totalOrders = orders?.length || 0;
  const pendingOrders = orders?.filter(o => o.status === "pending" || o.status === "processing").length || 0;
  const deliveredOrders = orders?.filter(o => o.status === "delivered").length || 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusStyle = (status: string) => {
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

  const getPaymentStatusStyle = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-50 text-green-600";
      case "pending":
        return "bg-amber-50 text-amber-600";
      case "failed":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-green-100/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Track and manage all your orders in one place.
            </p>
          </div>
          <Button
            asChild
            className="bg-[#1a8f4a] hover:bg-[#157a3d] shrink-0"
          >
            <Link href="/products">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 md:p-5 text-center">
            <div className="bg-blue-100 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Package className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{totalOrders}</p>
            <p className="text-xs md:text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 md:p-5 text-center">
            <div className="bg-amber-100 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{pendingOrders}</p>
            <p className="text-xs md:text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 md:p-5 text-center">
            <div className="bg-green-100 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-[#1a8f4a]" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{deliveredOrders}</p>
            <p className="text-xs md:text-sm text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white p-4 md:p-5 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-50 p-2.5 md:p-3 rounded-xl shrink-0">
                          <Package className="h-5 w-5 text-[#1a8f4a]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-base md:text-lg">
                            #{order.order_number}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(order.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`${getStatusStyle(order.status)} border text-xs md:text-sm font-medium px-3 py-1 flex items-center gap-1.5 w-fit`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Amount</p>
                          <p className="font-bold text-lg text-gray-900">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Payment</p>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">
                              {order.payment_method.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          <Badge
                            className={`${getPaymentStatusStyle(order.payment_status)} text-xs font-medium`}
                          >
                            {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="bg-[#1a8f4a] hover:bg-[#157a3d] group w-full md:w-auto"
                      >
                        <Link href={`/account/orders/${order.order_number}`}>
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 md:p-16 text-center">
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 md:h-12 md:w-12 text-gray-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              No orders yet
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start exploring our collection of
              authentic Ayurvedic products and begin your wellness journey.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#1a8f4a] hover:bg-[#157a3d]"
            >
              <Link href="/products">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
