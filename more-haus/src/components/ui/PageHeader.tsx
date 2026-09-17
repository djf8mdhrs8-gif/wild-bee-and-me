import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";

/**
 * The opening of an interior page: label, oversized title, and a standfirst set
 * against the right-hand columns. No centred text, no hero card.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  className,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "wrap pt-[clamp(7rem,14vw,12rem)] pb-[clamp(3rem,7vw,5rem)]",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>

      <div className="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <h1 className="display-lg max-w-[16ch] text-balance lg:col-span-7">
          {title}
        </h1>

        {lede ? (
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <p className="body-lg text-smoke">{lede}</p>
          </div>
        ) : null}
      </div>

      {children}
    </header>
  );
}
