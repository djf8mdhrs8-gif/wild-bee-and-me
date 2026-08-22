import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowRightIcon,
  BeeIcon,
  CheckIcon,
  HoneycombIcon,
  LeafIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
} from "@/components/ui/Icons";
import { values } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Ashley More & More Chaos Farm, Alva FL",
  description:
    "Meet Ashley More — licensed beekeeper behind The Wild Bee & Me and More Chaos Farm in Alva, Florida. Humane bee removal, sustainable beekeeping, and natural products made farm-to-family.",
  keywords: [
    "More Chaos Farm Alva FL",
    "Ashley More beekeeper",
    "licensed beekeeper Southwest Florida",
    "sustainable beekeeping Florida",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Ashley More & More Chaos Farm | The Wild Bee & Me",
    description:
      "The story behind The Wild Bee & Me — humane bee removal and handmade natural products from Alva, Florida.",
    url: "/about",
  },
};

const valueIcons = [ShieldIcon, HoneycombIcon, LeafIcon, BeeIcon];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-forest-800 pb-24 pt-32 sm:pb-32 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(110%_90%_at_60%_0%,#3e6250_0%,#1e3a2f_50%,#0d1a15_100%)]"
        />
        <div
          aria-hidden
          className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.14] [mask-image:radial-gradient(70%_75%_at_55%_25%,black,transparent)]"
        />
        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="text-honey-300">Our Story</Eyebrow>
            <h1 className="text-shadow-hero mt-5 text-[2.5rem] leading-[1.05] text-cream sm:text-5xl lg:text-[3.75rem]">
              A farm in Alva, a lot of rescued bees, and one firm rule
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-forest-100 sm:text-xl">
              The rule is simple: the colony comes out alive. Everything else about
              The Wild Bee &amp; Me — the honey, the salves, the balm — grows out
              of keeping it.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Reveal>
              <div className="space-y-6 text-[1.08rem] leading-[1.75] text-ink-muted">
                <p className="font-display text-2xl leading-snug text-forest-800 sm:text-[1.75rem]">
                  Hi, I&rsquo;m {site.owner} — and I&rsquo;m passionate about safe
                  bee rescue, and about making natural products from what the bees
                  give us.
                </p>
                <p>
                  More Chaos Farm sits in {site.address.locality}, Florida. From
                  here I run humane bee removal across Lee, Charlotte and Hendry
                  Counties — relocating colonies safely rather than destroying
                  them.
                </p>
                <p>
                  Every jar of honey, every herbal salve and every skincare product
                  is made with love and respect for these incredible creatures.
                  Nothing is bought in and relabelled, and nothing is bulked out
                  with fillers.
                </p>
                <p>
                  When you choose The Wild Bee &amp; Me you&rsquo;re supporting
                  sustainable beekeeping practices, and getting the purest, most
                  natural products straight from our farm to your family.
                </p>
                <p className="font-medium text-forest-800">
                  That is the whole operation: get the bees out, keep the bees
                  alive, and make something worth having from what they give back.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-honey-500 px-7 py-3.5 font-semibold text-white shadow-soft transition-all hover:bg-honey-600 hover:shadow-lift"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Call {site.phone}
                </a>
                <Link
                  href="/shop"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-forest-200 bg-white px-7 py-3.5 font-semibold text-forest-700 shadow-soft transition-all hover:border-forest-300 hover:shadow-lift"
                >
                  Shop the farm
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="lg:sticky lg:top-28">
                {/* Illustrated farm portrait — swap for a photo of Ashley at the hives. */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-5xl border border-linen shadow-lift">
                  <div className="absolute inset-0 bg-[linear-gradient(155deg,#faefd2_0%,#e8c46b_42%,#5f8570_100%)]" />
                  <div className="bg-honeycomb absolute inset-0 opacity-25" />
                  <svg
                    viewBox="0 0 400 500"
                    className="absolute inset-0 h-full w-full"
                    role="img"
                    aria-label="Illustration of a beekeeper tending hives at More Chaos Farm"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <circle cx="304" cy="86" r="42" fill="#fdf8ec" opacity="0.6" />
                    <path
                      d="M0 356c68-26 104-4 162-16s106-32 156-22 66 20 82 16v166H0z"
                      fill="#2c4a3b"
                      opacity="0.92"
                    />
                    <path
                      d="M0 410c78-20 124 6 184-8s110-24 154-14 50 14 62 12v100H0z"
                      fill="#1e3a2f"
                    />
                    {/* Beekeeper silhouette */}
                    <g transform="translate(196 232)">
                      <ellipse cy="-58" rx="30" ry="34" fill="#fdfbf5" opacity="0.95" />
                      <path d="M-30-58a30 34 0 0 1 60 0z" fill="#f6f0e2" />
                      <path
                        d="M-30-58h60M-30-48h60M-30-38h60"
                        stroke="#8d6844"
                        strokeWidth="1.2"
                        opacity="0.5"
                      />
                      <path
                        d="M-34-24h68l10 96H-44z"
                        fill="#fdfbf5"
                        opacity="0.92"
                      />
                      <path d="M-44 72h88l6 40H-50z" fill="#ece3d0" />
                    </g>
                    {/* Hives */}
                    {[
                      { x: 62, y: 330 },
                      { x: 292, y: 318 },
                    ].map((hive) => (
                      <g key={hive.x} transform={`translate(${hive.x} ${hive.y})`}>
                        <rect x="-4" y="-8" width="62" height="10" rx="3" fill="#6b4a2e" />
                        <rect y="2" width="54" height="19" rx="3" fill="#c8871b" />
                        <rect y="23" width="54" height="19" rx="3" fill="#dda82f" />
                        <rect y="44" width="54" height="19" rx="3" fill="#c8871b" />
                        <rect x="18" y="57" width="18" height="5" rx="2" fill="#5c3b0d" />
                      </g>
                    ))}
                    {/* Bees */}
                    {[
                      { x: 118, y: 186 },
                      { x: 286, y: 216 },
                      { x: 92, y: 268 },
                      { x: 322, y: 158 },
                    ].map((bee) => (
                      <g key={`${bee.x}-${bee.y}`} transform={`translate(${bee.x} ${bee.y})`}>
                        <ellipse rx="6.5" ry="4.6" fill="#241c13" />
                        <path d="M-6.5 0h13" stroke="#dda82f" strokeWidth="2.2" />
                        <ellipse cx="-3" cy="-5.5" rx="5.6" ry="3" fill="#fdfbf5" opacity="0.85" />
                        <ellipse cx="3" cy="-5.5" rx="5.6" ry="3" fill="#fdfbf5" opacity="0.85" />
                      </g>
                    ))}
                  </svg>

                  <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-cream/92 p-5 shadow-soft backdrop-blur-sm">
                    <p className="font-display text-lg font-semibold text-forest-800">
                      {site.owner}
                    </p>
                    <p className="mt-0.5 text-[0.88rem] text-ink-muted">
                      Licensed beekeeper &amp; founder
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-[0.85rem] text-forest-600">
                      <MapPinIcon className="h-4 w-4 text-honey-600" />
                      More Chaos Farm · {site.address.locality},{" "}
                      {site.address.region} {site.address.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="relative isolate overflow-hidden bg-forest-700 py-20 text-cream sm:py-28">
        <div
          aria-hidden
          className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.11] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
        />
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-honey-300">Our Mission</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-[1.45] text-cream sm:text-3xl lg:text-[2.15rem]">
              &ldquo;Get every colony out alive, give them a good home, and make
              honest things from what they give back.&rdquo;
            </p>
            <p className="mt-6 text-[1.02rem] text-forest-200">
              — {site.owner}, More Chaos Farm
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Four things we will not compromise on"
            lede="Not marketing lines — these are the reasons certain jobs get turned down and certain ingredients never make it into a tin."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {values.map((value, index) => {
              const Icon = valueIcons[index] ?? ShieldIcon;
              return (
                <Reveal key={value.title} delay={index * 0.07}>
                  <div className="h-full rounded-4xl border border-linen bg-cream p-7 shadow-soft transition-all hover:border-honey-200 hover:shadow-lift sm:p-9">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-honey-100 text-honey-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-forest-800">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-muted">
                      {value.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Farm to family */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal>
              <Eyebrow>Farm to Family</Eyebrow>
              <h2 className="mt-4 text-3xl leading-[1.1] text-forest-800 sm:text-4xl">
                From a wall in Fort Myers to a jar on your counter
              </h2>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-muted">
                It is a genuinely short chain, and every link happens within about
                twenty miles of Alva:
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ol className="space-y-5">
                {[
                  {
                    title: "A colony gets rescued",
                    detail: "Pulled alive from a wall, tree or soffit somewhere in Lee, Charlotte or Hendry County.",
                  },
                  {
                    title: "It settles in at the farm",
                    detail: "Rehoused in a proper hive, fed and monitored until it is strong.",
                  },
                  {
                    title: "The bees do their work",
                    detail: "Pollinating Southwest Florida and filling frames with wildflower honey.",
                  },
                  {
                    title: "We fill jars and pour tins",
                    detail: "Bottled raw, salves infused for weeks, tallow whipped with honey — all by hand.",
                  },
                  {
                    title: "It reaches your kitchen",
                    detail: "Collected from the farm or delivered locally, made by someone whose name you know.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-honey-500 font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.15rem] font-semibold text-forest-800">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-muted">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-14">
            <div className="flex flex-col items-center gap-6 rounded-5xl border border-linen bg-white p-9 text-center shadow-soft sm:p-12">
              <h2 className="font-display text-2xl font-semibold text-forest-800 sm:text-3xl">
                Support a hive, get something good back
              </h2>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-muted">
                Buying a jar is not charity — it is just a fair trade. It keeps
                rescued colonies fed and housed, and it puts genuinely raw honey on
                your table.
              </p>
              <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
                {[
                  "Sustainable beekeeping",
                  "Nothing exterminated",
                  "Made by hand in Alva",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[0.95rem] font-medium text-forest-700"
                  >
                    <CheckIcon className="h-4 w-4 text-honey-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/shop"
                className="group mt-2 inline-flex items-center gap-2 rounded-full bg-honey-500 px-8 py-4 font-semibold text-white shadow-soft transition-all hover:bg-honey-600 hover:shadow-lift"
              >
                Visit the shop
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
