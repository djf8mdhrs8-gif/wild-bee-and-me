import type { HomeEditEvent } from "@/content/types";
import { EVENT_TIME_ZONE } from "./date";
import { site } from "@/content/site";

/** "2026-10-17" + "10:00" -> "20261017T100000" */
function toCalendarStamp(date: string, time: string): string {
  return `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
}

function eventUrl(event: HomeEditEvent): string {
  return `${site.url}/home-edit#${event.id}`;
}

function describe(event: HomeEditEvent): string {
  return `${event.description}\n\n${eventUrl(event)}`;
}

/**
 * An .ics file for the event. TZID keeps the time correct for anyone adding it
 * from outside Eastern, which happens more than you would think with seasonal
 * residents.
 */
export function buildICS(event: HomeEditEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MORE HAUS//The Home Edit//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@morehaus`,
    `DTSTAMP:${toCalendarStamp(event.date, event.startTime)}Z`,
    `DTSTART;TZID=${EVENT_TIME_ZONE}:${toCalendarStamp(event.date, event.startTime)}`,
    `DTEND;TZID=${EVENT_TIME_ZONE}:${toCalendarStamp(event.date, event.endTime)}`,
    `SUMMARY:${escapeICS(`${event.title} by ${site.name}`)}`,
    `DESCRIPTION:${escapeICS(describe(event))}`,
    `LOCATION:${escapeICS(`${event.location.name}, ${event.location.address}, ${event.location.city}`)}`,
    `URL:${eventUrl(event)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  // RFC 5545 wants CRLF line endings.
  return lines.join("\r\n");
}

/** Commas, semicolons and newlines are structural in ICS and must be escaped. */
function escapeICS(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** One-click "add to Google Calendar". */
export function googleCalendarUrl(event: HomeEditEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} by ${site.name}`,
    dates: `${toCalendarStamp(event.date, event.startTime)}/${toCalendarStamp(event.date, event.endTime)}`,
    ctz: EVENT_TIME_ZONE,
    details: describe(event),
    location: `${event.location.name}, ${event.location.address}, ${event.location.city}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Directions link that works on desktop and both mobile platforms. */
export function directionsUrl(event: HomeEditEvent): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.location.mapQuery,
  )}`;
}
