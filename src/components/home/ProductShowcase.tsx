import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/products";

export function ProductShowcase() {
  return (
    <Section id="shop" tone="cream" className="pt-24 sm:pt-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="From Our Hives"
            title="What the bees give us"
            lede="Everything on this page starts in a hive in Alva — much of it from colonies we rescued out of somebody's wall. Made in small batches, filled and labelled by hand."
          />
          <Reveal delay={0.1}>
            <Link
              href="/shop"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-forest-200 bg-white px-6 py-3 font-semibold text-forest-700 shadow-soft transition-all hover:border-forest-300 hover:shadow-lift"
            >
              Shop everything
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.09} className="h-full">
              <ProductCard product={product} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
