"use client";

import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/products";

export function OrderSummary({
  action,
  showLines = false,
  className,
}: {
  action?: ReactNode;
  /** Render each cart line above the totals — used on the checkout page. */
  showLines?: boolean;
  /** Positioning is set by the caller so sticky wrappers never nest. */
  className?: string;
}) {
  const { resolved, subtotal, shipping, tax, total } = useCart();

  return (
    <aside
      className={cn(
        "rounded-4xl border border-linen bg-white p-6 shadow-soft sm:p-8",
        className,
      )}
    >
      <h2 className="font-display text-xl font-semibold text-forest-800">
        Order summary
      </h2>

      {showLines ? (
        <ul className="mt-5 space-y-3 border-b border-linen pb-5">
          {resolved.map((line) => (
            <li key={line.variantId} className="flex justify-between gap-4 text-[0.92rem]">
              <span className="text-ink-muted">
                {line.productName}
                <span className="block text-[0.82rem]">
                  {line.variantName} × {line.quantity}
                </span>
              </span>
              <span className="shrink-0 font-medium text-forest-800 tabular-nums">
                {formatPrice(line.lineTotal)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="mt-5 space-y-3 text-[0.95rem]">
        <div className="flex justify-between">
          <dt className="text-ink-muted">Subtotal</dt>
          <dd className="font-medium text-forest-800 tabular-nums">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Shipping</dt>
          <dd className="font-medium text-forest-800 tabular-nums">
            {shipping === 0 ? (
              <span className="text-forest-500">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Florida sales tax</dt>
          <dd className="font-medium text-forest-800 tabular-nums">
            {formatPrice(tax)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between border-t border-linen pt-5">
        <span className="font-semibold text-forest-800">Total</span>
        <span className="font-display text-2xl font-semibold text-forest-800 tabular-nums">
          {formatPrice(total)}
        </span>
      </div>

      {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? (
        <p className="mt-4 rounded-2xl bg-honey-50 px-4 py-3 text-[0.82rem] text-honey-800">
          Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free
          shipping.
        </p>
      ) : null}

      {action ? <div className="mt-6">{action}</div> : null}
    </aside>
  );
}
