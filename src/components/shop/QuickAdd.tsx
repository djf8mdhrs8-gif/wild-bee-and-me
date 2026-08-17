"use client";

import { useState } from "react";
import { BagIcon, CheckIcon } from "@/components/ui/Icons";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

/** One-tap add for the most popular variant, straight from a product card. */
export function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const variant = product.variants.find((option) => option.inStock);
  if (!variant) {
    return (
      <p className="mt-4 rounded-full bg-sand py-3 text-center text-[0.9rem] font-medium text-ink-muted">
        Sold out — next batch soon
      </p>
    );
  }

  const handleAdd = () => {
    add(variant.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-700 py-3.5 text-[0.95rem] font-semibold text-cream transition-all hover:bg-forest-800 active:scale-[0.98]"
    >
      {justAdded ? (
        <>
          <CheckIcon className="h-[18px] w-[18px]" />
          Added to basket
        </>
      ) : (
        <>
          <BagIcon className="h-[18px] w-[18px]" />
          Add {variant.name} · {formatPrice(variant.price)}
        </>
      )}
    </button>
  );
}
