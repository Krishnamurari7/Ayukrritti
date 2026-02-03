"use client";

import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params Promise using React.use()
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;

  const supabase = createClient();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            order_items(*)
          `)
          .eq("id", orderId)
          .single();

        if (error) {
          console.error("Error loading order:", error);
          toast.error(`Failed to load order: ${error.message}`);
        } else if (data) {
          setOrder(data);
        }
      } catch (err: any) {
        console.error("Unexpected error loading order:", err);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId, supabase]);

  const handleUpdateStatus = async (newStatus: string) => {
    setUpdating(true);

    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setOrder({ ...order, status: newStatus });
      toast.success("Order status updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-xl font-semibold text-gray-700 mb-2">Order not found</p>
            <p className="text-gray-500 mb-4">The order you're looking for doesn't exist.</p>
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const shippingAddress = order.shipping_address as any;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.order_number}</h1>
          <p className="text-muted-foreground">{formatDate(order.created_at)}</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
                  <div className="relative w-20 h-20 bg-gray-100 rounded">
                    {item.product_image && (
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(item.subtotal)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{order.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{order.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Shipping Address</p>
                  <address className="not-italic">
                    <p>{shippingAddress.fullName}</p>
                    <p>{shippingAddress.addressLine1}</p>
                    {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                    <p>
                      {shippingAddress.city}, {shippingAddress.state}{" "}
                      {shippingAddress.postalCode}
                    </p>
                    <p>{shippingAddress.country}</p>
                  </address>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Status:</span>
                <Badge
                  variant={
                    order.status === "delivered"
                      ? "secondary"
                      : order.status === "cancelled"
                      ? "destructive"
                      : "default"
                  }
                >
                  {order.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Update Status:</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleUpdateStatus("processing")}
                    disabled={updating || order.status === "processing"}
                  >
                    Processing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleUpdateStatus("shipped")}
                    disabled={updating || order.status === "shipped"}
                  >
                    Shipped
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleUpdateStatus("delivered")}
                    disabled={updating || order.status === "delivered"}
                  >
                    Delivered
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => handleUpdateStatus("cancelled")}
                    disabled={updating || order.status === "cancelled"}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{order.payment_method.toUpperCase()}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Payment Status:</span>
                  <Badge variant={order.payment_status === "paid" ? "secondary" : "default"}>
                    {order.payment_status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
