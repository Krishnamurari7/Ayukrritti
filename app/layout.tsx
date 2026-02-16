import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { MetaPixel } from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Ayukrriti Ayurveda - Authentic Ayurvedic Products",
  description: "Discover authentic Ayurvedic products, herbal remedies, and wellness solutions. Shop traditional Indian Ayurveda medicines and natural health products.",
  keywords: ["ayurveda", "ayurvedic products", "herbal remedies", "natural health", "wellness", "traditional medicine", "ayukrriti"],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Ayukrriti Ayurveda - Authentic Ayurvedic Products",
    description: "Discover authentic Ayurvedic products, herbal remedies, and wellness solutions.",
    url: "https://ayukrriti.com",
    siteName: "Ayukrriti Ayurveda",
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "Ayukrriti Ayurveda Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayukrriti Ayurveda - Authentic Ayurvedic Products",
    description: "Discover authentic Ayurvedic products, herbal remedies, and wellness solutions.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <MetaPixel />
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
