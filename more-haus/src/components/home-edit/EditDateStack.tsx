import type { HomeEditEvent } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatEventDay, formatEventMonthShort } from "@/lib/date";

/** The stacked month-over-day block used wherever an edit is listed. */
export function EditDateStack({
  event,
  size = "md",
  className,
}: {
  event: HomeEditEvent;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dayClass = {
    sm: "text-[2rem]",
    md: "text-[3rem] md:text-[3.75rem]",
    lg: "text-[clamp(4.5rem,11vw,9rem)]",
  }[size];

  return (
    <div className={cn("flex flex-col", className)}>
      <span className="label text-current opacity-70">
        {formatEventMonthShort(event.date)}
      </span>
      <span
        className={cn(
          "font-[family-name:var(--font-display)] leading-[0.85] tracking-[-0.03em]",
          dayClass,
        )}
      >
        {formatEventDay(event.date)}
      </span>
    </div>
  );
}
