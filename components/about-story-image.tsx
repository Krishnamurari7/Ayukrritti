"use client";

import Image from "next/image";
import { useState } from "react";

interface AboutStoryImageProps {
  src: string;
  alt: string;
}

export function AboutStoryImage({ src, alt }: AboutStoryImageProps) {
  const [imageError, setImageError] = useState(false);

  // Clean up Google Photos URL - remove authuser parameter if present
  const cleanUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.delete("authuser");
      return urlObj.toString();
    } catch {
      return url;
    }
  };

  const cleanedSrc = src ? cleanUrl(src) : "";

  if (imageError || !cleanedSrc) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#F4E4B7] to-white flex items-center justify-center text-gray-400">
        <div className="text-center p-4">
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={cleanedSrc}
      alt={alt}
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-500"
      unoptimized
      onError={() => {
        setImageError(true);
      }}
    />
  );
}
