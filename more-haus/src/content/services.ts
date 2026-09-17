import type { Service } from "./types";

/**
 * Design services. Add, remove or reorder freely — the page adapts.
 * Deliberately no pricing: enquiries are scoped one at a time.
 */
export const services: Service[] = [
  {
    slug: "full-service-interior-design",
    title: "Full-Service Interior Design",
    summary: "Whole houses, start to finish, over the course of a year or more.",
    description: [
      "The long version. We work from plans or from the house as it stands: layout, finishes, joinery, lighting, every piece of furniture and every object on a shelf.",
      "Sourcing runs the length of the project rather than a single order at the end, which is why these houses do not look furnished in an afternoon.",
    ],
    includes: [
      "Concept and full design direction",
      "Space planning and layout",
      "Finish, tile, paint and joinery selection",
      "Lighting plan and specification",
      "Custom furniture design where needed",
      "Ongoing antique and vintage sourcing",
      "Trade procurement and delivery management",
      "Installation and final styling",
    ],
    bestFor: "Whole homes, renovations and new construction",
    image: {
      src: null,
      alt: "A fully designed living room with layered furniture and art",
      note: "Full-service — finished living room",
      ratio: "portrait",
    },
  },
  {
    slug: "furnishing-and-styling",
    title: "Furnishing + Styling",
    summary: "The house is built. It needs everything that goes in it.",
    description: [
      "For homes that are structurally finished and empty — new builds, rebuilds, or a move into somewhere that came with nothing worth keeping.",
      "We furnish room by room from the collection and from the trade, and install in one go rather than in deliveries spread across a season.",
    ],
    includes: [
      "Room-by-room furniture plan",
      "Sourcing from the MORE HAUS collection and trade partners",
      "Rugs, lighting, window treatments and art",
      "Procurement, receiving and delivery coordination",
      "Full install and styling day",
    ],
    bestFor: "New builds, rebuilds and second homes",
    image: {
      src: null,
      alt: "Newly furnished room mid-install with pieces being placed",
      note: "Furnishing — install day",
      ratio: "landscape",
    },
  },
  {
    slug: "design-consultation",
    title: "Design Consultation",
    summary: "A few hours, in your house, with everything written down after.",
    description: [
      "For people who want to do the work themselves and want to do it right. We walk the house, talk through what is and is not working, and follow up with notes you can act on.",
      "Often this is all a house needs. Sometimes it turns into something longer.",
    ],
    includes: [
      "In-home walkthrough across two to three hours",
      "Layout, color and lighting direction",
      "Written notes and a shopping direction afterward",
      "Sourcing suggestions from the collection",
    ],
    bestFor: "Homeowners doing it themselves",
    image: {
      src: null,
      alt: "Designer's notes, fabric samples and a tape measure on a table",
      note: "Consultation — notes and samples",
      ratio: "square",
    },
  },
  {
    slug: "room-refresh",
    title: "Room Refresh / Styling",
    summary: "One room, reworked with what you have and a few things you do not.",
    description: [
      "A single room taken seriously: what stays, what goes, what needs replacing and what needs nothing but moving four feet to the left.",
      "We bring pieces from the collection, style the room in a day, and leave you with the ones that worked.",
    ],
    includes: [
      "Single-room assessment",
      "Rework of existing furniture and art",
      "Curated additions from the collection",
      "One styling day on site",
    ],
    bestFor: "One room that has never quite worked",
    image: {
      src: null,
      alt: "A styled corner of a room with a chair, lamp and stacked books",
      note: "Refresh — styled corner",
      ratio: "portrait",
    },
  },
];
