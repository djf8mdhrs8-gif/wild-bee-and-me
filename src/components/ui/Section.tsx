import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "cream" | "sand" | "forest" | "white" | "none";
}) {
  const tones = {
    cream: "bg-cream",
    sand: "bg-sand",
    white: "bg-white",
    forest: "bg-forest-700 text-cream",
    none: "",
  } as const;

  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", tones[tone], className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-honey-600",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-honey-400" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={tone === "dark" ? "text-honey-300" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "mt-4 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-cream" : "text-forest-800",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-forest-100" : "text-ink-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
