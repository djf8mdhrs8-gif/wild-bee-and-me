import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyActions } from "@/components/site/StickyActions";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { site, siteUrl } from "@/lib/site";
import { localBusinessSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Live Bee Removal & Raw Local Honey in Alva, FL`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner }],
  creator: site.owner,
  publisher: site.name,
  keywords: [
    "bee removal Alva FL",
    "bee removal Fort Myers",
    "bee removal Cape Coral",
    "live bee removal Southwest Florida",
    "humane bee removal Lee County",
    "raw honey Alva FL",
    "raw local honey Florida",
    "herbal salves Florida",
    "tallow skincare natural",
    "More Chaos Farm",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} | Live Bee Removal & Raw Local Honey`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Live Bee Removal & Raw Local Honey`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Local Business",
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#1e3a2f",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-700 focus:px-5 focus:py-3 focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>

        <CartProvider>
          <div className="page-shell">
            <Header />
            <main id="main">{children}</main>
            <Footer />
            {/* Breathing room so the sticky mobile bar never covers the footer. */}
            <div aria-hidden className="h-20 md:hidden" />
          </div>
          <CartDrawer />
          <StickyActions />
        </CartProvider>
      </body>
    </html>
  );
}
