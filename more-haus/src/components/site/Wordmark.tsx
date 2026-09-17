import Image from "next/image";

import { brandLogo } from "@/content/brand";
import { cn } from "@/lib/cn";

/**
 * The MORE HAUS logo.
 *
 * Renders the real logo as soon as one is set in `src/content/brand.ts`. Until
 * then it falls back to a plain letterspaced serif wordmark — no attempt is
 * made to imitate the handwritten mark, and nothing in the design leans on the
 * fallback, so swapping it in changes only this one element.
 */
export function Wordmark({
  onDark = false,
  size = "md",
  className,
}: {
  onDark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const heights = {
    sm: "h-5 md:h-6",
    md: "h-6 md:h-7",
    lg: "h-10 md:h-14",
  } as const;

  const typeSizes = {
    sm: "text-[0.8125rem] tracking-[0.3em]",
    md: "text-[0.9375rem] md:text-[1.0625rem] tracking-[0.3em]",
    lg: "text-[1.75rem] md:text-[2.5rem] tracking-[0.22em]",
  } as const;

  const source = onDark ? (brandLogo.srcOnDark ?? brandLogo.src) : brandLogo.src;

  if (source) {
    return (
      <span className={cn("block", heights[size], className)}>
        <Image
          src={source}
          alt={brandLogo.alt}
          width={brandLogo.width}
          height={brandLogo.height}
          priority
          className="h-full w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "block font-[family-name:var(--font-display)] uppercase leading-none whitespace-nowrap",
        typeSizes[size],
        className,
      )}
    >
      More&nbsp;Haus
    </span>
  );
}
