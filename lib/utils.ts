import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + "...";
}

/**
 * Checks if an image URL is valid and accessible
 * Uses HEAD request to check without downloading the full image
 * @param url - The image URL to validate
 * @returns Promise<{ valid: boolean; error?: string }>
 */
export async function checkImageUrl(url: string): Promise<{ valid: boolean; error?: string }> {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'Invalid URL' };
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  // Check for known problematic URLs
  if (url.includes('photos.app.goo.gl')) {
    return { valid: false, error: 'Google Photos shared links are not supported. Please use direct image URL.' };
  }

  try {
    // Use Image object to check if image loads (works cross-origin)
    // This is more reliable than fetch HEAD for cross-origin images
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        resolve({ valid: false, error: 'Image load timeout. Please check the URL.' });
      }, 8000); // 8 second timeout

      img.onload = () => {
        clearTimeout(timeout);
        resolve({ valid: true });
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve({ valid: false, error: 'Image failed to load. Please check the URL.' });
      };

      img.src = url;
    });
  } catch (error: any) {
    return { valid: false, error: error.message || 'Failed to validate image URL' };
  }
}