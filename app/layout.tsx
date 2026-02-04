import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Ayukrriti Ayurveda - Authentic Ayurvedic Products",
  description: "Discover authentic Ayurvedic products, herbal remedies, and wellness solutions. Shop traditional Indian Ayurveda medicines and natural health products.",
  keywords: ["ayurveda", "ayurvedic products", "herbal remedies", "natural health", "wellness", "traditional medicine", "ayukrriti"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
