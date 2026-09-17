import type { Metadata } from "next";

import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { InquiryBanner } from "@/components/ui/InquiryBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { getServices } from "@/lib/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Design Services",
  description:
    "Full-service interior design, furnishing and styling, consultations and single-room work across Southwest Florida.",
  alternates: { canonical: "/design-services" },
};

export default function DesignServicesPage() {
  const services = getServices();

  return (
    <>
      <PageHeader
        eyebrow="Design Services"
        title={
          <>
            Four ways to work{" "}
            <span className="aside-italic">together</span>.
          </>
        }
        lede="Some houses need everything. Some need one room looked at properly. We scope each project on its own rather than selling a package."
      />

      <div className="wrap pb-[clamp(4rem,9vw,7rem)]">
        {services.map((service, index) => {
          const imageFirst = index % 2 === 0;

          return (
            <section
              key={service.slug}
              aria-labelledby={service.slug}
              className="rule grid items-start gap-x-12 gap-y-10 py-[clamp(3.5rem,8vw,6.5rem)] lg:grid-cols-12"
            >
              <Reveal
                className={cn(
                  "lg:col-span-5",
                  imageFirst ? "lg:order-1" : "lg:order-2 lg:col-start-8",
                )}
                distance={30}
              >
                <div className="frame aspect-[4/5]">
                  <EditorialImage
                    media={service.image}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
              </Reveal>

              <div
                className={cn(
                  "lg:col-span-6",
                  imageFirst ? "lg:order-2 lg:col-start-7" : "lg:order-1 lg:col-start-1",
                )}
              >
                <Reveal delay={0.06}>
                  <p className="label-sm text-smoke/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 id={service.slug} className="display-md mt-4 max-w-[14ch]">
                    {service.title}
                  </h2>
                  <p className="lede mt-6 max-w-[42ch] text-smoke">
                    {service.summary}
                  </p>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-8 space-y-5">
                    {service.description.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="body-lg max-w-[54ch] text-smoke"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    <div>
                      <h3 className="label text-smoke">Includes</h3>
                      <ul className="mt-5 space-y-2.5">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[0.9375rem] leading-relaxed font-light"
                          >
                            <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-espresso/35" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="label text-smoke">Best for</h3>
                      <p className="mt-5 text-[0.9375rem] leading-relaxed font-light">
                        {service.bestFor}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <InquiryBanner
        heading={
          <>
            Tell us about the house, and what is{" "}
            <span className="aside-italic">not</span> working in it.
          </>
        }
        body="Every project starts the same way: a conversation about the rooms you actually use. Send as much or as little as you like — we will come back with the right scope and what it would take."
      />
    </>
  );
}
