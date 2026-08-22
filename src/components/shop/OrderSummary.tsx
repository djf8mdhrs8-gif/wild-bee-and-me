"use client";

import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/format";
import { LOCAL_DELIVERY_RADIUS_MILES } from "@/lib/products";

export function OrderSummary({
  action,
  showLines = false,
  className,
}: {
  action?: ReactNode;
  /** Render each cart line above the total — used on the checkout page. */
  showLines?: boolean;
  /** Positioning is set by the caller so sticky wrappers never nest. */
  className?: string;
}) {
  const { resolved, subtotal } = useCart();

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

      <div className="mt-5 flex items-baseline justify-between border-t border-linen pt-5">
        <span className="font-semibold text-forest-800">Total</span>
        <span className="font-display text-2xl font-semibold text-forest-800 tabular-nums">
          {formatPrice(subtotal)}
        </span>
      </div>

      <p className="mt-4 rounded-2xl bg-sand px-4 py-3 text-[0.82rem] leading-relaxed text-ink-muted">
        Free pickup in Alva, or local delivery within{" "}
        {LOCAL_DELIVERY_RADIUS_MILES} miles. We arrange the details with you when
        we confirm your order.
      </p>

      {action ? <div className="mt-6">{action}</div> : null}
    </aside>
  );
}
