"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/collection/ProductCard";
import type { Product, ProductCategory } from "@/content/types";
import { cn } from "@/lib/cn";

type Filter = "All" | ProductCategory;

/**
 * The collection, filtered.
 *
 * Sold pieces are shown by default on purpose — they are the clearest evidence
 * of what the studio sources — with an explicit control to hide them for anyone
 * who is actually shopping. Filtering is local state rather than a navigation,
 * so it is instant and never loses your place in a long list.
 */
export function CollectionBrowser({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [hideSold, setHideSold] = useState(false);

  const filters: Filter[] = ["All", ...categories];

  const visible = useMemo(() => {
    return products.filter((product) => {
      if (filter !== "All" && product.category !== filter) return false;
      if (hideSold && product.status === "Sold") return false;
      return true;
    });
  }, [products, filter, hideSold]);

  const soldCount = products.filter((p) => p.status === "Sold").length;

  return (
    <>
      <div className="wrap">
        <div className="rule flex flex-wrap items-center justify-between gap-x-10 gap-y-5 pt-8 pb-5">
          {/* Categories scroll sideways on a phone rather than wrapping to four rows. */}
          <div className="rail -mx-1 max-w-full gap-x-7 px-1">
            {filters.map((option) => {
              const active = option === filter;
              const count =
                option === "All"
                  ? products.length
                  : products.filter((p) => p.category === option).length;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={active}
                  className={cn(
                    "label relative shrink-0 py-2 whitespace-nowrap transition-opacity duration-500",
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-espresso after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active
                      ? "opacity-100 after:scale-x-100"
                      : "opacity-55 after:scale-x-0 hover:opacity-100",
                  )}
                >
                  {option}
                  <span className="ml-2 text-[0.85em] opacity-50">{count}</span>
                </button>
              );
            })}
          </div>

          {soldCount > 0 ? (
            <label className="label flex shrink-0 cursor-pointer items-center gap-3 select-none">
              <input
                type="checkbox"
                checked={hideSold}
                onChange={(event) => setHideSold(event.target.checked)}
                className="peer sr-only"
              />
              {/* The mark is a direct sibling of the input so `peer-checked`
                  reaches it — a nested element would not be selected. */}
              <span
                aria-hidden="true"
                className="block h-4 w-4 border border-espresso/35 transition-colors duration-300 peer-checked:border-espresso peer-checked:bg-espresso peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive-deep"
              />
              Hide sold items
            </label>
          ) : null}
        </div>
      </div>

      <div className="wrap pt-[clamp(2.5rem,6vw,4rem)] pb-[clamp(6rem,14vw,12rem)]">
        {visible.length === 0 ? (
          <div className="py-[clamp(3rem,8vw,6rem)]">
            <p className="display-sm max-w-[22ch]">
              Nothing in {filter === "All" ? "the collection" : filter.toLowerCase()} right
              now.
            </p>
            <p className="body-lg mt-5 max-w-[46ch] text-smoke">
              The collection turns over constantly. Tell us what you are looking
              for and it will be watched for on the next sourcing trip.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {filter !== "All" ? (
                <button type="button" onClick={() => setFilter("All")} className="btn">
                  View everything
                </button>
              ) : null}
              {hideSold ? (
                <button type="button" onClick={() => setHideSold(false)} className="btn">
                  Show sold pieces
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <>
            <p className="sr-only" role="status">
              {visible.length} pieces shown
            </p>
            <div className="grid grid-cols-2 items-start gap-x-4 gap-y-[clamp(2.5rem,5vw,4rem)] sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
              {visible.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  // Ratios alternate so rows stay ragged rather than ruled.
                  aspect={index % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"}
                  className={index % 3 === 2 ? "lg:mt-[3vw]" : undefined}
                  sizes="(min-width: 1024px) 30vw, 45vw"
                  headingLevel={2}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
