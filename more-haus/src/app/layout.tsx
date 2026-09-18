import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Jost } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { site } from "@/content/site";
import { serialiseJsonLd, studioSchema } from "@/lib/schema";

/** Display serif — headlines, statements and the occasional italic aside. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/** Restrained geometric sans — navigation, labels, product detail, body copy. */
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Interior Design + Curated Furniture, Southwest Florida`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "interior design Fort Myers",
    "interior designer Southwest Florida",
    "curated vintage furniture Florida",
    "antique furniture Fort Myers",
    "Naples interior designer",
    "Sanibel interior design",
    "furniture market Fort Myers",
    "The Home Edit",
    "MORE HAUS",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Interior Design",
};

export const viewport: Viewport = {
  themeColor: "#2B1717",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Next 16 no longer overrides smooth scrolling during navigation unless
      // asked; without this, a route change would animate the whole scroll.
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${jost.variable}`}
    >
      <body>
        {/* Marks the document as scripted before anything paints. The scroll
            reveals start at opacity 0 and are cleared by JavaScript, so
            without this a visitor with JavaScript disabled would be served a
            page whose content is entirely invisible. Inline and synchronous
            on purpose: it has to win the race with first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(studioSchema()) }}
        />
      </body>
    </html>
  );
}
