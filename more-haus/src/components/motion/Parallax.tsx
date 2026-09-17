"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Drifts its child vertically as the section passes through the viewport.
 *
 * The child is deliberately rendered taller than its frame so the drift never
 * exposes an edge. Keep `strength` low — anything above about 12% stops reading
 * as depth and starts reading as a trick.
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
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y, height: `${100 + strength * 2}%`, top: `-${strength}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
