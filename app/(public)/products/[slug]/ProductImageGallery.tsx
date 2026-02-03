"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductImageGalleryProps {
  images: Array<{
    image_url: string;
    alt_text?: string;
    display_order: number;
  }>;
  productName: string;
  discount: number;
}

export function ProductImageGallery({
  images,
  productName,
  discount,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border">
        {discount > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-red-500 text-white text-sm px-3 py-1">
              {discount}% OFF
            </Badge>
          </div>
        )}
        <Image
          src={images[selectedImageIndex]?.image_url || "/placeholder.png"}
          alt={images[selectedImageIndex]?.alt_text || productName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square bg-white rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                index === selectedImageIndex
                  ? "border-[#1a8f4a] ring-2 ring-[#1a8f4a]/20"
                  : "border-gray-200 hover:border-[#1a8f4a]"
              }`}
            >
              <Image
                src={image.image_url}
                alt={image.alt_text || productName}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
