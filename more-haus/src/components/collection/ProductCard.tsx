import Link from "next/link";
import { createElement } from "react";

import { EditorialImage } from "@/components/media/EditorialImage";
import type { Product } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

/**
 * A piece in the collection.
 *
 * Presented as a photograph with type underneath — no border, no shadow, no
 * rounded rectangle. Sold pieces stay on the site because they are half the
 * argument for the studio's eye; they are marked quietly over the image and
 * their price is kept, which reads as provenance rather than as a dead listing.
 */
export function ProductCard({
  product,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw",
  /** 2 on the collection index, where this is the first heading under the h1. */
  headingLevel = 3,
  className,
}: {
  product: Product;
  aspect?: string;
  sizes?: string;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const sold = product.status === "Sold";

  // A piece added without photographs yet is a normal thing for a non-developer
  // to do, and it must not take the whole page down. ProductGallery already
  // guards this; the card did not.
  const cover = product.images[0] ?? {
    src: null,
    alt: product.title,
    note: `${product.title} — photograph to come`,
  };
  const marker =
    product.status === "Available" ? null : product.status.toUpperCase();

  return (
    <article className={cn("group", className)}>
      <Link href={`/collection/${product.slug}`} className="block">
        <div className={cn("frame", aspect)}>
          {/* No placeholder caption here: the piece's name sits directly
              beneath the frame, and a caption would collide with the status
              marker in the same corner. */}
          <EditorialImage
            media={cover}
            sizes={sizes}
            zoom
            showCaption={false}
            className={cn(sold && "opacity-85 saturate-[0.9]")}
          />

          {marker ? (
            <>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-espresso/55 to-transparent"
              />
              <span className="label-sm absolute bottom-4 left-4 text-ivory">
                {marker}
              </span>
            </>
          ) : null}
        </div>

        <div className={cn("mt-4", sold && "opacity-70")}>
          {createElement(
            `h${headingLevel}`,
            {
              className:
                "font-[family-name:var(--font-display)] text-[1.125rem] leading-snug md:text-[1.25rem]",
            },
            product.title,
          )}
          <p className="label mt-2 text-smoke">
            {formatPrice(product.price)}
            <span className="mx-2 text-smoke/40" aria-hidden="true">
              /
            </span>
            {product.category}
          </p>
        </div>
      </Link>
    </article>
  );
}
