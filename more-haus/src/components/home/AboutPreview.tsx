import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { about } from "@/lib/content";

/**
 * A portrait hung slightly high against a column of type — the composition is
 * deliberately off-centre so it does not read as a bio card.
 */
export function AboutPreview() {
  return (
    <section className="wrap py-[clamp(5rem,13vw,11rem)]" aria-labelledby="about-preview">
      <div className="grid items-center gap-[clamp(2.5rem,6vw,5rem)] md:grid-cols-12">
        <Reveal className="md:col-span-5" distance={34}>
          <div className="frame aspect-[4/5]">
            <EditorialImage
              media={about.portrait}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.08}>
            <Eyebrow>Meet the Designer</Eyebrow>
          </Reveal>

          <Reveal delay={0.14}>
            <h2 id="about-preview" className="display-md mt-8 max-w-[18ch] text-balance">
              {about.statement}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="body-lg mt-8 max-w-[52ch] text-smoke">
              {about.biography[0]}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="label mt-10 text-espresso">
              {about.founderName}
              <span className="mx-3 text-smoke/40" aria-hidden="true">
                /
              </span>
              <span className="text-smoke">{about.founderRole}</span>
            </p>

            <div className="mt-8">
              <ArrowLink href="/about">Read the full story</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
