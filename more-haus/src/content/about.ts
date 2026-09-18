import type { Media } from "./types";

/**
 * ABOUT — the founder's story.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  EVERYTHING HERE IS PLACEHOLDER.                                         │
 * │  No biographical details have been invented. The paragraphs below are    │
 * │  shaped correctly — right length, right rhythm, right voice — so you     │
 * │  can replace them line for line with the real story.                     │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

export const about = {
  /** PLACEHOLDER — founder's name. */
  founderName: "[ FOUNDER NAME ]",
  /** PLACEHOLDER — founder's role. */
  founderRole: "Founder + Principal Designer",

  /** The line that opens the About page. */
  statement: "Houses should look like they were gathered, not delivered.",

  portrait: {
    src: null,
    alt: "Portrait of the founder of MORE HAUS",
    note: "Portrait — founder, natural light",
    ratio: "portrait",
  } satisfies Media,

  lifestyle: {
    src: null,
    alt: "The founder sourcing furniture at an estate sale",
    note: "Lifestyle — sourcing / behind the scenes",
    ratio: "landscape",
  } satisfies Media,

  /** PLACEHOLDER biography — replace each paragraph. */
  biography: [
    "PLACEHOLDER — replace with the real biography. Two or three sentences on where you came from and how you started buying furniture before you had anywhere to put it.",
    "PLACEHOLDER — replace. A paragraph on the years between then and now: the first house, the first client, the shift from doing this on weekends to doing it properly.",
    "PLACEHOLDER — replace. A short, specific paragraph about how you actually work. One concrete habit is worth more than any adjective.",
  ],

  /** PLACEHOLDER — the philosophy section. Shorter is better here. */
  philosophy: [
    {
      title: "Collected, not decorated",
      body: "A room assembled in one purchase order looks like one purchase order. We buy across months, from different places, and let the mix do the work.",
    },
    {
      title: "Old things first",
      body: "Almost every room here starts with something with age on it. Everything else is chosen to sit beside that.",
    },
    {
      title: "Built to be used",
      body: "Nothing is specified that cannot take a dog, a wet glass, or a child. A house that has to be protected from its occupants is a failed house.",
    },
    {
      title: "A point of view",
      body: "We are not a service that renders your taste back to you. You are hiring a position on how rooms should feel, and we will argue for it politely.",
    },
  ],

  /** Selected imagery for the About page. */
  gallery: [
    {
      src: null,
      alt: "Fabric and paint samples laid out on a work table",
      note: "Samples on the work table",
      ratio: "square",
    },
    {
      src: null,
      alt: "Vintage chairs stacked in the back of a van after a sourcing trip",
      note: "Sourcing trip — the van",
      ratio: "portrait",
    },
    {
      src: null,
      alt: "A finished room photographed from the doorway",
      note: "Finished room from the doorway",
      ratio: "landscape",
    },
  ] satisfies Media[],
};
