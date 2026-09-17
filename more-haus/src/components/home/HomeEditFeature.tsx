import Link from "next/link";

import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { AddToCalendar } from "@/components/home-edit/AddToCalendar";
import { EditDateStack } from "@/components/home-edit/EditDateStack";
import { Reveal } from "@/components/motion/Reveal";
import { getFollowingEdits, getNextEdit } from "@/lib/content";
import {
  formatEventDate,
  formatEventDay,
  formatEventMonthShort,
  formatEventWeekday,
  formatTimeRange,
} from "@/lib/date";

/**
 * The Home Edit, given a colour block of its own.
 *
 * This is the only place on the site where the olive from the logo is used at
 * full strength across a whole section — it makes the monthly market read as a
 * thing with its own identity rather than an events widget bolted to the page.
 */
export function HomeEditFeature() {
  const next = getNextEdit();
  const following = getFollowingEdits(3);

  return (
    <section
      className="grain relative bg-olive text-espresso"
      aria-labelledby="home-edit"
    >
      <div className="wrap relative z-10 py-[clamp(5rem,13vw,11rem)]">
        <Reveal>
          <p className="label text-espresso/70">Once a month</p>
          <h2 id="home-edit" className="display-lg mt-6">
            The Home Edit
            <span className="aside-italic block text-[0.42em] tracking-normal opacity-80">
              by More Haus
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="lede mt-10 max-w-[52ch] text-espresso/85">
            One day each month the studio opens its floor. Furniture, vintage
            lighting, art, decor and whatever came back on the truck that week —
            priced, set out, and sold the same day.
          </p>
        </Reveal>

        {next ? (
          <Reveal delay={0.14}>
            <div className="mt-[clamp(3rem,8vw,6rem)] border-t border-espresso/25 pt-10">
              <div className="grid gap-x-10 gap-y-8 md:grid-cols-12">
                <div className="md:col-span-6">
                  <p className="label text-espresso/70">The next edit</p>
                  <div className="mt-6 flex items-start gap-8">
                    <EditDateStack event={next} size="lg" />
                    <div className="pt-2">
                      <p className="display-sm">{next.title}</p>
                      <p className="label mt-4 text-espresso/80">
                        {formatEventWeekday(next.date)}, {formatEventDate(next.date)}
                      </p>
                      <p className="label mt-2 text-espresso/80">
                        {formatTimeRange(next.startTime, next.endTime)}
                      </p>
                      <p className="label mt-2 text-espresso/80">
                        {next.location.city}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-6">
                    <Link href="/home-edit" className="btn border-espresso">
                      View details
                    </Link>
                  </div>

                  <AddToCalendar event={next} className="mt-8" />
                </div>

                <div className="md:col-span-5 md:col-start-8">
                  {following.length > 0 ? (
                    <>
                      <p className="label text-espresso/70">Also on the calendar</p>
                      <ul className="mt-6">
                        {following.map((event) => (
                          <li
                            key={event.id}
                            className="flex items-baseline gap-6 border-b border-espresso/20 py-4"
                          >
                            <span className="label w-12 shrink-0 text-espresso/70">
                              {formatEventMonthShort(event.date)}
                            </span>
                            <span className="font-[family-name:var(--font-display)] text-[1.5rem] leading-none">
                              {formatEventDay(event.date)}
                            </span>
                            <span className="label ml-auto text-right text-espresso/80">
                              {event.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  <NewsletterForm
                    source="home-edit-homepage"
                    label="Be first to see what made the next edit."
                    className="mt-10"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.14}>
            <div className="mt-[clamp(3rem,8vw,6rem)] border-t border-espresso/25 pt-10">
              <p className="lede max-w-[46ch]">
                The next date is being set. Leave your email and it will reach you
                before it reaches anywhere else.
              </p>
              <NewsletterForm
                source="home-edit-homepage"
                label="Be first to see what made the next edit."
                className="mt-8 max-w-xl"
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
