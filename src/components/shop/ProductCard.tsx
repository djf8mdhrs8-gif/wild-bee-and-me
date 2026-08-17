import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { ProductArt } from "@/components/ui/ProductArt";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";
import { QuickAdd } from "@/components/shop/QuickAdd";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const prices = product.variants.map((variant) => variant.price);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  // Show a range when variants differ, so the card price never appears to
  // contradict the named variant on the quick-add button below it.
  const priceLabel =
    lowest === highest
      ? formatPrice(lowest)
      : `${formatPrice(lowest)} – ${formatPrice(highest)}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-linen bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
        tabIndex={-1}
        aria-hidden
      >
        <ProductArt
          theme={product.art}
          image={product.image}
          alt={product.name}
          priority={priority}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-forest-700 backdrop-blur-sm">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-semibold text-forest-800">
          <Link
            href={`/shop/${product.slug}`}
            className="transition-colors hover:text-honey-600"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-[0.85rem] font-medium uppercase tracking-[0.08em] text-honey-600">
          {product.tagline}
        </p>
        <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-muted">
          {product.summary}
        </p>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-linen pt-5">
          <div>
            <span className="block text-[0.72rem] font-medium uppercase tracking-[0.12em] text-ink-muted">
              {product.variants.length > 1
                ? `${product.variants.length} options`
                : "Price"}
            </span>
            <span className="font-display text-xl font-semibold text-forest-800 sm:text-2xl">
              {priceLabel}
            </span>
          </div>
          <Link
            href={`/shop/${product.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-forest-700 transition-colors hover:text-honey-600"
          >
            View options
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <QuickAdd product={product} />
      </div>
    </article>
  );
}
