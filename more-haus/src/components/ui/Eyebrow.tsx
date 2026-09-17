import { cn } from "@/lib/cn";

/**
 * The small widely-spaced uppercase label that opens most sections, preceded by
 * a short rule. Used instead of a second heading level.
 */
export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-3",
        onDark ? "text-parchment" : "text-smoke",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          onDark ? "bg-parchment/50" : "bg-espresso/25",
        )}
      />
      {children}
    </span>
  );
}
