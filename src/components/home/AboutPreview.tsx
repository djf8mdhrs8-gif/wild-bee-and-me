import Link from "next/link";
import { ArrowRightIcon, BeeIcon } from "@/components/ui/Icons";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const stats = [
  { value: "7 days", label: "A week we take calls" },
  { value: "3 counties", label: "Lee, Charlotte & Hendry" },
  { value: "0", label: "Colonies exterminated" },
];

export function AboutPreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal direction="right">
            {/* Illustrated farm vignette — swap for a photo of Ashley at the hives. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-5xl border border-linen shadow-lift sm:aspect-[5/5]">
              <div className="absolute inset-0 bg-[linear-gradient(160deg,#f6dfae_0%,#e8c46b_38%,#5f8570_100%)]" />
              <div className="bg-honeycomb absolute inset-0 opacity-25" />
              <svg
                viewBox="0 0 400 480"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Illustration of beehives in a field at More Chaos Farm"
                preserveAspectRatio="xMidYMid slice"
              >
                <circle cx="312" cy="92" r="46" fill="#fdf8ec" opacity="0.55" />
                <path
                  d="M0 340c60-22 96-6 150-16s96-34 148-26 74 24 102 18v164H0z"
                  fill="#2c4a3b"
                  opacity="0.9"
                />
                <path
                  d="M0 392c72-18 118 4 176-8s104-26 150-16 62 18 74 14v98H0z"
                  fill="#1e3a2f"
                />
                {/* Hive boxes */}
                {[
                  { x: 74, y: 300 },
                  { x: 176, y: 318 },
                  { x: 268, y: 296 },
                ].map((hive) => (
                  <g key={hive.x} transform={`translate(${hive.x} ${hive.y})`}>
                    <rect x="-4" y="-8" width="66" height="10" rx="3" fill="#6b4a2e" />
                    <rect y="2" width="58" height="20" rx="3" fill="#c8871b" />
                    <rect y="24" width="58" height="20" rx="3" fill="#dda82f" />
                    <rect y="46" width="58" height="20" rx="3" fill="#c8871b" />
                    <rect x="20" y="60" width="18" height="5" rx="2" fill="#5c3b0d" />
                  </g>
                ))}
                {/* Drifting bees */}
                {[
                  { x: 130, y: 200 },
                  { x: 232, y: 158 },
                  { x: 300, y: 232 },
                  { x: 92, y: 250 },
                ].map((bee) => (
                  <g key={`${bee.x}-${bee.y}`} transform={`translate(${bee.x} ${bee.y})`}>
                    <ellipse rx="7" ry="5" fill="#241c13" />
                    <path d="M-7 0h14" stroke="#dda82f" strokeWidth="2.4" />
                    <ellipse cx="-3" cy="-6" rx="6" ry="3.2" fill="#fdfbf5" opacity="0.85" />
                    <ellipse cx="3" cy="-6" rx="6" ry="3.2" fill="#fdfbf5" opacity="0.85" />
                  </g>
                ))}
              </svg>

              <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-cream/92 p-5 shadow-soft backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-honey-100 text-honey-600">
                    <BeeIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-display text-[1.05rem] font-semibold text-forest-800">
                      {site.owner}
                    </p>
                    <p className="text-[0.85rem] text-ink-muted">
                      Licensed beekeeper · More Chaos Farm, Alva FL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-4 text-3xl leading-[1.1] text-forest-800 sm:text-4xl lg:text-[2.75rem]">
              One person, a lot of bees, and a strong opinion about spray cans
            </h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink-muted">
              <p>
                {site.owner} runs More Chaos Farm in Alva, Florida. She is a
                licensed beekeeper who got into removals for a simple reason: a
                neighbour was about to have a healthy colony exterminated, and it
                did not have to go that way.
              </p>
              <p>
                Now she takes calls seven days a week across Lee, Charlotte and
                Hendry Counties. Every colony she pulls out of a wall, a soffit or
                a fallen oak comes home to the farm, gets set up in a proper hive,
                and gets watched until it is thriving.
              </p>
              <p>
                Those same bees make the honey we bottle and the wax that goes into
                every salve and balm. Nothing is outsourced, nothing is bulked out
                with fillers, and the person who made your jar is the person who
                answers the phone.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-linen py-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold text-honey-600 sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-snug text-ink-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest-700 px-7 py-3.5 font-semibold text-cream shadow-soft transition-all hover:bg-forest-800 hover:shadow-lift"
            >
              Read the full story
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
