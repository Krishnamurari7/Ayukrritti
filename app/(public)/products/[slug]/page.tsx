import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import {
  Truck,
  Shield,
  RotateCcw,
  Leaf,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import type { Metadata } from "next";
import { ProductImageGallery } from "./ProductImageGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: productData } = await supabase
    .from("products")
    .select("name, description, price")
    .eq("slug", slug)
    .single();

  if (!productData) {
    return {
      title: "Product Not Found - Aarogya India",
    };
  }

  const product = productData as any;

  return {
    title: `${product.name} - Aarogya India`,
    description: product.description?.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params Promise (Next.js 15+)
  const { slug } = await params;
  
  const supabase = await createClient();

  const { data: productData } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(image_url, alt_text, display_order)
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!productData) {
    notFound();
  }

  const product = productData as any;

  // Fetch related products
  const { data: relatedProductsData } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(image_url, alt_text)
    `)
    .eq("category_id", product.category_id)
    .eq("is_active", true)
    .neq("id", product.id)
    .limit(4);

  const relatedProducts = relatedProductsData as any[];

  const sortedImages = product.images?.sort(
    (a: any, b: any) => a.display_order - b.display_order
  ) || [];

  const discount = product.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) /
          product.compare_at_price) *
          100
      )
    : 0;

  const features = [
    { icon: Leaf, text: "100% Natural & Ayurvedic" },
    { icon: Shield, text: "Quality Assured" },
    { icon: Truck, text: "Free Shipping Above ₹399" },
    { icon: RotateCcw, text: "7 Days Easy Return" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#1a8f4a]">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#1a8f4a]">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category?.slug}`}
              className="hover:text-[#1a8f4a]"
            >
              {product.category?.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {/* Image Gallery */}
          <ProductImageGallery 
            images={sortedImages}
            productName={product.name}
            discount={discount}
          />

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Category & Title */}
            <div>
              <Link
                href={`/products?category=${product.category?.slug}`}
                className="inline-block"
              >
                <Badge
                  variant="outline"
                  className="border-[#1a8f4a] text-[#1a8f4a] hover:bg-[#1a8f4a] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {product.category?.name}
                </Badge>
              </Link>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 text-gray-900">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                SKU: {product.sku}
              </p>
            </div>

            {/* Rating (Placeholder) */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.0 (25 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a8f4a]">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <>
                  <span className="text-lg sm:text-xl text-muted-foreground line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                  <Badge className="bg-red-500 text-white text-xs sm:text-sm">
                    Save {formatPrice(product.compare_at_price - product.price)}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock_quantity > 0 ? (
                <>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">In Stock</span>
                  </div>
                  {product.stock_quantity < 10 && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Only {product.stock_quantity} left!
                    </Badge>
                  )}
                </>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-green max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="space-y-2 sm:space-y-3 pt-2">
              <div className="flex gap-2 sm:gap-3">
                <AddToCartButton
                  productId={product.id}
                  inStock={product.stock_quantity > 0}
                  showQuantity={false}
                  className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 sm:h-12 sm:w-12 border-[#1a8f4a] text-[#1a8f4a] hover:bg-[#1a8f4a] hover:text-white shrink-0"
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 sm:h-12 sm:w-12 border-gray-300 shrink-0"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full h-11 sm:h-auto text-sm sm:text-base border-[#1a8f4a] text-[#1a8f4a] hover:bg-[#1a8f4a]/10"
                asChild
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Features */}
            <Card className="bg-green-50/50 border-green-100">
              <CardContent className="p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1a8f4a] rounded-full flex items-center justify-center shrink-0">
                        <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-8 sm:mb-12 lg:mb-16">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
              Product Details
            </h3>
            <div className="prose prose-green max-w-none">
              <p className="text-gray-600">{product.description}</p>
              
              <h4 className="text-lg font-semibold mt-6 mb-3">Benefits</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#1a8f4a] shrink-0 mt-0.5" />
                  <span>Made from 100% natural Ayurvedic ingredients</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#1a8f4a] shrink-0 mt-0.5" />
                  <span>No harmful chemicals or artificial preservatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#1a8f4a] shrink-0 mt-0.5" />
                  <span>Prepared according to traditional Ayurvedic methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#1a8f4a] shrink-0 mt-0.5" />
                  <span>GMP certified manufacturing facility</span>
                </li>
              </ul>

              <h4 className="text-lg font-semibold mt-6 mb-3">How to Use</h4>
              <p className="text-gray-600">
                Please refer to the product packaging for detailed usage instructions
                or consult our Ayurvedic experts for personalized guidance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              <Button
                variant="outline"
                asChild
                className="border-[#1a8f4a] text-[#1a8f4a] hover:bg-[#1a8f4a] hover:text-white"
              >
                <Link href={`/products?category=${product.category?.slug}`}>
                  View All
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct: any) => {
                const relDiscount = relatedProduct.compare_at_price
                  ? Math.round(
                      ((relatedProduct.compare_at_price - relatedProduct.price) /
                        relatedProduct.compare_at_price) *
                        100
                    )
                  : 0;

                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.slug}`}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border-2 border-transparent hover:border-[#1a8f4a]">
                      <div className="relative aspect-square bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                        {relDiscount > 0 && (
                          <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs">
                            {relDiscount}% OFF
                          </Badge>
                        )}
                        <Image
                          src={
                            relatedProduct.images[0]?.image_url ||
                            "/placeholder.png"
                          }
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-3 md:p-4">
                        <h3 className="font-semibold line-clamp-2 text-sm md:text-base group-hover:text-[#1a8f4a] transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-lg font-bold text-[#1a8f4a]">
                            {formatPrice(relatedProduct.price)}
                          </span>
                          {relatedProduct.compare_at_price && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(relatedProduct.compare_at_price)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.name,
              image: sortedImages[0]?.image_url,
              description: product.description,
              sku: product.sku,
              brand: {
                "@type": "Brand",
                name: "Aarogya India",
              },
              offers: {
                "@type": "Offer",
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`,
                priceCurrency: "INR",
                price: product.price,
                availability:
                  product.stock_quantity > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
