import type { Metadata } from "next";

import { EditorialImage } from "@/components/media/EditorialImage";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InquiryBanner } from "@/components/ui/InquiryBanner";
import { site } from "@/content/site";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "MORE HAUS is an interior design studio and curated furniture collection in Southwest Florida, built on the idea that homes should be gathered over time.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Statement over a drifting lifestyle photograph. */}
      <section className="relative isolate h-[72svh] min-h-[26rem] overflow-hidden bg-charcoal">
        <Parallax strength={7} className="absolute inset-0">
          <div className="relative h-full w-full opacity-70">
            <EditorialImage
              media={about.lifestyle}
              sizes="100vw"
              priority
              dark
              showCaption={false}
            />
          </div>
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/35 to-espresso/45"
        />

        <div className="wrap relative flex h-full flex-col justify-end pb-[clamp(2.5rem,7vw,5rem)]">
          <p className="label anim-fade text-parchment/80" style={{ animationDelay: "0.1s" }}>
            About — {site.name}
          </p>
          <h1
            className="display-lg anim-rise mt-6 max-w-[20ch] text-balance text-ivory"
            style={{ animationDelay: "0.2s" }}
          >
            {about.statement}
          </h1>
        </div>
      </section>

      {/* Portrait and biography */}
      <section className="wrap py-[clamp(5rem,12vw,10rem)]" aria-labelledby="biography">
        <div className="grid items-start gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" distance={30}>
            <div className="frame aspect-[4/5]">
              <EditorialImage
                media={about.portrait}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <p className="label mt-5 text-smoke">
              {about.founderName}
              <span className="mx-3 text-smoke/40" aria-hidden="true">
                /
              </span>
              {about.founderRole}
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-[4vw]">
            <Reveal>
              <Eyebrow>Meet the Designer</Eyebrow>
            </Reveal>
            <h2 id="biography" className="sr-only">
              About the designer
            </h2>

            <div className="mt-8 space-y-6">
              {about.biography.map((paragraph, index) => (
                <Reveal key={index} delay={0.06 + index * 0.05}>
                  <p className="body-lg max-w-[54ch] text-smoke">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <dl className="rule mt-12 grid gap-x-10 gap-y-6 pt-8 sm:grid-cols-2">
                <div>
                  <dt className="label text-smoke">Based in</dt>
                  <dd className="mt-2 text-[1.0625rem] font-light">
                    {site.locationLine}
                  </dd>
                </div>
                <div>
                  <dt className="label text-smoke">Service area</dt>
                  <dd className="mt-2 text-[1.0625rem] font-light">
                    {site.serviceArea}, and select projects further afield
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section
        className="bg-linen py-[clamp(5rem,12vw,10rem)]"
        aria-labelledby="philosophy"
      >
        <div className="wrap">
          <Reveal>
            <Eyebrow>Approach</Eyebrow>
            <h2 id="philosophy" className="display-md mt-6 max-w-[18ch]">
              How the work gets made.
            </h2>
          </Reveal>

          <div className="mt-[clamp(2.5rem,6vw,4rem)] grid gap-x-12 gap-y-12 md:grid-cols-2">
            {about.philosophy.map((item, index) => (
              <Reveal key={item.title} delay={(index % 2) * 0.08}>
                <div className="rule grid gap-x-8 gap-y-4 pt-7 sm:grid-cols-12">
                  <p className="label-sm text-smoke/60 sm:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="sm:col-span-10">
                    <h3 className="display-sm">{item.title}</h3>
                    <p className="body-lg mt-4 max-w-[44ch] text-smoke">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected imagery */}
      <section className="wrap py-[clamp(5rem,12vw,10rem)]">
        <div className="grid items-start gap-x-8 gap-y-10 md:grid-cols-12">
          {about.gallery.map((media, index) => {
            const layout = [
              "md:col-span-4",
              "md:col-span-3 md:col-start-6 md:mt-[6vw]",
              "md:col-span-3 md:col-start-10",
            ][index % 3];
            const aspect = ["aspect-square", "aspect-[3/4]", "aspect-[4/5]"][index % 3];

            return (
              <Reveal key={index} className={layout} delay={(index % 3) * 0.07}>
                <figure className="group">
                  <div className={`frame ${aspect}`}>
                    <EditorialImage
                      media={media}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      zoom
                      showCaption={false}
                    />
                  </div>
                  <figcaption className="label-sm mt-3 text-smoke/75">
                    {media.note ?? media.alt}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </section>

      <InquiryBanner
        heading={
          <>
            If any of that sounds like how you want to{" "}
            <span className="aside-italic">live</span>.
          </>
        }
        body="We take on a small number of projects at a time so each one gets the sourcing it needs. Tell us about the house and we will tell you honestly whether we are the right studio for it."
      />
    </>
  );
}
