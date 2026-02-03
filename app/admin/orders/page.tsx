import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import { AlertCircle, ShoppingCart } from "lucide-react";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please login to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  // Check admin role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    console.error("Admin access check failed:", profileError);
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You do not have permission to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  // Fetch orders with error handling
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (ordersError) {
    console.error("Error fetching orders:", ordersError);
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Orders</h1>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load orders: {ordersError.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Orders</h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Total: {orders?.length || 0}
        </Badge>
      </div>

      {!orders || orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-500 text-center">
              Orders placed by customers will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left">
                    <th className="p-4 font-semibold">Order Number</th>
                    <th className="p-4 font-semibold">Customer</th>
                    <th className="p-4 font-semibold">Total</th>
                    <th className="p-4 font-semibold">Payment</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium">{order.order_number}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{order.email || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">{order.phone || 'N/A'}</p>
                      </td>
                      <td className="p-4 font-semibold">
                        {formatPrice(order.total)}
                      </td>
                      <td className="p-4">
                        <Badge variant={order.payment_status === "paid" ? "secondary" : "default"}>
                          {order.payment_status}
                        </Badge>
                      </td>
                      <td className="p-4">
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
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="p-4">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
