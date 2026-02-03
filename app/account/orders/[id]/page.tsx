import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Receipt,
  Phone,
  Mail,
  XCircle,
  ShoppingBag,
  Copy,
  ExternalLink,
} from "lucide-react";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: order } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(*)
    `
    )
    .eq("order_number", id)
    .eq("user_id", user.id)
    .single();

  if (!order) {
    notFound();
  }

  const shippingAddress = order.shipping_address as any;

  // Order timeline steps
  const timelineSteps = [
    { status: "pending", label: "Order Placed", icon: Package },
    { status: "processing", label: "Processing", icon: Clock },
    { status: "shipped", label: "Shipped", icon: Truck },
    { status: "delivered", label: "Delivered", icon: CheckCircle2 },
  ];

  const getCurrentStepIndex = () => {
    if (order.status === "cancelled") return -1;
    const index = timelineSteps.findIndex((step) => step.status === order.status);
    return index >= 0 ? index : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

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

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Back Button & Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-green-100/50">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 text-[#1a8f4a] hover:text-[#157a3d] font-medium text-sm mb-4 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Order #{order.order_number}
              </h1>
              <button className="text-gray-400 hover:text-[#1a8f4a] transition-colors">
                <Copy className="h-5 w-5" />
              </button>
            </div>
            <p className="text-muted-foreground">
              Placed on {formatDate(order.created_at)}
            </p>
          </div>
          <Badge
            className={`${getStatusStyle(order.status)} border text-sm font-medium px-4 py-2 w-fit`}
          >
            {order.status === "cancelled" ? (
              <XCircle className="h-4 w-4 mr-1.5" />
            ) : (
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
            )}
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Order Timeline - Only show if not cancelled */}
      {order.status !== "cancelled" && (
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <h3 className="font-semibold text-gray-900 mb-6">Order Progress</h3>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-100 rounded-full hidden md:block" />
              <div
                className="absolute top-5 left-0 h-1 bg-[#1a8f4a] rounded-full transition-all duration-500 hidden md:block"
                style={{
                  width: `${(currentStepIndex / (timelineSteps.length - 1)) * 100}%`,
                }}
              />

              {/* Steps */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 relative">
                {timelineSteps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div
                      key={step.status}
                      className="flex md:flex-col items-center md:items-center gap-3 md:gap-2"
                    >
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                          isCompleted
                            ? "bg-[#1a8f4a] text-white shadow-lg shadow-green-200"
                            : "bg-gray-100 text-gray-400"
                        } ${isCurrent ? "ring-4 ring-green-100" : ""}`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div className="md:text-center">
                        <p
                          className={`font-medium text-sm ${
                            isCompleted ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-xs text-[#1a8f4a] font-medium">
                            Current
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShoppingBag className="h-5 w-5 text-[#1a8f4a]" />
                Order Items ({order.order_items.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-4 last:pb-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex-shrink-0 overflow-hidden">
                    {item.product_image ? (
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1 truncate">
                      {item.product_name}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>Qty: {item.quantity}</span>
                      <span>@ {formatPrice(item.price)}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900 text-lg">
                      {formatPrice(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-[#1a8f4a]" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <address className="not-italic text-sm space-y-1">
                  <p className="font-semibold text-gray-900 text-base mb-2">
                    {shippingAddress.fullName}
                  </p>
                  <p className="text-muted-foreground">
                    {shippingAddress.addressLine1}
                  </p>
                  {shippingAddress.addressLine2 && (
                    <p className="text-muted-foreground">
                      {shippingAddress.addressLine2}
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    {shippingAddress.city}, {shippingAddress.state}{" "}
                    {shippingAddress.postalCode}
                  </p>
                  <p className="text-muted-foreground">{shippingAddress.country}</p>
                </address>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Phone className="h-4 w-4 text-[#1a8f4a]" />
                    </div>
                    <span className="text-muted-foreground">{order.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Mail className="h-4 w-4 text-[#1a8f4a]" />
                    </div>
                    <span className="text-muted-foreground">{order.email}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-28">
            <CardHeader className="border-b bg-gray-50/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="h-5 w-5 text-[#1a8f4a]" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-[#1a8f4a]">
                    {order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-[#1a8f4a]">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Payment Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  Payment Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method</span>
                    <span className="font-medium">
                      {order.payment_method.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      className={
                        order.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    >
                      {order.payment_status.charAt(0).toUpperCase() +
                        order.payment_status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Tracking */}
              {order.tracking_number && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-400" />
                      Tracking
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-mono text-sm text-gray-700 flex items-center gap-2">
                        {order.tracking_number}
                        <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                      </p>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[#1a8f4a] text-[#1a8f4a] hover:bg-[#1a8f4a] hover:text-white"
                >
                  <Link href="/account/orders">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Orders
                  </Link>
                </Button>
                <Button asChild className="w-full bg-[#1a8f4a] hover:bg-[#157a3d]">
                  <Link href="/products">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
