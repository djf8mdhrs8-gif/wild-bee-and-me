import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  BeeIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { serviceArea } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — Bee Removal & Orders in Alva, FL",
  description:
    "Call 239-600-1058 for live bee removal in Lee, Charlotte and Hendry Counties, or message us about honey, salves and tallow skin care from More Chaos Farm in Alva, Florida.",
  keywords: [
    "bee removal phone number Fort Myers",
    "contact bee removal Alva FL",
    "local honey Alva FL contact",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact The Wild Bee & Me | Alva, Florida",
    description:
      "Call 239-600-1058 for humane bee removal across Southwest Florida, or send us a message.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // LocalBusiness is already emitted site-wide from the root layout.
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />

      <section className="relative isolate overflow-hidden bg-sand pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.09] [mask-image:radial-gradient(70%_80%_at_50%_20%,black,transparent)]"
        />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Get in Touch</Eyebrow>
            <h1 className="mt-5 text-[2.4rem] leading-[1.06] text-forest-800 sm:text-5xl">
              Call, message, or send us a photo
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              {site.owner} answers her own phone, seven days a week. If bees are
              inside your home or someone in the household is allergic, calling is
              always faster than typing.
            </p>
          </div>
        </Container>
      </section>

      {/* Bee removal shortcut */}
      <section className="bg-honey-500 py-6 text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <BeeIcon className="hidden h-8 w-8 shrink-0 sm:block" />
              <p className="text-[1.02rem] font-semibold">
                Need bees removed? Skip the form — the request page gets you
                answered fastest.
              </p>
            </div>
            <Link
              href="/bee-removal#request"
              className="shrink-0 rounded-full bg-white px-6 py-3 font-semibold text-honey-700 transition-transform hover:scale-[1.02]"
            >
              Request a removal
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Details */}
            <Reveal className="min-w-0">
              <div className="space-y-4">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-4 rounded-4xl border border-honey-200 bg-white p-6 shadow-soft transition-all hover:border-honey-400 hover:shadow-lift"
                >
                  <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-honey-500 p-3 text-white">
                    <PhoneIcon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Call or text
                    </span>
                    <span className="block font-display text-xl font-semibold text-forest-800">
                      {site.phone}
                    </span>
                  </span>
                </a>

                {site.email ? (
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-4 rounded-4xl border border-linen bg-white p-6 shadow-soft transition-all hover:border-honey-300 hover:shadow-lift"
                  >
                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-forest-50 p-3 text-forest-600">
                      <MailIcon className="h-6 w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Email
                      </span>
                      <span className="block truncate font-display text-lg font-semibold text-forest-800">
                        {site.email}
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="flex items-start gap-4 rounded-4xl border border-linen bg-white p-6 shadow-soft">
                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-forest-50 p-3 text-forest-600">
                      <MailIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Prefer to write?
                      </span>
                      <p className="mt-1 font-display text-lg font-semibold text-forest-800">
                        Use the form
                      </p>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-muted">
                        It reaches us straight away, and you&rsquo;ll get a reply to
                        the address you give.
                      </p>
                    </div>
                  </div>
                )}

                <div className="rounded-4xl border border-linen bg-white p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-forest-50 p-3 text-forest-600">
                      <MapPinIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Where we are
                      </span>
                      <p className="mt-1 font-display text-lg font-semibold text-forest-800">
                        More Chaos Farm
                      </p>
                      <p className="text-[0.95rem] text-ink-muted">
                        {site.address.locality}, {site.address.region}{" "}
                        {site.address.postalCode}
                      </p>
                      <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-muted">
                        The farm is a working apiary, so visits are by arrangement
                        only — call ahead and we will sort out a time.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-4xl border border-linen bg-white p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-forest-50 p-3 text-forest-600">
                      <ClockIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Hours
                      </span>
                      <p className="mt-1 font-display text-lg font-semibold text-forest-800">
                        {site.hours}
                      </p>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-muted">
                        Urgent removals are handled outside those hours whenever we
                        can — call and say it&rsquo;s an emergency.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-4xl border border-linen bg-white p-6 shadow-soft">
                  <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Follow the farm
                  </span>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={site.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-sand p-4 transition-colors hover:bg-honey-50"
                    >
                      <InstagramIcon className="h-5 w-5 text-honey-600" />
                      <span className="min-w-0">
                        <span className="block text-[0.8rem] font-semibold text-forest-800">
                          Instagram
                        </span>
                        <span className="block truncate text-[0.78rem] text-ink-muted">
                          {site.social.instagram.handle}
                        </span>
                      </span>
                    </a>
                    <a
                      href={site.social.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-sand p-4 transition-colors hover:bg-honey-50"
                    >
                      <FacebookIcon className="h-5 w-5 text-honey-600" />
                      <span className="min-w-0">
                        <span className="block text-[0.8rem] font-semibold text-forest-800">
                          Facebook
                        </span>
                        <span className="block truncate text-[0.78rem] text-ink-muted">
                          {site.social.facebook.handle}
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>

          {/* Service area */}
          <Reveal delay={0.15} className="mt-14">
            <div className="rounded-4xl border border-linen bg-white p-8 shadow-soft sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-forest-800">
                Where we travel for removals
              </h2>
              <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-ink-muted">
                Based in {site.address.locality}, about 20 miles east of downtown
                Fort Myers. If you are near a county line but not on the list, call
                anyway — we usually can.
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {serviceArea.map((area) => (
                  <div key={area.county}>
                    <h3 className="flex items-center gap-2 font-display text-[1.05rem] font-semibold text-forest-800">
                      <MapPinIcon className="h-4 w-4 text-honey-600" />
                      {area.county}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {area.cities.map((city) => (
                        <li
                          key={city}
                          className="rounded-full bg-sand px-3 py-1.5 text-[0.82rem] text-forest-700"
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
