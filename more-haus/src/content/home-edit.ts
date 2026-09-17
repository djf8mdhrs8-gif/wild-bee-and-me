import type { HomeEditEvent } from "./types";

/**
 * THE HOME EDIT — the monthly in-person shopping day.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  THIS IS THE ONLY FILE YOU EDIT TO CHANGE DATES.                         │
 * │                                                                          │
 * │  The site works out which edit is "next" from today's date, so you can   │
 * │  add a year of dates at once and never touch it again. Past dates move   │
 * │  themselves into "Past Edits" automatically — nothing to delete.         │
 * │                                                                          │
 * │  To add an edit: copy a block, change `id`, `date` and `title`.          │
 * │  `date` is YYYY-MM-DD. Times are 24-hour, so 3 PM is "15:00".            │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

/** The studio address shared by most edits. Override per-event if one moves. */
const studio = {
  name: "MORE HAUS Studio",
  /** PLACEHOLDER — real street address. */
  address: "1234 Example Street",
  city: "Fort Myers, Florida",
  mapQuery: "1234 Example Street, Fort Myers, FL",
};

export const homeEditEvents: HomeEditEvent[] = [
  {
    id: "2026-10-17",
    date: "2026-10-17",
    startTime: "10:00",
    endTime: "15:00",
    title: "The Home Edit",
    location: studio,
    description:
      "A full floor of furniture, vintage lighting, art and the last of the summer sourcing trip. First come, first served — pieces go home the same day.",
    image: {
      src: null,
      alt: "The studio floor set for The Home Edit, furniture arranged for browsing",
      note: "Hero — studio floor set for the edit",
      ratio: "landscape",
    },
    status: "scheduled",
  },
  {
    id: "2026-11-14",
    date: "2026-11-14",
    startTime: "10:00",
    endTime: "15:00",
    title: "The Home Edit",
    location: studio,
    description:
      "November's floor leans toward the table: linens, glass, serving pieces and a run of chairs found this autumn.",
    status: "scheduled",
  },
  {
    id: "2026-12-12",
    date: "2026-12-12",
    startTime: "10:00",
    endTime: "16:00",
    title: "The Holiday Edit",
    location: studio,
    description:
      "One hour longer, and the only edit of the year with small things worth wrapping. Greenery, candles, and everything under two hundred dollars up front.",
    status: "scheduled",
  },
  {
    id: "2027-01-16",
    date: "2027-01-16",
    startTime: "10:00",
    endTime: "15:00",
    title: "The Home Edit",
    location: studio,
    description:
      "The year opens with whatever did not sell in December and everything found over the holidays.",
    status: "scheduled",
  },

  /* ---- Past edits. Leave them here; they fill the archive. ---- */
  {
    id: "2026-08-15",
    date: "2026-08-15",
    startTime: "10:00",
    endTime: "15:00",
    title: "The Home Edit",
    location: studio,
    description: "August — a long run of seating and three good rugs.",
    image: {
      src: null,
      alt: "Shoppers browsing furniture at the August Home Edit",
      note: "Archive — August edit",
      ratio: "landscape",
    },
    status: "scheduled",
  },
  {
    id: "2026-07-18",
    date: "2026-07-18",
    startTime: "10:00",
    endTime: "15:00",
    title: "The Home Edit",
    location: studio,
    description: "July — the estate sale month. Almost all of it went.",
    image: {
      src: null,
      alt: "Vintage furniture arranged on the studio floor at the July Home Edit",
      note: "Archive — July edit",
      ratio: "portrait",
    },
    status: "scheduled",
  },
  {
    id: "2026-06-20",
    date: "2026-06-20",
    startTime: "10:00",
    endTime: "15:00",
    title: "The Home Edit",
    location: studio,
    description: "June — lighting, art, and the first of the summer sourcing.",
    image: {
      src: null,
      alt: "Vintage lighting displayed at the June Home Edit",
      note: "Archive — June edit",
      ratio: "landscape",
    },
    status: "scheduled",
  },
];

/** What to expect — shown on the Home Edit page. */
export const homeEditExpectations = [
  {
    title: "Furniture, first",
    body: "Case pieces, seating and tables sourced over the previous month. The largest things sell first and they sell early.",
  },
  {
    title: "Vintage and antique",
    body: "Lighting, mirrors, ceramics, textiles and art — most of it one of a kind, none of it reproduction.",
  },
  {
    title: "Newly sourced finds",
    body: "Whatever came back on the truck that week, priced and on the floor rather than held back.",
  },
  {
    title: "How it works",
    body: "Cash or card, first come first served. We hold pieces until close and help you load. Delivery can be arranged for anything that will not fit in the car.",
  },
];
