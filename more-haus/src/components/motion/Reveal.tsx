"use client";

import { createElement, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/useReveal";

/**
 * The site's one scroll animation: a slow fade and rise, once, as a block
 * arrives.
 *
 * It is a CSS transition rather than a JavaScript animation — there are dozens
 * of these on a page and the browser runs opacity and transform on the
 * compositor for free. Under `prefers-reduced-motion` the transition is
 * neutralised globally in the stylesheet, and the block still renders.
 */
export function Reveal({
  children,
  className,
  /** Seconds. Small offsets (0.06–0.18) stagger siblings. */
  delay = 0,
  /** Travel distance in pixels. Larger blocks want less. */
  distance = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  as?: "div" | "section" | "li" | "figure" | "article";
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return createElement(
    as,
    {
      ref,
      className: cn("motion-reveal", shown && "is-shown", className),
      style: {
        "--reveal-distance": `${distance}px`,
        "--reveal-delay": `${delay}s`,
      } as React.CSSProperties,
    },
    children,
  );
}
