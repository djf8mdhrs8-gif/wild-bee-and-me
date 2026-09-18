import type { Project } from "./types";

/**
 * Projects — add a new one by copying a block and changing the fields.
 * `featured: true` places it on the homepage, in the order listed here.
 *
 * Copy below is PLACEHOLDER written in the MORE HAUS voice. Replace the
 * narrative with the real story of each home; leave the structure alone.
 */
export const projects: Project[] = [
  {
    slug: "mcgregor-residence",
    title: "McGregor Residence",
    location: "Fort Myers, Florida",
    type: "Full-Service Interior Design",
    year: "2025",
    summary:
      "A 1940s house off McGregor, opened up but kept intact — plaster left imperfect, floors left dark.",
    description: [
      "PLACEHOLDER — replace with the real project story. The family had lived here eleven years before they called, which is the best possible brief: they knew exactly which rooms they used and which ones they walked past.",
      "We took down two walls and almost nothing else. The plaster stayed. The original heart pine floors stayed, dark and slightly uneven. What changed was everything you sit on, and the way light moves from the front room to the back.",
      "Most of the furniture came from sourcing trips over fourteen months. Nothing in the house was bought as a set.",
    ],
    cover: {
      src: null,
      alt: "Living room of the McGregor Residence with dark heart pine floors and a low linen sofa",
      note: "Hero — wide living room, late afternoon light",
      ratio: "landscape",
    },
    gallery: [
      {
        src: null,
        alt: "Entry hall with a vintage console and a collected arrangement of objects",
        note: "Entry hall, full bleed",
        ratio: "wide",
      },
      {
        src: null,
        alt: "Detail of plaster wall meeting original timber trim",
        note: "Detail — plaster and trim",
        ratio: "portrait",
      },
      {
        src: null,
        alt: "Dining room with an oak table and mismatched chairs",
        note: "Dining room, wide",
        ratio: "landscape",
      },
      {
        src: null,
        alt: "Reading corner with a floor lamp and stacked books",
        note: "Reading corner, portrait",
        ratio: "portrait",
      },
      {
        src: null,
        alt: "Kitchen shelving holding ceramics and glassware",
        note: "Kitchen shelf detail",
        ratio: "square",
      },
      {
        src: null,
        alt: "Bedroom with linen bedding and an antique chest",
        note: "Primary bedroom, landscape",
        ratio: "landscape",
      },
    ],
    pullQuote:
      "The house already had a point of view. Our job was mostly to stop arguing with it.",
    featured: true,
  },
  {
    slug: "gulf-shore-cottage",
    title: "Gulf Shore Cottage",
    location: "Sanibel, Florida",
    type: "Furnishing + Styling",
    year: "2025",
    summary:
      "Six weeks, one truck, and a small cottage furnished entirely from the collection.",
    description: [
      "PLACEHOLDER — replace with the real project story. A rebuild after the storm, finished in drywall and waiting. The owners wanted it done before season and did not want it to look done.",
      "Everything here was sourced rather than ordered: a Danish teak credenza, a pair of cane chairs found in Naples, a table that took three months to turn up.",
    ],
    cover: {
      src: null,
      alt: "Cottage living room with cane chairs and a teak credenza",
      note: "Hero — cottage living room",
      ratio: "portrait",
    },
    gallery: [
      {
        src: null,
        alt: "Cane armchair against a pale plaster wall",
        note: "Cane chair vignette",
        ratio: "portrait",
      },
      {
        src: null,
        alt: "Open kitchen and dining area with a long oak table",
        note: "Kitchen and dining, wide",
        ratio: "wide",
      },
      {
        src: null,
        alt: "Guest bedroom with a woven headboard",
        note: "Guest bedroom",
        ratio: "landscape",
      },
      {
        src: null,
        alt: "Detail of ceramics on a teak credenza",
        note: "Credenza detail",
        ratio: "square",
      },
    ],
    pullQuote: "Nothing in the house was bought the same week.",
    featured: true,
  },
  {
    slug: "old-naples-pied-a-terre",
    title: "Old Naples Pied-à-Terre",
    location: "Naples, Florida",
    type: "Full-Service Interior Design",
    year: "2024",
    summary:
      "Two bedrooms, one long view, and a client who wanted fewer things than she started with.",
    description: [
      "PLACEHOLDER — replace with the real project story. The apartment came furnished, which usually means it came furnished badly. We emptied it and started again with about a third as many pieces.",
      "The palette follows the water outside: olive, oyster, a single terracotta. The art is all hers, hung lower than most people would dare.",
    ],
    cover: {
      src: null,
      alt: "Pared-back living room with a long view to the water",
      note: "Hero — living room toward the water",
      ratio: "landscape",
    },
    gallery: [
      {
        src: null,
        alt: "Low sofa and travertine table against an olive wall",
        note: "Seating vignette",
        ratio: "landscape",
      },
      {
        src: null,
        alt: "Hallway with art hung low along a plaster wall",
        note: "Hallway, portrait",
        ratio: "portrait",
      },
      {
        src: null,
        alt: "Bedroom with sheer linen curtains",
        note: "Bedroom, wide",
        ratio: "wide",
      },
    ],
    featured: true,
  },
  {
    slug: "river-district-loft",
    title: "River District Loft",
    location: "Fort Myers, Florida",
    type: "Room Refresh",
    year: "2024",
    summary:
      "One room, four weeks, and a rug that decided the rest of it.",
    description: [
      "PLACEHOLDER — replace with the real project story. A single-room engagement that stayed a single room, which is rarer than it sounds.",
    ],
    cover: {
      src: null,
      alt: "Loft living room with exposed brick and a vintage rug",
      note: "Hero — loft living room",
      ratio: "portrait",
    },
    gallery: [
      {
        src: null,
        alt: "Vintage rug detail against timber floorboards",
        note: "Rug detail",
        ratio: "square",
      },
      {
        src: null,
        alt: "Window seat with cushions and a reading lamp",
        note: "Window seat",
        ratio: "portrait",
      },
    ],
    featured: true,
  },
  {
    slug: "estero-family-house",
    title: "Estero Family House",
    location: "Estero, Florida",
    type: "Full-Service Interior Design",
    year: "2023",
    summary:
      "A new-build given twenty years of history it did not have.",
    description: [
      "PLACEHOLDER — replace with the real project story. New construction is the hardest brief: nothing has any age in it yet. We spent the budget on old things.",
    ],
    cover: {
      src: null,
      alt: "New-build family room furnished with antique and vintage pieces",
      note: "Hero — family room",
      ratio: "landscape",
    },
    gallery: [
      {
        src: null,
        alt: "Antique armoire in a newly built hallway",
        note: "Armoire in hallway",
        ratio: "portrait",
      },
      {
        src: null,
        alt: "Family room seating arrangement around a low table",
        note: "Seating, wide",
        ratio: "wide",
      },
      {
        src: null,
        alt: "Detail of worn leather and new joinery side by side",
        note: "Old and new detail",
        ratio: "square",
      },
    ],
    featured: true,
  },
];
