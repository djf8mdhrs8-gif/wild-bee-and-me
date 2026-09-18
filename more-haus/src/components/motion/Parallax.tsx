"use client";

import type { ReactNode } from "react";

import { useParallax } from "@/lib/useParallax";

/**
 * Drifts its child vertically as the section passes through the viewport.
 *
 * The child is deliberately rendered taller than its frame so the drift never
 * exposes an edge. Keep `strength` low — anything above about 12% stops reading
 * as depth and starts reading as a trick.
 *
 * Under `prefers-reduced-motion` nothing is registered and the child simply
 * sits still.
 */
export function Parallax({
  children,
  /** Percentage of the frame height to travel across the full scroll. */
  strength = 8,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const { containerRef, innerRef } = useParallax(strength);

  return (
    <div ref={containerRef} className={className}>
      <div
        ref={innerRef}
        className="absolute inset-x-0"
        style={{ height: `${100 + strength * 2}%`, top: `-${strength}%` }}
      >
        {children}
      </div>
    </div>
  );
}
