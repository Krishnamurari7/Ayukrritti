"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
  className?: string;
  showQuantity?: boolean;
  size?: "sm" | "default" | "lg";
}

export function AddToCartButton({
  productId,
  inStock,
  className,
  showQuantity = true,
  size = "lg",
}: AddToCartButtonProps) {
  const { user } = useAuth();
  const { addToCart } = useCart(user?.id);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }

    addToCart.mutate({ productId, quantity });
  };

  if (!showQuantity) {
    return (
      <Button
        size={size}
        className={cn("bg-[#1a8f4a] hover:bg-[#157a3d]", className)}
        onClick={handleAddToCart}
        disabled={!inStock || addToCart.isPending}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {addToCart.isPending
          ? "Adding..."
          : inStock
          ? "Add to Cart"
          : "Out of Stock"}
      </Button>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4">
        <label className="font-semibold">Quantity:</label>
        <div className="flex items-center border rounded-md">
          <button
            type="button"
            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuantity(Math.max(1, quantity - 1));
            }}
            disabled={!inStock || quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-2 min-w-[3rem] text-center font-medium">{quantity}</span>
          <button
            type="button"
            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuantity(quantity + 1);
            }}
            disabled={!inStock}
          >
            +
          </button>
        </div>
      </div>

      <Button
        size={size}
        className={cn("w-full bg-[#1a8f4a] hover:bg-[#157a3d]", className)}
        onClick={handleAddToCart}
        disabled={!inStock || addToCart.isPending}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {addToCart.isPending
          ? "Adding..."
          : inStock
          ? "Add to Cart"
          : "Out of Stock"}
      </Button>
    </div>
  );
}
