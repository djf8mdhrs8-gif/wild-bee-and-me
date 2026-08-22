"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BagIcon, CheckIcon, LeafIcon } from "@/components/ui/Icons";
import { ProductArt } from "@/components/ui/ProductArt";
import { useCart } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

/**
 * Gallery + variant picker + add-to-cart. One component so the imagery and the
 * buy box always agree on which variant is selected.
 */
export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const reduceMotion = useReducedMotion();
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const variant = product.variants[variantIndex];

  // Gallery frames: the product hero followed by one view per variant. Real
  // photos slot straight in via `gallery` / per-variant `image`.
  const frames = [
    { key: "hero", image: product.gallery?.[0] ?? product.image, label: product.name },
    ...(product.gallery?.slice(1) ?? []).map((image, index) => ({
      key: `gallery-${index}`,
      image,
      label: `${product.name} — view ${index + 2}`,
    })),
    ...product.variants.map((option) => ({
      key: option.id,
      image: option.image,
      label: `${product.name} — ${option.name}`,
    })),
  ];

  // Until real photography exists, every frame renders the same illustration —
  // a row of identical thumbnails is just noise, so only show the strip once
  // there are genuinely different images to choose between.
  const distinctImages = new Set(frames.map((f) => f.image ?? "placeholder"));
  const showThumbnails = distinctImages.size > 1;
  /** Where the per-variant frames begin, after the hero and any gallery shots. */
  const variantFrameOffset = frames.length - product.variants.length;
  const [frameIndex, setFrameIndex] = useState(0);
  /**
   * The first frame must paint with the server HTML — animating it in would
   * leave the product image invisible until hydration. Only frames the visitor
   * actively switches to get the fade.
   */
  const [hasSwappedFrame, setHasSwappedFrame] = useState(false);
  const swapFrame = (next: number) => {
    setHasSwappedFrame(true);
    setFrameIndex(next);
  };
  const frame = frames[frameIndex];

  const handleAdd = () => {
    add(variant.id, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Gallery — min-w-0 stops the thumbnail strip's intrinsic width from
          widening the grid track and pushing the page sideways on mobile. */}
      <div className="min-w-0">
        <div className="overflow-hidden rounded-5xl border border-linen bg-white shadow-lift">
          {/*
           * Keyed remount rather than <AnimatePresence mode="wait">: the
           * enter/exit handoff could leave the outgoing frame stranded at
           * opacity 0, blanking the product image after a variant switch.
           * Changing the key remounts the node, so it always fades in fresh
           * and there is no exit animation to stall on.
           */}
          <motion.div
            key={frame.key}
            initial={
              reduceMotion || !hasSwappedFrame
                ? false
                : { opacity: 0, scale: 1.02 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductArt
              theme={product.art}
              image={frame.image}
              alt={frame.label}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-square w-full"
            />
          </motion.div>
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {(showThumbnails ? frames : []).map((thumb, index) => (
            <button
              key={thumb.key}
              type="button"
              onClick={() => swapFrame(index)}
              aria-label={`View ${thumb.label}`}
              aria-current={index === frameIndex}
              className={cn(
                "shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                index === frameIndex
                  ? "border-honey-500 shadow-soft"
                  : "border-linen opacity-70 hover:opacity-100",
              )}
            >
              <ProductArt
                theme={product.art}
                image={thumb.image}
                alt=""
                sizes="80px"
                className="h-20 w-20"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Buy box */}
      <div className="min-w-0">
        <span className="inline-flex rounded-full bg-honey-50 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-honey-700">
          {product.category}
        </span>
        <h1 className="mt-4 text-3xl leading-[1.08] text-forest-800 sm:text-4xl lg:text-[2.9rem]">
          {product.name}
        </h1>
        <p className="mt-3 text-[1.05rem] font-medium text-honey-600">
          {product.tagline}
        </p>

        <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-muted">
          {product.summary}
        </p>

        <div className="mt-8">
          <h2 className="text-[0.88rem] font-semibold text-forest-800">
            Choose your option
          </h2>
          <div className="mt-3 grid gap-2.5">
            {product.variants.map((option, index) => {
              const selected = index === variantIndex;
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={!option.inStock}
                  onClick={() => {
                    setVariantIndex(index);
                    swapFrame(variantFrameOffset + index);
                  }}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all",
                    selected
                      ? "border-honey-500 bg-honey-50/70 shadow-soft"
                      : "border-linen bg-white hover:border-honey-300",
                    !option.inStock && "cursor-not-allowed opacity-50",
                  )}
                >
                  <span>
                    <span className="block font-semibold text-forest-800">
                      {option.name}
                    </span>
                    {option.detail ? (
                      <span className="mt-0.5 block text-[0.85rem] text-ink-muted">
                        {option.detail}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-display text-lg font-semibold text-forest-800">
                      {formatPrice(option.price)}
                    </span>
                    <span
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                        selected
                          ? "border-honey-500 bg-honey-500 text-white"
                          : "border-linen",
                      )}
                    >
                      {selected ? <CheckIcon className="h-3 w-3" /> : null}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center rounded-full border border-linen bg-white">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              aria-label="Decrease quantity"
              className="grid h-12 w-12 place-items-center rounded-full text-lg text-forest-600 transition-colors hover:bg-forest-50"
            >
              −
            </button>
            <span
              aria-live="polite"
              className="w-10 text-center font-semibold tabular-nums"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.min(20, current + 1))}
              aria-label="Increase quantity"
              className="grid h-12 w-12 place-items-center rounded-full text-lg text-forest-600 transition-colors hover:bg-forest-50"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!variant.inStock}
            className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-honey-500 px-8 py-4 text-base font-semibold text-white shadow-soft transition-all hover:bg-honey-600 hover:shadow-lift active:scale-[0.98] disabled:opacity-50"
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-5 w-5" />
                Added to basket
              </>
            ) : (
              <>
                <BagIcon className="h-5 w-5" />
                Add to basket · {formatPrice(variant.price * quantity)}
              </>
            )}
          </button>
        </div>

        <div className="mt-8 space-y-3 border-t border-linen pt-8">
          {product.highlights.map((highlight) => (
            <p
              key={highlight}
              className="flex items-start gap-2.5 text-[0.98rem] text-forest-700"
            >
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-honey-600" />
              {highlight}
            </p>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-sand p-6">
          <h2 className="flex items-center gap-2 font-display text-[1.05rem] font-semibold text-forest-800">
            <LeafIcon className="h-5 w-5 text-forest-500" />
            Ingredients
          </h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
            {product.ingredients.join(" · ")}
          </p>
          <h2 className="mt-6 font-display text-[1.05rem] font-semibold text-forest-800">
            Shipping
          </h2>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
            {product.shipping}
          </p>
        </div>
      </div>
    </div>
  );
}
