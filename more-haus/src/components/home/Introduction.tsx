import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The brand statement. Typography does all the work here — no image, no card,
 * and a deliberate column of empty space on the left at desktop width.
 */
export function Introduction() {
  return (
    <section className="wrap py-[clamp(5rem,13vw,11rem)]">
      <div className="grid gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Reveal>
            <Eyebrow>The Studio</Eyebrow>
            <ul className="mt-8 space-y-2">
              {["Interiors", "Collection", "Home Edit"].map((item) => (
                <li key={item} className="label text-espresso/70">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          <Reveal delay={0.08}>
            <h2 className="display-md max-w-[20ch] text-balance">
              We build rooms the slow way — one{" "}
              <span className="aside-italic">found</span> thing at a time.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
            <Reveal delay={0.16}>
              <p className="body-lg text-smoke">
                MORE HAUS is an interior design studio in Southwest Florida and a
                small, rotating collection of furniture and objects. We work on
                whole houses and on single rooms, and we sell the pieces we find
                along the way.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="body-lg text-smoke">
                Nothing here is bought as a set. A home should collect over time,
                and the rooms that look effortless are almost always the ones
                that took the longest.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.28}>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              <ArrowLink href="/design-services">Design services</ArrowLink>
              <ArrowLink href="/about">About the studio</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
