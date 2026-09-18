import { ProductCard } from "@/components/collection/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { getFeaturedProducts } from "@/lib/content";

/**
 * The collection, shown as a gallery wall you scroll sideways through rather
 * than a product grid.
 *
 * Alternating frame heights keep it from reading as a catalogue row, and the
 * rail runs off the right edge of the screen so it is obvious there is more.
 */
export function CollectionPreview() {
  const products = getFeaturedProducts(6);

  return (
    <section
      className="bg-linen py-[clamp(5rem,12vw,10rem)]"
      aria-labelledby="collection-preview"
    >
      <div className="wrap">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>The Collection</Eyebrow>
              <h2 id="collection-preview" className="display-md mt-6 max-w-[16ch]">
                Found, collected and chosen for the home.
              </h2>
            </div>
            <div className="flex items-end lg:col-span-4 lg:col-start-9">
              <p className="body-lg text-smoke">
                A small, changing group of furniture and objects sourced for
                projects and for the studio. When something sells it stays here —
                it is part of the record.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {products.length === 0 ? (
        <div className="wrap mt-16">
          <p className="lede text-smoke">
            The collection is between pieces at the moment. New finds are listed
            after each sourcing trip.
          </p>
        </div>
      ) : (
        <Reveal delay={0.1}>
          {/* Runs past the right edge deliberately — the overflow is the cue. */}
          {/* scroll-px matches px: without it, snapping aligns the first piece to
              the scrollport edge and eats the leading margin. */}
          <div className="rail mt-[clamp(3rem,7vw,5rem)] gap-6 px-[clamp(1.25rem,5vw,5.5rem)] pb-4 scroll-px-[clamp(1.25rem,5vw,5.5rem)] md:gap-10">
            {products.map((product, index) => (
              <div
                key={product.slug}
                className={cn(
                  "w-[68vw] sm:w-[42vw] lg:w-[24vw]",
                  // Every other piece hangs lower, so the rail has a baseline
                  // that moves rather than a ruled shelf.
                  index % 2 === 1 ? "md:pt-[4vw]" : undefined,
                )}
              >
                <ProductCard
                  product={product}
                  aspect={index % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 42vw, 68vw"
                />
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <div className="wrap mt-[clamp(2.5rem,5vw,4rem)]">
        <ArrowLink href="/collection">View the collection</ArrowLink>
      </div>
    </section>
  );
}
