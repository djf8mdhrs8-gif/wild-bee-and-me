import type { Metadata } from "next";

import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { AddToCalendar } from "@/components/home-edit/AddToCalendar";
import { EditDateStack } from "@/components/home-edit/EditDateStack";
import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";
import type { Media } from "@/content/types";
import { directionsUrl } from "@/lib/calendar";
import {
  getFollowingEdits,
  getNextEdit,
  getPastEdits,
  homeEditExpectations,
} from "@/lib/content";
import {
  formatEventDate,
  formatEventWeekday,
  formatEventYear,
  formatTimeRange,
} from "@/lib/date";
import { homeEditSchema, serialiseJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Home Edit",
  description:
    "Once a month MORE HAUS opens its collection for an in-person shopping day in Fort Myers — furniture, vintage pieces, decor and newly sourced finds.",
  alternates: { canonical: "/home-edit" },
};

/** The next date is derived from today, so the page refreshes on a schedule. */
export const revalidate = 3600;

const heroImage: Media = {
  src: null,
  alt: "The MORE HAUS studio floor set out for The Home Edit",
  note: "Home Edit hero — the studio floor, set out, full bleed",
  ratio: "wide",
};

export default function HomeEditPage() {
  const next = getNextEdit();
  const following = getFollowingEdits(6);
  const past = getPastEdits(6);

  return (
    <>
      {next ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serialiseJsonLd(homeEditSchema(next)),
          }}
        />
      ) : null}

      {/* Hero */}
      <section className="relative h-[80svh] min-h-[28rem] w-full overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <EditorialImage
            media={heroImage}
            sizes="100vw"
            priority
            dark
            showCaption={false}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-espresso/45"
        />

        <div className="wrap relative flex h-full flex-col justify-end pb-[clamp(2.5rem,7vw,5rem)]">
          <p className="label anim-fade text-parchment/80" style={{ animationDelay: "0.1s" }}>
            Once a month — {site.serviceArea}
          </p>
          <h1 className="display-xl anim-rise mt-6 text-ivory" style={{ animationDelay: "0.2s" }}>
            The Home Edit
            <span className="aside-italic block text-[0.32em] tracking-normal opacity-85">
              by More Haus
            </span>
          </h1>
        </div>
      </section>

      {/* The idea */}
      <section className="wrap py-[clamp(5rem,12vw,10rem)]">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <Eyebrow>The Idea</Eyebrow>
          </Reveal>
          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <h2 className="display-md max-w-[20ch] text-balance">
                One day a month, the studio floor becomes a{" "}
                <span className="aside-italic">shop</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg mt-8 max-w-[56ch] text-smoke">
                Everything sourced over the previous month goes out on the floor
                at once — furniture, lighting, art, ceramics, textiles and
                whatever came back on the truck that week. It is priced, it is
                set out properly, and it goes home the same day.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="body-lg mt-5 max-w-[56ch] text-smoke">
                No previews, no holds before the doors open, and no two editions
                alike. Bring a tape measure and a vehicle bigger than you think
                you need.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Next edit — the one olive block on the page */}
      <section className="grain relative bg-olive text-espresso" aria-labelledby="next-edit">
        <div className="wrap relative z-10 py-[clamp(4rem,10vw,8rem)]">
          {next ? (
            <>
              <Reveal>
                <p className="label text-espresso/70">The next edit</p>
              </Reveal>

              <div className="mt-10 grid gap-x-12 gap-y-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-6" distance={30}>
                  <h2 id="next-edit" className="sr-only">
                    The next Home Edit
                  </h2>
                  <div className="flex items-start gap-8">
                    <EditDateStack event={next} size="lg" />
                    <div className="pt-2">
                      <p className="display-sm">{next.title}</p>
                      <p className="label mt-4 text-espresso/80">
                        {formatEventWeekday(next.date)},{" "}
                        {formatEventDate(next.date)}
                      </p>
                      <p className="label mt-2 text-espresso/80">
                        {formatTimeRange(next.startTime, next.endTime)}
                      </p>
                    </div>
                  </div>

                  <address className="mt-10 not-italic">
                    <p className="label text-espresso/70">Where</p>
                    <p className="mt-3 text-[1.0625rem] leading-relaxed font-light">
                      {next.location.name}
                      <br />
                      {next.location.address}
                      <br />
                      {next.location.city}
                    </p>
                  </address>

                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <a
                      href={directionsUrl(next)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn border-espresso"
                    >
                      Directions
                    </a>
                  </div>

                  <AddToCalendar event={next} className="mt-8" />
                </Reveal>

                <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
                  <p className="body-lg text-espresso/85">{next.description}</p>

                  <div className="mt-10 border-t border-espresso/25 pt-8">
                    <NewsletterForm
                      source="home-edit-page"
                      label="Be first to see what made the next edit."
                    />
                  </div>
                </Reveal>
              </div>
            </>
          ) : (
            <Reveal>
              <h2 id="next-edit" className="display-md max-w-[18ch]">
                The next date is being set.
              </h2>
              <p className="body-lg mt-6 max-w-[46ch] text-espresso/85">
                Dates are announced to the mailing list first, usually a few
                weeks ahead.
              </p>
              <NewsletterForm
                source="home-edit-page"
                label="Be first to hear when the next date is set."
                className="mt-10 max-w-xl"
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* What to expect */}
      <section className="wrap py-[clamp(5rem,12vw,10rem)]" aria-labelledby="expect">
        <Reveal>
          <Eyebrow>What to expect</Eyebrow>
          <h2 id="expect" className="display-md mt-6 max-w-[16ch]">
            What is on the floor.
          </h2>
        </Reveal>

        <div className="mt-[clamp(2.5rem,6vw,4rem)] grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {homeEditExpectations.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="rule pt-6">
                <h3 className="display-sm">{item.title}</h3>
                <p className="body-lg mt-4 text-smoke">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Upcoming schedule */}
      {following.length > 0 ? (
        <section
          className="bg-linen py-[clamp(4rem,10vw,8rem)]"
          aria-labelledby="schedule"
        >
          <div className="wrap">
            <Reveal>
              <Eyebrow>Upcoming</Eyebrow>
              <h2 id="schedule" className="display-md mt-6">
                On the calendar
              </h2>
            </Reveal>

            <ul className="mt-[clamp(2rem,5vw,3.5rem)]">
              {following.map((event, index) => (
                <Reveal as="li" key={event.id} delay={index * 0.05}>
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-espresso/15 py-7">
                    <EditDateStack event={event} size="md" className="w-20 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="display-sm">{event.title}</p>
                      <p className="label mt-2 text-smoke">
                        {formatEventWeekday(event.date)} —{" "}
                        {formatTimeRange(event.startTime, event.endTime)} —{" "}
                        {event.location.city}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <AddToCalendar event={event} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Past edits */}
      <section className="wrap py-[clamp(5rem,12vw,10rem)]" aria-labelledby="past-edits">
        <Reveal>
          <Eyebrow>Archive</Eyebrow>
          <h2 id="past-edits" className="display-md mt-6">
            Past edits
          </h2>
        </Reveal>

        {past.length === 0 ? (
          <Reveal delay={0.08}>
            <p className="body-lg mt-8 max-w-[46ch] text-smoke">
              Photographs from past editions will collect here. The first one is
              coming up.
            </p>
          </Reveal>
        ) : (
          <div className="mt-[clamp(2.5rem,6vw,4rem)] grid grid-cols-2 items-start gap-x-5 gap-y-10 md:grid-cols-3 lg:gap-x-8">
            {past.map((event, index) => (
              <Reveal key={event.id} delay={(index % 3) * 0.06}>
                <figure className="group">
                  <div
                    className={`frame ${index % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"}`}
                  >
                    <EditorialImage
                      media={
                        event.image ?? {
                          src: null,
                          alt: `Photographs from ${event.title}, ${formatEventDate(event.date)}`,
                          note: `Archive — ${formatEventDate(event.date)}`,
                        }
                      }
                      sizes="(min-width: 768px) 30vw, 45vw"
                      zoom
                      showCaption={false}
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-[family-name:var(--font-display)] text-[1.125rem]">
                      {event.title}
                    </p>
                    <p className="label mt-2 text-smoke">
                      {formatEventDate(event.date).replace(
                        `, ${formatEventYear(event.date)}`,
                        "",
                      )}{" "}
                      — {formatEventYear(event.date)}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
