import { site } from "@/content/site";
import type { HomeEditEvent } from "@/content/types";
import { EVENT_TIME_ZONE } from "./date";

/**
 * Serialises structured data for injection into a `<script>` tag.
 *
 * `JSON.stringify` does not escape `<`, so a description containing the
 * characters `</script>` would close the tag early and everything after it
 * would be parsed as HTML — which executes. That is reachable today by typing
 * the wrong thing into a content file, and becomes a genuine injection route
 * the moment this content comes from a CMS rather than the repository.
 *
 * `<`, `>` and `&` only ever appear inside string values in JSON, never in its
 * structure, so escaping them everywhere is safe and keeps the JSON valid.
 * U+2028 and U+2029 are legal in JSON strings but are line terminators in
 * JavaScript, so they go too.
 */
export function serialiseJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** Structured data for the studio itself. Rendered once, in the root layout. */
export function studioSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InteriorDesignBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    areaServed: site.serviceArea,
    sameAs: site.social.map((channel) => channel.href),
  };
}

/** Structured data for a Home Edit, so the date can surface in search. */
export function homeEditSchema(event: HomeEditEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.title} by ${site.name}`,
    description: event.description,
    startDate: `${event.date}T${event.startTime}:00`,
    endDate: `${event.date}T${event.endTime}:00`,
    eventSchedule: { "@type": "Schedule", scheduleTimezone: EVENT_TIME_ZONE },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location.name,
      address: `${event.location.address}, ${event.location.city}`,
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/home-edit`,
  };
}
