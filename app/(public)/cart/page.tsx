"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Leaf, 
  Truck, 
  Shield, 
  ArrowRight,
  Package,
  Sparkles,
  Heart,
  Lock
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { cartItems, isLoading, updateQuantity, removeFromCart, subtotal, itemCount } =
    useCart(user?.id);

  // Not logged in state
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            </div>
            <p className="text-green-100">Your wellness journey awaits</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <Lock className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Login to View Your Cart</h2>
            <p className="text-gray-600 mb-8">
              Sign in to access your saved items and continue shopping for authentic Ayurvedic products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/login?redirect=/cart">
                  Login to Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            </div>
            <p className="text-green-100">Loading your wellness essentials...</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Skeleton Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                      <div className="h-8 bg-gray-200 rounded w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Skeleton Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-12 bg-gray-200 rounded mt-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            </div>
            <p className="text-green-100">Your cart is waiting to be filled</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            {/* Empty Cart Illustration */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="w-16 h-16 text-green-400 mx-auto mb-2" />
                  <Sparkles className="w-6 h-6 text-amber-400 absolute top-8 right-8 animate-bounce" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Discover the healing power of Ayurveda. Browse our collection of natural wellness products.
            </p>
            
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all">
              <Link href="/products">
                <Package className="mr-2 w-5 h-5" />
                Explore Products
              </Link>
            </Button>

            {/* Suggested Categories */}
            <div className="mt-12 pt-12 border-t">
              <p className="text-sm text-gray-500 mb-6">Popular Categories</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Immunity', 'Digestion', 'Hair Care', 'Skin Care'].map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${cat.toLowerCase().replace(' ', '-')}`}
                    className="px-4 py-2 bg-white border-2 border-gray-100 rounded-full text-sm font-medium text-gray-700 hover:border-green-500 hover:text-green-700 transition-all"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tax = subtotal * 0.08;
  const freeShippingThreshold = 399;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 49;
  const total = subtotal + tax + shipping;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="w-8 h-8" />
                <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
              </div>
              <p className="text-green-100">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button 
              asChild 
              variant="outline" 
              className="hidden sm:flex border-white/30 text-white hover:bg-white/10 bg-white/5"
            >
              <Link href="/products">
                <Package className="mr-2 w-4 h-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Free Shipping Progress Bar */}
      {subtotal < freeShippingThreshold && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  Add <span className="text-green-700 font-bold">{formatPrice(freeShippingThreshold - subtotal)}</span> more for <span className="text-green-700 font-bold">FREE Shipping!</span>
                </p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-40 h-40 bg-gradient-to-br from-green-50 to-emerald-50 flex-shrink-0">
                      <Image
                        src={item.product.images[0]?.image_url || "/placeholder.png"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      {/* Stock Badge */}
                      {item.product.stock_quantity < item.quantity && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="destructive" className="text-xs">
                            Low Stock
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-5">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-semibold text-lg text-gray-900 hover:text-green-700 transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                              <Leaf className="w-3 h-3 mr-1" />
                              Ayurvedic
                            </Badge>
                          </div>
                          <p className="text-lg font-bold text-green-700 mt-3">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                        
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          onClick={() => removeFromCart.mutate(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      {item.product.stock_quantity < item.quantity && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          Only {item.product.stock_quantity} available
                        </p>
                      )}

                      {/* Quantity & Total */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">Qty:</span>
                          <div className="flex items-center bg-gray-50 rounded-full overflow-hidden border border-gray-200">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 rounded-full hover:bg-green-100 hover:text-green-700"
                              onClick={() =>
                                updateQuantity.mutate({
                                  cartItemId: item.id,
                                  quantity: Math.max(1, item.quantity - 1),
                                })
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 rounded-full hover:bg-green-100 hover:text-green-700"
                              onClick={() =>
                                updateQuantity.mutate({
                                  cartItemId: item.id,
                                  quantity: item.quantity + 1,
                                })
                              }
                              disabled={item.quantity >= item.product.stock_quantity}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Item Total</p>
                          <p className="text-xl font-bold text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue Shopping Mobile */}
            <div className="block sm:hidden">
              <Button asChild variant="outline" className="w-full border-green-600 text-green-700">
                <Link href="/products">
                  <Package className="mr-2 w-4 h-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Summary Card */}
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Order Summary
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Tax (GST 8%)</span>
                      <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Shipping
                      </span>
                      <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {shipping === 0 ? (
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            FREE
                          </span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-green-700">{formatPrice(total)}</span>
                    </div>

                    {subtotal >= freeShippingThreshold && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Truck className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-sm text-green-700 font-medium">
                          You&apos;ve unlocked FREE shipping! 🎉
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all h-12 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        if (!cartItems || cartItems.length === 0) {
                          return;
                        }
                        router.push("/checkout");
                      }}
                      disabled={!cartItems || cartItems.length === 0 || isLoading}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                      asChild
                    >
                      <Link href="/wishlist">
                        <Heart className="mr-2 w-4 h-4" />
                        Move to Wishlist
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">Secure</p>
                        <p className="text-xs text-gray-500">Payment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">Fast</p>
                        <p className="text-xs text-gray-500">Delivery</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Leaf className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">100%</p>
                        <p className="text-xs text-gray-500">Natural</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Lock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">Privacy</p>
                        <p className="text-xs text-gray-500">Protected</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
                <p className="font-semibold text-gray-900 mb-2">Need Help?</p>
                <p className="text-sm text-gray-600 mb-3">
                  Our Ayurvedic experts are here to assist you.
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-green-700">
                  <Link href="/contact">Contact Support →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
