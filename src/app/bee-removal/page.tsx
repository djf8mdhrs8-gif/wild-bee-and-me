import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { RemovalForm } from "@/components/removal/RemovalForm";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import {
  BeeIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
} from "@/components/ui/Icons";
import { faqs, removalLocations, removalProcess, serviceArea } from "@/lib/content";
import { site } from "@/lib/site";
import { beeRemovalServiceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Live Bee Removal in Fort Myers, Cape Coral & Alva FL",
  description:
    "Humane live bee removal across Lee, Charlotte and Hendry Counties, Florida. Licensed beekeeper, 7 days a week, same-day options. Colonies are relocated to our farm — never exterminated. Call 239-600-1058.",
  keywords: [
    "bee removal Fort Myers",
    "bee removal Cape Coral",
    "bee removal Alva FL",
    "live bee removal Southwest Florida",
    "honey bee removal Lee County",
    "bee removal Punta Gorda",
    "bee removal LaBelle FL",
  ],
  alternates: { canonical: "/bee-removal" },
  openGraph: {
    title: "Live Bee Removal in Southwest Florida | The Wild Bee & Me",
    description:
      "Humane live bee removal across Lee, Charlotte and Hendry Counties. Bees relocated, never exterminated.",
    url: "/bee-removal",
  },
};

const comparison = [
  {
    label: "The colony",
    live: "Relocated alive to a working hive at More Chaos Farm",
    spray: "Killed — including the queen and every developing bee",
  },
  {
    label: "The comb",
    live: "Removed by hand, cavity cleaned out completely",
    spray: "Left in the wall to melt, ferment and stain your ceiling",
  },
  {
    label: "What comes next",
    live: "Entry sealed, so the space stops advertising itself to swarms",
    spray: "Residual wax scent draws a new swarm to the exact same spot",
  },
  {
    label: "Secondary pests",
    live: "Nothing left behind to attract them",
    spray: "Rotting honey brings ants, roaches, beetles and small hive beetles",
  },
  {
    label: "Your pollinators",
    live: "Thousands of bees keep pollinating Southwest Florida",
    spray: "A healthy colony gone from an already-declining population",
  },
];

export default function BeeRemovalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            beeRemovalServiceSchema,
            faqSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Bee Removal", path: "/bee-removal" },
            ]),
          ]),
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-forest-800 pb-24 pt-32 sm:pb-32 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_25%_5%,#3e6250_0%,#1e3a2f_48%,#0d1a15_100%)]"
        />
        <div
          aria-hidden
          className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.15] [mask-image:radial-gradient(75%_75%_at_40%_30%,black,transparent)]"
        />

        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="text-honey-300">Live Bee Removal</Eyebrow>
            <h1 className="text-shadow-hero mt-5 text-[2.5rem] leading-[1.05] text-cream sm:text-5xl lg:text-[3.75rem]">
              Humane bee removal across Southwest Florida
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-forest-100 sm:text-xl">
              Every colony we&rsquo;re called out to gets relocated to our farm in
              Alva — queen, brood, comb and all. We serve Lee, Charlotte and
              Hendry Counties seven days a week, and we do not exterminate. Not
              once, not for the awkward jobs, not ever.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-honey-500 px-8 py-4 text-base font-semibold text-white shadow-glow transition-all hover:bg-honey-400 active:scale-[0.98]"
              >
                <PhoneIcon className="h-5 w-5" />
                Call {site.phone}
              </a>
              <Link
                href="#request"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 bg-cream/10 px-8 py-4 text-base font-semibold text-cream backdrop-blur-sm transition-all hover:border-cream/60 hover:bg-cream/20"
              >
                Send a request instead
              </Link>
            </div>

            <ul className="mt-11 grid gap-4 sm:grid-cols-3">
              {[
                { Icon: ClockIcon, text: "7 days a week, same-day options" },
                { Icon: ShieldIcon, text: "Licensed beekeeper" },
                { Icon: MapPinIcon, text: "Lee · Charlotte · Hendry" },
              ].map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-3 rounded-2xl border border-cream/12 bg-cream/[0.06] px-4 py-3.5 text-[0.92rem] text-forest-100 backdrop-blur-sm"
                >
                  <item.Icon className="h-5 w-5 shrink-0 text-honey-400" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Emergency band */}
      <section className="bg-honey-500 py-5 text-white">
        <Container>
          <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
            <p className="text-[1.02rem] font-semibold">
              Bees inside the house, or someone with a sting allergy?
            </p>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-semibold text-honey-700 transition-transform hover:scale-[1.02]"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {site.phone} now
            </a>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The Process"
            title="How a live removal actually goes"
            lede="No mystery, no surprise invoice. Here is the whole job, start to finish."
          />

          <ol className="mt-14 space-y-4">
            {removalProcess.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.06}>
                <div className="group flex gap-6 rounded-4xl border border-linen bg-white p-6 shadow-soft transition-all hover:border-honey-200 hover:shadow-lift sm:gap-8 sm:p-8">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-700 font-display text-lg font-semibold text-cream transition-colors group-hover:bg-honey-500 sm:h-14 sm:w-14 sm:text-xl">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-forest-800">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[1.02rem] leading-relaxed text-ink-muted">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Live vs extermination */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why It Matters"
            title="Live removal vs. calling an exterminator"
            lede="Spraying a colony is the cheaper call today and the expensive one in eighteen months. Here is the honest comparison."
          />

          <Reveal delay={0.08} className="mt-14 overflow-hidden rounded-4xl border border-linen shadow-lift">
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)]">
              <div className="hidden bg-forest-700 px-6 py-5 sm:block" />
              <div className="bg-forest-700 px-6 py-5">
                <p className="flex items-center gap-2 font-display text-[1.05rem] font-semibold text-honey-300">
                  <BeeIcon className="h-5 w-5" />
                  Live removal (what we do)
                </p>
              </div>
              <div className="bg-forest-800 px-6 py-5">
                <p className="font-display text-[1.05rem] font-semibold text-forest-200">
                  Extermination
                </p>
              </div>

              {comparison.map((row, index) => (
                <Fragment key={row.label}>
                  <div
                    className={`px-6 py-5 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-honey-700 sm:text-[0.78rem] ${
                      index % 2 ? "bg-sand" : "bg-honey-50/60"
                    }`}
                  >
                    {row.label}
                  </div>
                  <div
                    className={`px-6 py-5 text-[0.95rem] leading-relaxed text-forest-800 ${
                      index % 2 ? "bg-white" : "bg-cream"
                    }`}
                  >
                    <span className="flex gap-2.5">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-forest-500" />
                      {row.live}
                    </span>
                  </div>
                  <div
                    className={`px-6 py-5 text-[0.95rem] leading-relaxed text-ink-muted ${
                      index % 2 ? "bg-white" : "bg-cream"
                    }`}
                  >
                    <span className="flex gap-2.5">
                      <span aria-hidden className="mt-1 text-red-600">
                        ✕
                      </span>
                      {row.spray}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-10">
            <div className="rounded-4xl border border-honey-200 bg-honey-50 p-7 sm:p-9">
              <h3 className="font-display text-xl font-semibold text-forest-800">
                Where we find them
              </h3>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {removalLocations.map((location) => (
                  <li
                    key={location}
                    className="flex items-start gap-2.5 text-[0.95rem] text-forest-700"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-honey-600" />
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Service area */}
      <section
        id="service-area"
        className="relative isolate overflow-hidden bg-forest-700 py-20 text-cream sm:py-28"
      >
        <div
          aria-hidden
          className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.1] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
        />
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Service Area"
            title="Where we drive"
            lede="Three counties across Southwest Florida. If your town is not listed but you are close to the line, call anyway — we usually can."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {serviceArea.map((area, index) => (
              <Reveal key={area.county} delay={index * 0.08}>
                <div className="h-full rounded-4xl border border-cream/12 bg-forest-800/60 p-7 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-honey-500/15 text-honey-300">
                      <MapPinIcon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-cream">
                      {area.county}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {area.cities.map((city) => (
                      <li
                        key={city}
                        className="rounded-full bg-cream/[0.08] px-3.5 py-1.5 text-[0.85rem] text-forest-100"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <p className="text-[0.95rem] text-forest-200">
              Based in {site.address.locality}, {site.address.region}{" "}
              {site.address.postalCode} — roughly 20 miles east of downtown Fort
              Myers, which puts most of Lee County inside a 40-minute drive.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Request form */}
      <section id="request" className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Get Started</Eyebrow>
              <h2 className="mt-4 text-3xl leading-[1.1] text-forest-800 sm:text-4xl">
                Tell us what you&rsquo;re dealing with
              </h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
                Fill this in and we will get back to you — usually the same day. If
                bees are inside your home or someone in the household is allergic,
                skip the form and call.
              </p>

              <a
                href={site.phoneHref}
                className="mt-7 inline-flex items-center gap-3 rounded-3xl border border-honey-200 bg-white p-5 shadow-soft transition-all hover:border-honey-400 hover:shadow-lift"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-honey-500 text-white">
                  <PhoneIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-xl font-semibold text-forest-800">
                    {site.phone}
                  </span>
                  <span className="block text-[0.85rem] text-ink-muted">
                    {site.hours} · {site.owner} answers
                  </span>
                </span>
              </a>

              <div className="mt-8 space-y-4 rounded-3xl bg-sand p-6">
                <h3 className="font-display text-[1.05rem] font-semibold text-forest-800">
                  Before you call, it helps to know
                </h3>
                {[
                  "Roughly how long the bees have been there",
                  "Which side of the building, and how high up",
                  "Whether they're going into a gap or clustered in the open",
                  "Whether anything has already been sprayed",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-start gap-2.5 text-[0.92rem] text-ink-muted"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-honey-600" />
                    {item}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <RemovalForm />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Removal Questions"
            title="What people ask us most"
          />
          <Reveal delay={0.08} className="mx-auto mt-12 max-w-3xl">
            <Accordion items={faqs.slice(0, 2)} />
          </Reveal>
          <Reveal delay={0.12} className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-white px-6 py-3 font-semibold text-forest-700 shadow-soft transition-all hover:border-forest-300 hover:shadow-lift"
            >
              Read the full FAQ
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
