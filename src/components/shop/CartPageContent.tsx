"use client";

import Link from "next/link";
import { BagIcon } from "@/components/ui/Icons";
import { ProductArt } from "@/components/ui/ProductArt";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function CartPageContent() {
  const { resolved, hydrated, setQuantity, remove, clear } = useCart();

  if (!hydrated) {
    return (
      <div
        className="grid gap-8 lg:grid-cols-[1.5fr_1fr]"
        aria-busy="true"
        aria-label="Loading your basket"
      >
        <div className="space-y-4">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-4xl border border-linen bg-white"
            />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-4xl border border-linen bg-white" />
      </div>
    );
  }

  if (resolved.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-5xl border border-linen bg-white px-8 py-20 text-center shadow-soft">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-honey-100 text-honey-600">
          <BagIcon className="h-8 w-8" />
        </span>
        <h2 className="font-display text-2xl font-semibold text-forest-800">
          Nothing in here yet
        </h2>
        <p className="max-w-sm text-[1.02rem] text-ink-muted">
          Raw honey pulled from our own hives, salves poured by hand, and tallow
          balm with five readable ingredients.
        </p>
        <Link
          href="/shop"
          className="mt-2 rounded-full bg-honey-500 px-8 py-3.5 font-semibold text-white shadow-soft transition-colors hover:bg-honey-600"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div>
        <ul className="space-y-4">
          {resolved.map((line) => (
            <li
              key={line.variantId}
              className="flex flex-col gap-5 rounded-4xl border border-linen bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:p-6"
            >
              <Link href={`/shop/${line.productSlug}`} className="shrink-0">
                <ProductArt
                  theme={line.art}
                  image={line.image}
                  alt={`${line.productName} — ${line.variantName}`}
                  sizes="128px"
                  className="h-28 w-full rounded-3xl border border-linen sm:w-28"
                />
              </Link>

              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link
                    href={`/shop/${line.productSlug}`}
                    className="font-display text-lg font-semibold text-forest-800 transition-colors hover:text-honey-600"
                  >
                    {line.productName}
                  </Link>
                  <p className="text-[0.9rem] text-ink-muted">{line.variantName}</p>
                  <p className="mt-1 text-[0.85rem] text-ink-muted">
                    {formatPrice(line.unitPrice)} each
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(line.variantId)}
                    className="mt-2 text-[0.82rem] text-ink-muted underline-offset-4 transition-colors hover:text-honey-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex items-center rounded-full border border-linen">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.variantId, line.quantity - 1)}
                      aria-label={`Decrease quantity of ${line.productName} ${line.variantName}`}
                      className="grid h-10 w-10 place-items-center rounded-full text-forest-600 transition-colors hover:bg-forest-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.variantId, line.quantity + 1)}
                      aria-label={`Increase quantity of ${line.productName} ${line.variantName}`}
                      className="grid h-10 w-10 place-items-center rounded-full text-forest-600 transition-colors hover:bg-forest-50"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-display text-lg font-semibold text-forest-800 tabular-nums">
                    {formatPrice(line.lineTotal)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/shop"
            className="text-[0.92rem] font-semibold text-forest-700 underline-offset-4 hover:underline"
          >
            ← Continue shopping
          </Link>
          <button
            type="button"
            onClick={clear}
            className="text-[0.88rem] text-ink-muted underline-offset-4 transition-colors hover:text-honey-600 hover:underline"
          >
            Empty basket
          </button>
        </div>
      </div>

      <OrderSummary
        className="lg:sticky lg:top-28"
        action={
          <Link
            href="/checkout"
            className="block rounded-full bg-honey-500 py-4 text-center font-semibold text-white shadow-soft transition-all hover:bg-honey-600 hover:shadow-lift"
          >
            Continue to checkout
          </Link>
        }
      />
    </div>
  );
}
