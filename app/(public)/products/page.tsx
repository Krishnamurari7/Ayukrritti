import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Search, Filter } from "lucide-react";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Aarogya India | Ayurvedic Products",
  description:
    "Browse our collection of 100% natural Ayurvedic products for immunity, digestion, hair care, skin care, and overall wellness.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  // Await the searchParams Promise (Next.js 15+)
  const params = await searchParams;
  
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(image_url, alt_text)
    `)
    .eq("is_active", true);

  // Filter by category
  if (params.category) {
    const { data: categoryData } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", params.category)
      .single();

    const category = categoryData as any;

    if (category) {
      query = query.eq("category_id", category.id);
    }
  }

  // Search
  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  // Sort
  if (params.sort === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (params.sort === "price-desc") {
    query = query.order("price", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data: productsData } = await query;
  const products = productsData as any[];

  // Fetch categories for filter
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  const categories = categoriesData as any[];

  // Get current category name if filtering
  const currentCategory = params.category
    ? categories?.find((c: any) => c.slug === params.category)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#1a8f4a] to-[#2d5a27] text-white py-8 md:py-10 lg:py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
            {currentCategory ? currentCategory.name : "All Ayurvedic Products"}
          </h1>
          <p className="text-green-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            {currentCategory?.description ||
              "Discover our range of 100% natural Ayurvedic products for holistic wellness"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="lg:sticky lg:top-32">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Filter className="h-5 w-5 text-[#1a8f4a]" />
                  <h2 className="font-semibold text-base sm:text-lg">Filters</h2>
                </div>

                {/* Search */}
                <div className="mb-4 sm:mb-6">
                  <form action="/products" method="GET">
                    <div className="relative">
                      <input
                        type="text"
                        name="search"
                        placeholder="Search products..."
                        defaultValue={params.search}
                        className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a8f4a]"
                      />
                      <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Categories */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/products"
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          !params.category
                            ? "bg-[#1a8f4a] text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        All Products
                      </Link>
                    </li>
                    {categories?.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/products?category=${category.slug}`}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            params.category === category.slug
                              ? "bg-[#1a8f4a] text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-gray-900">Sort By</h3>
                  <ul className="space-y-2">
                    {[
                      { value: "", label: "Newest First" },
                      { value: "price-asc", label: "Price: Low to High" },
                      { value: "price-desc", label: "Price: High to Low" },
                    ].map((sort) => (
                      <li key={sort.value}>
                        <Link
                          href={`/products?${
                            params.category
                              ? `category=${params.category}&`
                              : ""
                          }${sort.value ? `sort=${sort.value}` : ""}`}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            (params.sort || "") === sort.value
                              ? "bg-[#1a8f4a] text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {sort.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-muted-foreground">
                <span className="font-semibold text-gray-900">
                  {products?.length || 0}
                </span>{" "}
                products found
                {params.search && (
                  <span>
                    {" "}
                    for "<span className="font-medium">{params.search}</span>"
                  </span>
                )}
              </p>
            </div>

            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product: any) => {
                  const discount = product.compare_at_price
                    ? Math.round(
                        ((product.compare_at_price - product.price) /
                          product.compare_at_price) *
                          100
                      )
                    : 0;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group"
                    >
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border-2 border-transparent hover:border-[#1a8f4a]">
                        <div className="relative aspect-square bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                          {discount > 0 && (
                            <div className="absolute top-3 left-3 z-10">
                              <Badge className="bg-red-500 text-white">
                                {discount}% OFF
                              </Badge>
                            </div>
                          )}
                          {product.stock_quantity < 10 &&
                            product.stock_quantity > 0 && (
                              <div className="absolute top-3 right-3 z-10">
                                <Badge
                                  variant="secondary"
                                  className="bg-orange-100 text-orange-700"
                                >
                                  Low Stock
                                </Badge>
                              </div>
                            )}
                          {product.stock_quantity === 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                              <Badge variant="destructive" className="text-sm">
                                Out of Stock
                              </Badge>
                            </div>
                          )}
                          <Image
                            src={
                              product.images[0]?.image_url || "/placeholder.png"
                            }
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <Badge
                              variant="outline"
                              className="text-xs border-[#1a8f4a] text-[#1a8f4a]"
                            >
                              {product.category?.name}
                            </Badge>
                            <h3 className="font-semibold line-clamp-2 group-hover:text-[#1a8f4a] transition-colors min-h-[3rem]">
                              {product.name}
                            </h3>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold text-[#1a8f4a]">
                                {formatPrice(product.price)}
                              </span>
                              {product.compare_at_price && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(product.compare_at_price)}
                                </span>
                              )}
                            </div>
                            <AddToCartButton
                              productId={product.id}
                              inStock={product.stock_quantity > 0}
                              showQuantity={false}
                              size="sm"
                              className="w-full mt-2 group-hover:shadow-md"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter to find what you're looking
                  for.
                </p>
                <Button asChild className="bg-[#1a8f4a] hover:bg-[#157a3d]">
                  <Link href="/products">View All Products</Link>
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
