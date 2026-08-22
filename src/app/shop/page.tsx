import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/shop/ProductCard";
import { CheckIcon, LeafIcon, MapPinIcon, ShieldIcon } from "@/components/ui/Icons";
import { products, LOCAL_DELIVERY_RADIUS_MILES } from "@/lib/products";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop Raw Honey, Herbal Salves & Tallow Skin Care",
  description:
    "Buy raw local honey, hand-poured herbal salves and grass-fed tallow skin care from More Chaos Farm in Alva, Florida. Small batches, natural ingredients. Free pickup in Alva or local delivery nearby.",
  keywords: [
    "raw honey Alva FL",
    "raw local honey Florida",
    "herbal salves Florida",
    "tallow skincare natural",
    "beeswax salve Southwest Florida",
    "buy local honey Fort Myers",
  ],
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop | Raw Honey, Herbal Salves & Tallow Skin Care",
    description:
      "Small-batch honey, salves and skin care made by hand at More Chaos Farm in Alva, Florida.",
    url: "/shop",
  },
};

const promises = [
  {
    Icon: LeafIcon,
    title: "Made on the farm",
    detail: "Poured, filled and labelled by hand in Alva — never white-labelled.",
  },
  {
    Icon: ShieldIcon,
    title: "Short ingredient lists",
    detail: "No synthetic additives, no fillers. Printed in full on every label.",
  },
  {
    Icon: MapPinIcon,
    title: "Pickup or local delivery",
    detail: `Free pickup in Alva, or delivery within ${LOCAL_DELIVERY_RADIUS_MILES} miles. Shipping coming soon.`,
  },
];

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...products.map(productSchema),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
            ]),
          ]),
        }}
      />

      <section className="relative isolate overflow-hidden bg-sand pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.09] [mask-image:radial-gradient(70%_80%_at_50%_20%,black,transparent)]"
        />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The Farm Shop</Eyebrow>
            <h1 className="mt-5 text-[2.4rem] leading-[1.06] text-forest-800 sm:text-5xl lg:text-[3.5rem]">
              Everything here started in a hive
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Raw honey, hand-poured salves and tallow skin care — made in small
              batches at More Chaos Farm in {site.address.locality},{" "}
              {site.address.region}. Much of the wax and honey comes from colonies
              we rescued from somebody&rsquo;s wall, which is a nicer origin story
              than most shelves can offer.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-3">
            {promises.map((promise, index) => (
              <Reveal
                as="li"
                key={promise.title}
                delay={index * 0.07}
                className="flex gap-3.5 rounded-3xl border border-linen bg-white/80 p-5 backdrop-blur-sm"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey-50 text-honey-600">
                  <promise.Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-forest-800">
                    {promise.title}
                  </span>
                  <span className="mt-1 block text-[0.88rem] leading-relaxed text-ink-muted">
                    {promise.detail}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.08} className="h-full">
                <ProductCard product={product} priority={index < 2} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="mt-16">
            <div className="rounded-4xl border border-linen bg-white p-8 shadow-soft sm:p-12">
              <h2 className="font-display text-2xl font-semibold text-forest-800">
                Pickup &amp; local delivery
              </h2>
              <ul className="mt-5 grid gap-3 text-[0.98rem] leading-relaxed text-ink-muted sm:grid-cols-2">
                {[
                  "Free pickup from the farm in Alva, FL",
                  `Local delivery within ${LOCAL_DELIVERY_RADIUS_MILES} miles of Alva`,
                  "We email you to arrange a time once your order is confirmed",
                  "Shipping is coming soon — join the newsletter for updates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-honey-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
