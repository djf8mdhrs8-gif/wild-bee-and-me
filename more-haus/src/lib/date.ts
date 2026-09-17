/**
 * Date helpers for The Home Edit.
 *
 * Every event date in `src/content/home-edit.ts` is a plain YYYY-MM-DD string
 * in Eastern Time. Comparing those strings lexicographically is the same as
 * comparing the dates, which keeps this free of timezone drift between the
 * server and the visitor's browser.
 */

export const EVENT_TIME_ZONE = "America/New_York";

/** Today in Eastern Time as YYYY-MM-DD. */
export function todayInEastern(): string {
  // en-CA formats as YYYY-MM-DD, which is exactly the shape we store.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EVENT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Build a Date from the calendar parts only, so formatting never shifts the
 * day across a timezone boundary.
 */
function localDateFromISO(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** "October 17, 2026" */
export function formatEventDate(iso: string): string {
  return localDateFromISO(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** "Saturday" */
export function formatEventWeekday(iso: string): string {
  return localDateFromISO(iso).toLocaleDateString("en-US", { weekday: "long" });
}

/** "OCT" — for the stacked date blocks. */
export function formatEventMonthShort(iso: string): string {
  return localDateFromISO(iso)
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
}

/** "17" — no leading zero. */
export function formatEventDay(iso: string): string {
  return String(localDateFromISO(iso).getDate());
}

/** "2026" */
export function formatEventYear(iso: string): string {
  return String(localDateFromISO(iso).getFullYear());
}

/** "10:00" -> "10 AM"; "15:30" -> "3:30 PM" */
export function formatTime(time24: string): string {
  const [hourRaw, minuteRaw] = time24.split(":").map(Number);
  const suffix = hourRaw >= 12 ? "PM" : "AM";
  const hour = hourRaw % 12 === 0 ? 12 : hourRaw % 12;
  return minuteRaw
    ? `${hour}:${String(minuteRaw).padStart(2, "0")} ${suffix}`
    : `${hour} ${suffix}`;
}

/** "10 AM – 3 PM" */
export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}
