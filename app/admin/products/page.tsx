import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name),
      images:product_images(image_url)
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product: any) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-gray-100 rounded">
                          {product.images[0] && (
                            <Image
                              src={product.images[0].image_url}
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{product.category?.name}</td>
                    <td className="p-4">{formatPrice(product.price)}</td>
                    <td className="p-4">
                      <span
                        className={
                          product.stock_quantity < 10
                            ? "text-destructive font-semibold"
                            : ""
                        }
                      >
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant={product.is_active ? "secondary" : "destructive"}>
                        {product.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
