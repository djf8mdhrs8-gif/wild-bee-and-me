import { site } from "@/content/site";
import type { HomeEditEvent } from "@/content/types";
import { EVENT_TIME_ZONE } from "./date";

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
