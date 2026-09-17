import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";

/**
 * The closing call to action. One per page at most, and never more than a line
 * of type, a sentence, and a single link.
 */
export function InquiryBanner({
  heading,
  body,
  cta = "Start an inquiry",
  href = "/contact",
}: {
  heading: React.ReactNode;
  body: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="grain relative bg-charcoal text-ivory">
      <div className="wrap relative z-10 py-[clamp(5rem,12vw,10rem)]">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display-md max-w-[18ch] text-balance">{heading}</h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <p className="body-lg text-parchment/85">{body}</p>
            <Link href={href} className="btn btn-invert mt-10">
              {cta}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
