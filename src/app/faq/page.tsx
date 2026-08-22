import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BeeIcon, PhoneIcon } from "@/components/ui/Icons";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ — Bee Removal, Raw Honey & Natural Products",
  description:
    "How live bee removal works, when we operate, whether our honey is really raw, how pickup and local delivery work, and what goes into our all-natural salves and tallow skin care.",
  keywords: [
    "how does bee removal work",
    "is raw honey really raw",
    "live bee removal questions Florida",
    "natural salve ingredients",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | The Wild Bee & Me",
    description:
      "Everything people ask about our live bee removal service and our handmade honey, salves and skin care.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "FAQ", path: "/faq" },
            ]),
          ]),
        }}
      />

      <section className="relative isolate overflow-hidden bg-sand pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.09] [mask-image:radial-gradient(70%_80%_at_50%_20%,black,transparent)]"
        />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Questions &amp; Answers</Eyebrow>
            <h1 className="mt-5 text-[2.4rem] leading-[1.06] text-forest-800 sm:text-5xl">
              Everything people ask us
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Honest answers about how removals work, what we do with the bees
              afterwards, and what actually goes into the jars and tins.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <Accordion items={faqs} defaultOpen={0} />
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <div className="rounded-4xl border border-linen bg-white p-8 text-center shadow-soft sm:p-12">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-honey-100 text-honey-600">
                <BeeIcon className="h-7 w-7" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold text-forest-800">
                Still have a question?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[1.02rem] leading-relaxed text-ink-muted">
                {site.owner} answers the phone herself, seven days a week. Send a
                photo of what you are seeing and you will usually get an answer
                the same day.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-honey-500 px-7 py-3.5 font-semibold text-white shadow-soft transition-all hover:bg-honey-600 hover:shadow-lift"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Call {site.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-forest-200 px-7 py-3.5 font-semibold text-forest-700 transition-colors hover:bg-forest-50"
                >
                  Send a message
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
