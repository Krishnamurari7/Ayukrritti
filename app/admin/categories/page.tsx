import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("display_order");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Categories</h1>
        <Button>Add Category</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-semibold">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm ${
                      category.is_active ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {category.is_active ? "Active" : "Inactive"}
                  </span>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
