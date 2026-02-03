"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product & { images: any[] };
}

export function useCart(userId?: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          id,
          product_id,
          quantity,
          product:products (
            id,
            name,
            slug,
            price,
            stock_quantity,
            is_active,
            images:product_images (
              image_url,
              alt_text
            )
          )
        `
        )
        .eq("user_id", userId);

      if (error) throw error;
      return data as any;
    },
    enabled: !!userId,
  });

  // Add to cart mutation
  const addToCart = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      if (!userId) {
        toast.error("Please login to add items to cart");
        return;
      }

      // Check if item already exists
      const existingItem = cartItems.find(
        (item) => item.product_id === productId
      );

      if (existingItem) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cart_items")
          .insert({ user_id: userId, product_id: productId, quantity });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success("Added to cart");
    },
    onError: () => {
      toast.error("Failed to add to cart");
    },
  });

  // Update quantity mutation
  const updateQuantity = useMutation({
    mutationFn: async ({
      cartItemId,
      quantity,
    }: {
      cartItemId: string;
      quantity: number;
    }) => {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", cartItemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });

  // Remove from cart mutation
  const removeFromCart = useMutation({
    mutationFn: async (cartItemId: string) => {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success("Removed from cart");
    },
    onError: () => {
      toast.error("Failed to remove from cart");
    },
  });

  // Clear cart mutation
  const clearCart = useMutation({
    mutationFn: async () => {
      if (!userId) return;

      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });

  // Calculate totals
  const subtotal =
    cartItems?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) || 0;

  const itemCount =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return {
    cartItems,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    itemCount,
  };
}
