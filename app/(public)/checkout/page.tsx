"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { MapPin, Plus, Check, Home } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SavedAddress {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const { cartItems, subtotal, itemCount, clearCart, isLoading: isCartLoading } = useCart(user?.id);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("new");
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [saveAddress, setSaveAddress] = useState(false);
  const [razorpayKeyId, setRazorpayKeyId] = useState<string>("");

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  // Load saved addresses
  useEffect(() => {
    async function loadAddresses() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("user_addresses")
          .select("*")
          .eq("user_id", user.id)
          .order("is_default", { ascending: false })
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        setSavedAddresses(data || []);
        
        // Auto-select default address if exists
        const defaultAddress = (data as any)?.find((addr: any) => addr.is_default);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
          fillAddressForm(defaultAddress);
        }
      } catch (error) {
        console.error("Error loading addresses:", error);
      } finally {
        setAddressesLoading(false);
      }
    }

    if (user) {
      loadAddresses();
    }
  }, [user, supabase]);

  // Update email when user loads
  useEffect(() => {
    if (user?.email) {
      setShippingInfo((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  // Fetch Razorpay key ID
  useEffect(() => {
    async function fetchRazorpayKey() {
      try {
        const response = await fetch("/api/payment/config");
        const data = await response.json();
        if (response.ok && data.keyId) {
          setRazorpayKeyId(data.keyId);
        }
      } catch (error) {
        console.error("Error fetching Razorpay key:", error);
      }
    }
    fetchRazorpayKey();
  }, []);

  const fillAddressForm = (address: SavedAddress) => {
    setShippingInfo({
      fullName: address.full_name,
      email: user?.email || "",
      phone: address.phone,
      addressLine1: address.address_line1,
      addressLine2: address.address_line2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postal_code,
      country: address.country,
    });
  };

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddressId(addressId);
    
    if (addressId === "new") {
      // Clear form for new address
      setShippingInfo({
        fullName: "",
        email: user?.email || "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      });
    } else {
      // Fill form with selected address
      const address = savedAddresses.find((addr) => addr.id === addressId);
      if (address) {
        fillAddressForm(address);
      }
    }
  };

  // Wait for auth to load before checking user
  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!authLoading && !user) {
    if (typeof window !== 'undefined') {
      window.location.href = "/login?redirect=/checkout";
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  // Wait for cart data to load before checking if empty
  if (isCartLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect to cart page
  if (!isCartLoading && (!cartItems || cartItems.length === 0)) {
    if (typeof window !== 'undefined') {
      window.location.href = "/cart";
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to cart...</p>
          </div>
        </div>
      </div>
    );
  }

  const tax = subtotal * 0.08;
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.addressLine1 || !shippingInfo.city) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Save address if checkbox is checked and using new address
      if (saveAddress && selectedAddressId === "new" && user) {
        try {
          await supabase.from("user_addresses").insert({
            user_id: user.id,
            full_name: shippingInfo.fullName,
            phone: shippingInfo.phone,
            address_line1: shippingInfo.addressLine1,
            address_line2: shippingInfo.addressLine2 || null,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.postalCode,
            country: shippingInfo.country,
            is_default: savedAddresses.length === 0, // Make it default if it's the first address
          } as any);
        } catch (error) {
          console.error("Error saving address:", error);
          // Don't block checkout if address save fails
        }
      }

      if (paymentMethod === "razorpay") {
        // Load Razorpay script
        const res = await loadRazorpayScript();
        if (!res) {
          toast.error("Razorpay SDK failed to load");
          setLoading(false);
          return;
        }

        // Create order
        const response = await fetch("/api/checkout/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shippingAddress: shippingInfo,
            paymentMethod: "razorpay",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create order");
        }

        // Initialize Razorpay
        const options = {
          key: razorpayKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.razorpayOrder.amount,
          currency: data.razorpayOrder.currency,
          name: "TechStore",
          description: "Order Payment",
          order_id: data.razorpayOrder.id,
          handler: async function (response: any) {
            try {
              // Verify payment
              const verifyResponse = await fetch("/api/checkout/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: data.orderId,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyResponse.json();

              if (verifyResponse.ok) {
                clearCart.mutate();
                toast.success("Payment successful!");
                router.push(`/account/orders/${data.orderNumber}`);
              } else {
                throw new Error(verifyData.error);
              }
            } catch (error: any) {
              toast.error(error.message || "Payment verification failed");
            }
          },
          prefill: {
            name: shippingInfo.fullName,
            email: shippingInfo.email,
            contact: shippingInfo.phone,
          },
          theme: {
            color: "#000000",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        // COD
        const response = await fetch("/api/checkout/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shippingAddress: shippingInfo,
            paymentMethod: "cod",
          }),
        });

        const data = await response.json();

        if (response.ok) {
          clearCart.mutate();
          toast.success("Order placed successfully!");
          router.push(`/account/orders/${data.orderNumber}`);
        } else {
          throw new Error(data.error);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Checkout</h1>

      <form onSubmit={handleCheckout}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Saved Addresses */}
            {!addressesLoading && savedAddresses.length > 0 && (
              <Card className="border-green-100">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      Select Delivery Address
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-green-600 text-green-700 hover:bg-green-50"
                    >
                      <Link href="/account/addresses">
                        <Plus className="h-4 w-4 mr-2" />
                        Manage Addresses
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedAddressId} onValueChange={handleAddressSelection}>
                    <div className="space-y-3">
                      {savedAddresses.map((address) => (
                        <div
                          key={address.id}
                          className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            selectedAddressId === address.id
                              ? "border-green-600 bg-green-50/50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                          onClick={() => handleAddressSelection(address.id)}
                        >
                          <div className="flex items-start gap-3">
                            <RadioGroupItem
                              value={address.id}
                              id={address.id}
                              className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Label
                                  htmlFor={address.id}
                                  className="font-semibold text-gray-900 cursor-pointer"
                                >
                                  {address.full_name}
                                </Label>
                                {address.is_default && (
                                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                    <Home className="h-3 w-3" />
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {address.address_line1}
                                {address.address_line2 && `, ${address.address_line2}`}
                              </p>
                              <p className="text-sm text-gray-600">
                                {address.city}, {address.state} - {address.postal_code}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                Phone: <span className="font-medium">{address.phone}</span>
                              </p>
                            </div>
                            {selectedAddressId === address.id && (
                              <div className="flex-shrink-0">
                                <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {/* Add New Address Option */}
                      <div
                        className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedAddressId === "new"
                            ? "border-green-600 bg-green-50/50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                        onClick={() => handleAddressSelection("new")}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="new" id="new" className="mt-1" />
                          <div className="flex-1">
                            <Label
                              htmlFor="new"
                              className="font-semibold text-gray-900 cursor-pointer flex items-center gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Use a New Address
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              Enter a new delivery address
                            </p>
                          </div>
                          {selectedAddressId === "new" && (
                            <div className="flex-shrink-0">
                              <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {/* Shipping Information Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedAddressId === "new" || savedAddresses.length === 0
                    ? "Enter Shipping Details"
                    : "Delivery Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedAddresses.length > 0 && selectedAddressId !== "new" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Using selected saved address. You can edit the fields below if needed.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    value={shippingInfo.addressLine1}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={shippingInfo.addressLine2}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, addressLine2: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, state: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Save Address Checkbox */}
                {selectedAddressId === "new" && (
                  <div className="flex items-center space-x-2 p-4 bg-green-50 rounded-lg border border-green-200">
                    <input
                      type="checkbox"
                      id="saveAddress"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                    />
                    <Label htmlFor="saveAddress" className="cursor-pointer text-sm">
                      Save this address for future orders
                    </Label>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 border p-3 sm:p-4 rounded-lg">
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-sm sm:text-base">Razorpay</div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Credit/Debit Card, UPI, Net Banking
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 sm:p-4 rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-sm sm:text-base">Cash on Delivery</div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Pay when you receive
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-2">
                      <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.image_url || "/placeholder.png"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
