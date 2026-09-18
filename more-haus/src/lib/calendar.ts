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
    // DTSTAMP is when this file was produced, in UTC — not when the event
    // starts. Some clients use it to decide which copy of an event is newer.
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART;TZID=${EVENT_TIME_ZONE}:${toCalendarStamp(event.date, event.startTime)}`,
    `DTEND;TZID=${EVENT_TIME_ZONE}:${toCalendarStamp(event.date, event.endTime)}`,
    `SUMMARY:${escapeICS(`${event.title} by ${site.name}`)}`,
    `DESCRIPTION:${escapeICS(describe(event))}`,
    `LOCATION:${escapeICS(
      `${event.location.name}, ${event.location.address}, ${event.location.city}`,
    )}`,
    `URL:${eventUrl(event)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  // RFC 5545 wants CRLF line endings, and content lines folded at 75 octets.
  return lines.map(foldLine).join("\r\n");
}

/**
 * Escapes the characters that are structural inside an ICS property value.
 *
 * The backslash rule has to run first, or it would re-escape the backslashes
 * the later rules introduce.
 */
function escapeICS(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n?|\n/g, "\\n");
}

/**
 * Folds a content line to 75 octets, as RFC 5545 section 3.1 requires.
 *
 * Google and Apple tolerate over-long lines; stricter parsers — including some
 * Outlook and Exchange paths, which is exactly who downloads this file rather
 * than using the Google link — truncate or reject them. A description of any
 * real length runs well past the limit.
 *
 * The limit counts UTF-8 octets rather than characters, and the split happens
 * between code points, so a multi-byte character is never cut in half.
 * Unfolding is purely textual — a parser strips the CRLF and the following
 * space — so folding inside an escape sequence is safe.
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const parts: string[] = [];
  let current = "";
  let octets = 0;
  // The first line may use all 75; every continuation spends one on the
  // leading space that marks it as a continuation.
  let limit = 75;

  for (const character of line) {
    const size = encoder.encode(character).length;
    if (octets + size > limit) {
      parts.push(current);
      current = "";
      octets = 0;
      limit = 74;
    }
    current += character;
    octets += size;
  }

  if (current) parts.push(current);
  return parts.join("\r\n ");
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
