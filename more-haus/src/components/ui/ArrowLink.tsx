import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * A text link with a rule that sweeps under it on hover. The site's default
 * call to action — used everywhere a pill-shaped button would otherwise creep
 * in.
 */
export function ArrowLink({
  href,
  children,
  className,
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "link-rule label inline-flex items-center gap-3",
        onDark ? "text-ivory" : "text-espresso",
        className,
      )}
    >
      {children}
      <span aria-hidden="true" className="text-[0.9em] leading-none">
        &rarr;
      </span>
    </Link>
  );
}
