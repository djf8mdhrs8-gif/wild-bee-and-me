import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { ServiceCallout } from "@/components/home/ServiceCallout";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { FaqSection } from "@/components/home/FaqSection";
import { beeRemovalServiceSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Live Bee Removal & Raw Local Honey in Alva, FL",
  description:
    "Humane live bee removal in Fort Myers, Cape Coral and across Lee, Charlotte & Hendry Counties — colonies relocated, never exterminated. Plus raw local honey, herbal salves and tallow skin care from More Chaos Farm in Alva, Florida.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([beeRemovalServiceSchema, faqSchema]),
        }}
      />
      <Hero />
      <TrustBadges />
      <ProductShowcase />
      <ServiceCallout />
      <AboutPreview />
      <Testimonials />
      <Newsletter />
      <FaqSection />
    </>
  );
}
