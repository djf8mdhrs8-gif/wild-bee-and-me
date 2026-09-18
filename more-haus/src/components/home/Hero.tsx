import { EditorialImage } from "@/components/media/EditorialImage";
import { site } from "@/content/site";
import type { Media } from "@/content/types";

const heroImage: Media = {
  src: null,
  alt: "A living room in a MORE HAUS interior, late afternoon light across the floor",
  note: "Homepage hero — full-bleed interior, wide, warm light",
  ratio: "wide",
};

/**
 * Nearly full-height photograph with the brand line set over it.
 *
 * The entrance is CSS rather than JavaScript on purpose: the headline is the
 * largest-contentful element on the site and must paint with the document
 * rather than wait for hydration.
 */
export function Hero() {
  return (
    <section className="relative h-[92svh] min-h-[34rem] w-full overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <EditorialImage
          media={heroImage}
          sizes="100vw"
          priority
          dark
          showCaption={false}
        />
      </div>

      {/* Keeps the type legible without washing the photograph out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/25 to-espresso/40"
      />

      <div className="wrap relative flex h-full flex-col justify-end pt-24 pb-[clamp(2.5rem,7vw,5rem)]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p
              className="label anim-fade text-parchment/80"
              style={{ animationDelay: "0.15s" }}
            >
              {site.name} — {site.serviceArea}
            </p>

            <h1
              className="display-xl anim-rise mt-6 max-w-[22ch] text-balance text-ivory"
              style={{ animationDelay: "0.25s" }}
            >
              Interiors, objects, and pieces{" "}
              <span className="aside-italic">worth keeping</span>.
            </h1>
          </div>

          <div
            className="anim-fade hidden justify-self-end pb-2 lg:col-span-3 lg:block"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="label max-w-[18ch] text-right text-parchment/75">
              Interior design, a curated collection, and a market once a month.
            </p>
          </div>
        </div>

        {/* Scroll cue — a hairline that draws down and retracts. */}
        <div
          className="anim-fade mt-[clamp(2.5rem,6vw,4.5rem)] flex items-center gap-4"
          style={{ animationDelay: "0.85s" }}
        >
          <span className="label-sm text-parchment/70">Scroll</span>
          <span
            aria-hidden="true"
            className="relative h-10 w-px overflow-hidden bg-ivory/20"
          >
            <span className="anim-cue absolute inset-0 block bg-ivory/80" />
          </span>
        </div>
      </div>
    </section>
  );
}
