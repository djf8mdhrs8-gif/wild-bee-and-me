"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BagIcon, CloseIcon } from "@/components/ui/Icons";
import { ProductArt } from "@/components/ui/ProductArt";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { isOpen, closeCart, resolved, subtotal, itemCount, setQuantity, remove } =
    useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape to close, and lock background scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 h-full w-full cursor-default bg-forest-900/45 backdrop-blur-[2px]"
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-lift outline-none"
          >
            <div className="flex items-center justify-between border-b border-linen px-6 py-5">
              <h2 className="font-display text-xl font-semibold text-forest-800">
                Your Basket{itemCount > 0 ? ` (${itemCount})` : ""}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full text-forest-600 transition-colors hover:bg-forest-50"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {resolved.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-honey-100 text-honey-600">
                  <BagIcon className="h-8 w-8" />
                </span>
                <p className="font-display text-lg text-forest-800">
                  Your basket is empty
                </p>
                <p className="text-[0.95rem] text-ink-muted">
                  Raw honey, hand-poured salves and tallow skin care — all made on
                  the farm in Alva.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-honey-500 px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-honey-600"
                >
                  Browse the Shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <p className="mb-5 rounded-2xl bg-honey-50 px-4 py-3 text-[0.85rem] text-honey-800">
                    Free pickup in Alva, or local delivery nearby — arranged when
                    we confirm your order.
                  </p>

                  <ul className="space-y-5">
                    {resolved.map((line) => (
                      <li key={line.variantId} className="flex gap-4">
                        <Link
                          href={`/shop/${line.productSlug}`}
                          onClick={closeCart}
                          className="shrink-0"
                        >
                          <ProductArt
                            theme={line.art}
                            image={line.image}
                            alt={`${line.productName} — ${line.variantName}`}
                            sizes="88px"
                            className="h-22 w-22 rounded-2xl border border-linen"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Link
                                href={`/shop/${line.productSlug}`}
                                onClick={closeCart}
                                className="font-display text-[1.05rem] font-semibold text-forest-800 hover:text-honey-600"
                              >
                                {line.productName}
                              </Link>
                              <p className="text-[0.85rem] text-ink-muted">
                                {line.variantName}
                              </p>
                            </div>
                            <span className="font-semibold text-forest-800">
                              {formatPrice(line.lineTotal)}
                            </span>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center rounded-full border border-linen bg-white">
                              <button
                                type="button"
                                onClick={() =>
                                  setQuantity(line.variantId, line.quantity - 1)
                                }
                                aria-label={`Decrease quantity of ${line.productName} ${line.variantName}`}
                                className="grid h-9 w-9 place-items-center rounded-full text-forest-600 transition-colors hover:bg-forest-50"
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-sm font-semibold tabular-nums">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setQuantity(line.variantId, line.quantity + 1)
                                }
                                aria-label={`Increase quantity of ${line.productName} ${line.variantName}`}
                                className="grid h-9 w-9 place-items-center rounded-full text-forest-600 transition-colors hover:bg-forest-50"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(line.variantId)}
                              className="text-[0.82rem] text-ink-muted underline-offset-4 transition-colors hover:text-honey-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-linen bg-white px-6 py-5">
                  <div className="flex items-center justify-between text-[1.05rem]">
                    <span className="font-medium text-ink-muted">Total</span>
                    <span className="font-display text-xl font-semibold text-forest-800">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.8rem] text-ink-muted">
                    Pickup or local delivery arranged at checkout.
                  </p>
                  <div className="mt-4 grid gap-2.5">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="rounded-full bg-honey-500 py-3.5 text-center font-semibold text-white shadow-soft transition-colors hover:bg-honey-600"
                    >
                      Checkout
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="rounded-full border border-forest-200 py-3 text-center font-semibold text-forest-700 transition-colors hover:bg-forest-50"
                    >
                      View full basket
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
