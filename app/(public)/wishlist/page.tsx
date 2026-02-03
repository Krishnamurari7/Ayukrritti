"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import type { Metadata } from "next";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price?: number;
    images: { image_url: string; alt_text: string }[];
    stock_quantity: number;
  };
}

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulated wishlist data for demo
  useEffect(() => {
    // In a real app, this would fetch from your API/database
    const demoItems: WishlistItem[] = [
      {
        id: "1",
        product: {
          id: "prod-1",
          name: "Ashwagandha Churna - Stress Relief & Energy Booster",
          slug: "ashwagandha-churna",
          price: 299,
          compare_at_price: 399,
          images: [
            {
              image_url:
                "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400&h=400&fit=crop",
              alt_text: "Ashwagandha Churna",
            },
          ],
          stock_quantity: 50,
        },
      },
      {
        id: "2",
        product: {
          id: "prod-2",
          name: "Triphala Tablets - Digestive Health & Detox",
          slug: "triphala-tablets",
          price: 249,
          compare_at_price: 299,
          images: [
            {
              image_url:
                "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
              alt_text: "Triphala Tablets",
            },
          ],
          stock_quantity: 30,
        },
      },
      {
        id: "3",
        product: {
          id: "prod-3",
          name: "Kumkumadi Tailam - Radiant Skin Face Oil",
          slug: "kumkumadi-tailam",
          price: 599,
          compare_at_price: 799,
          images: [
            {
              image_url:
                "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
              alt_text: "Kumkumadi Tailam",
            },
          ],
          stock_quantity: 0,
        },
      },
    ];

    setTimeout(() => {
      setWishlistItems(user ? demoItems : []);
      setLoading(false);
    }, 500);
  }, [user]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from wishlist");
  };

  const addToCart = (productName: string) => {
    toast.success(`${productName} added to cart`);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8">
          <Heart className="h-16 w-16 mx-auto mb-4 text-[#1a8f4a]" />
          <h2 className="text-2xl font-bold mb-2">Your Wishlist Awaits</h2>
          <p className="text-muted-foreground mb-6">
            Please login to view and manage your wishlist items.
          </p>
          <Link href="/login?redirect=/wishlist">
            <Button className="bg-[#1a8f4a] hover:bg-[#157a3d]">
              Login to Continue
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8">
          <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Browse our products and add your favorites to the wishlist.
          </p>
          <Link href="/products">
            <Button className="bg-[#1a8f4a] hover:bg-[#157a3d]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-muted-foreground mt-1">
              {wishlistItems.length} item{wishlistItems.length !== 1 && "s"} in
              your wishlist
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="border-[#1a8f4a] text-[#1a8f4a] hover:bg-[#1a8f4a] hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Link href={`/products/${item.product.slug}`}>
                  <Image
                    src={item.product.images[0]?.image_url || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                {item.product.stock_quantity === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group/btn"
                >
                  <Trash2 className="h-4 w-4 text-gray-500 group-hover/btn:text-red-500" />
                </button>
                {item.product.compare_at_price && (
                  <span className="absolute top-3 left-3 bg-[#1a8f4a] text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(
                      ((item.product.compare_at_price - item.product.price) /
                        item.product.compare_at_price) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>
              <CardContent className="p-4">
                <Link href={`/products/${item.product.slug}`}>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-[#1a8f4a] transition-colors">
                    {item.product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-[#1a8f4a]">
                    {formatPrice(item.product.price)}
                  </span>
                  {item.product.compare_at_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(item.product.compare_at_price)}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => addToCart(item.product.name)}
                  disabled={item.product.stock_quantity === 0}
                  className="w-full bg-[#1a8f4a] hover:bg-[#157a3d] disabled:bg-gray-300"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.product.stock_quantity === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
