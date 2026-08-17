import Link from "next/link";
import { ArrowRightIcon, CheckIcon, ClockIcon, PhoneIcon } from "@/components/ui/Icons";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { removalLocations } from "@/lib/content";
import { site } from "@/lib/site";

export function ServiceCallout() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-700 py-20 text-cream sm:py-28">
      <div
        aria-hidden
        className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.12] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -left-32 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,135,27,0.28),transparent_65%)] blur-3xl"
      />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <Eyebrow className="text-honey-300">Live Bee Removal</Eyebrow>
            <h2 className="mt-4 text-3xl leading-[1.1] text-cream sm:text-4xl lg:text-[2.85rem]">
              Got bees where they shouldn&rsquo;t be?
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-forest-100">
              A honey bee colony can move into a wall cavity in an afternoon and
              build fifty pounds of comb by the end of the season. Spraying them
              leaves that comb behind to ferment, stain and draw pests — and kills
              a pollinator we cannot spare. We take the whole colony out alive and
              seal the space so it does not happen again.
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-honey-400/25 bg-honey-500/10 px-5 py-4 backdrop-blur-sm">
              <ClockIcon className="h-6 w-6 shrink-0 text-honey-300" />
              <p className="text-[0.95rem] text-forest-50">
                <strong className="font-semibold text-cream">
                  Same-day service is often available
                </strong>{" "}
                for bees inside a home, near a doorway, or where someone has a
                sting allergy. Call and say it&rsquo;s urgent.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-honey-500 px-7 py-3.5 font-semibold text-white shadow-soft transition-all hover:bg-honey-400 hover:shadow-lift active:scale-[0.98]"
              >
                <PhoneIcon className="h-5 w-5" />
                {site.phone}
              </a>
              <Link
                href="/bee-removal"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream transition-all hover:border-cream/60 hover:bg-cream/10"
              >
                How removal works
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="rounded-4xl border border-cream/12 bg-forest-800/60 p-8 shadow-lift backdrop-blur-sm sm:p-10">
              <h3 className="font-display text-xl font-semibold text-cream">
                We remove colonies from
              </h3>
              <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {removalLocations.map((location) => (
                  <li
                    key={location}
                    className="flex items-start gap-2.5 text-[0.95rem] text-forest-100"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-honey-400" />
                    {location}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-cream/12 pt-6 text-[0.9rem] leading-relaxed text-forest-200">
                Not sure what you&rsquo;re looking at? Send a photo with your
                request — we can usually tell honey bees from wasps, hornets or a
                passing swarm before anyone drives out.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
