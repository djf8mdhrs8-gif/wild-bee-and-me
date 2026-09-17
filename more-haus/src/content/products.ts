import type { Product } from "./types";

/**
 * The Collection — one entry per piece.
 *
 * To add a piece: copy a block, change the fields, drop photographs into
 * /public/images/collection/ and point `images[].src` at them.
 * To mark something sold: change `status` to "Sold". Sold pieces stay on the
 * site by design — they show the kind of thing MORE HAUS sources. Shoppers
 * can hide them with the "Hide sold" filter.
 *
 * Copy below is PLACEHOLDER. Replace with real pieces.
 */
export const products: Product[] = [
  {
    slug: "danish-teak-credenza",
    title: "Danish Teak Credenza",
    category: "Storage",
    price: 2400,
    dimensions: '71"W × 18"D × 30"H',
    condition:
      "Very good vintage condition. Refinished top; original brass pulls with expected patina.",
    description:
      "Found in an estate outside Sarasota and carried out in pieces. Long and low enough to sit under a television without announcing it, which is most of the job.",
    materials: "Solid teak, brass hardware",
    provenance: "Danish, c. 1960s",
    images: [
      {
        src: null,
        alt: "Danish teak credenza with brass pulls, photographed against a plaster wall",
        note: "Hero — three-quarter view",
        ratio: "landscape",
      },
      {
        src: null,
        alt: "Detail of the credenza's brass pulls and teak grain",
        note: "Detail — hardware",
        ratio: "square",
      },
      {
        src: null,
        alt: "Credenza styled with ceramics and a table lamp",
        note: "Styled in room",
        ratio: "portrait",
      },
    ],
    status: "Available",
    featured: true,
  },
  {
    slug: "pair-of-cane-armchairs",
    title: "Pair of Cane Armchairs",
    category: "Seating",
    price: 1850,
    dimensions: '26"W × 29"D × 31"H each',
    condition:
      "Good vintage condition. Cane intact throughout; one chair has a small repair to the rear stretcher.",
    description:
      "Bought as a pair and staying that way. Light enough to move around a room all afternoon, which is how you find out where they belong.",
    materials: "Beech frame, hand-woven cane",
    provenance: "French, c. 1940s",
    images: [
      {
        src: null,
        alt: "Pair of vintage cane armchairs side by side",
        note: "Hero — the pair",
        ratio: "landscape",
      },
      {
        src: null,
        alt: "Close view of hand-woven cane seat",
        note: "Detail — cane weave",
        ratio: "square",
      },
    ],
    status: "Available",
    featured: true,
  },
  {
    slug: "travertine-coffee-table",
    title: "Travertine Coffee Table",
    category: "Tables",
    price: 1600,
    dimensions: '48"W × 28"D × 15"H',
    condition:
      "Excellent. Honed surface with natural voids, as travertine should have.",
    description:
      "Heavy in the way that settles a room. The stone has open voids across one corner — the reason it was cheap and the reason we wanted it.",
    materials: "Honed Italian travertine",
    provenance: "Italian, c. 1970s",
    images: [
      {
        src: null,
        alt: "Rectangular honed travertine coffee table",
        note: "Hero — straight on",
        ratio: "landscape",
      },
      {
        src: null,
        alt: "Detail of natural voids in the travertine surface",
        note: "Detail — stone voids",
        ratio: "square",
      },
    ],
    status: "Pending",
    featured: true,
  },
  {
    slug: "spanish-olive-jar",
    title: "Spanish Olive Jar",
    category: "Decor",
    price: 680,
    dimensions: '17"Dia × 24"H',
    condition: "Good antique condition. Glaze crazing and two stable hairlines.",
    description:
      "Genuinely old and looks it. Big enough to hold a branch through winter and be worth looking at empty the rest of the year.",
    materials: "Glazed terracotta",
    provenance: "Andalusian, 19th century",
    images: [
      {
        src: null,
        alt: "Antique glazed terracotta olive jar",
        note: "Hero — jar on a plinth",
        ratio: "portrait",
      },
    ],
    status: "Sold",
    featured: true,
  },
  {
    slug: "brass-column-lamp",
    title: "Brass Column Lamp",
    category: "Lighting",
    price: 540,
    dimensions: '12"Dia × 27"H with shade',
    condition:
      "Very good. Rewired to US standard; unlacquered brass left to patina.",
    description:
      "Unlacquered, so it will keep changing. Sold with a raw linen shade; happy to leave it off if you have your own idea.",
    materials: "Unlacquered brass, linen shade",
    provenance: "English, c. 1950s",
    images: [
      {
        src: null,
        alt: "Brass column table lamp with a linen shade",
        note: "Hero — lamp lit",
        ratio: "portrait",
      },
      {
        src: null,
        alt: "Detail of the unlacquered brass base showing patina",
        note: "Detail — brass patina",
        ratio: "square",
      },
    ],
    status: "Available",
    featured: true,
  },
  {
    slug: "large-abstract-oil",
    title: "Large Abstract Oil, Unsigned",
    category: "Art",
    price: 1200,
    dimensions: '48"W × 60"H framed',
    condition: "Good. Original stretcher; frame added by the studio.",
    description:
      "Unsigned, undated, and better than most things that are neither. Olive and oxblood over a bare ground.",
    materials: "Oil on canvas, oak frame",
    images: [
      {
        src: null,
        alt: "Large unsigned abstract oil painting in olive and oxblood tones",
        note: "Hero — painting flat on wall",
        ratio: "portrait",
      },
    ],
    status: "Available",
    featured: true,
  },
  {
    slug: "oak-farm-table",
    title: "Oak Farm Table",
    category: "Tables",
    price: 3200,
    dimensions: '96"W × 38"D × 30"H',
    condition:
      "Good antique condition. Top scrubbed and waxed; stable throughout.",
    description:
      "Nine feet of it. The top has two centuries of knife marks and we have no intention of sanding them out.",
    materials: "Solid English oak",
    provenance: "English, early 19th century",
    images: [
      {
        src: null,
        alt: "Long antique English oak farm table",
        note: "Hero — table full length",
        ratio: "wide",
      },
      {
        src: null,
        alt: "Detail of the scrubbed oak tabletop showing old knife marks",
        note: "Detail — worn top",
        ratio: "square",
      },
    ],
    status: "Sold",
  },
  {
    slug: "iron-garden-bench",
    title: "Iron Garden Bench",
    category: "Outdoor",
    price: 950,
    dimensions: '60"W × 22"D × 33"H',
    condition: "Good. Honest rust throughout, structurally sound.",
    description:
      "Left exactly as found. Put it somewhere it will keep weathering rather than somewhere it has to stay nice.",
    materials: "Wrought iron",
    provenance: "French, c. 1920s",
    images: [
      {
        src: null,
        alt: "Weathered wrought iron garden bench",
        note: "Hero — bench in garden",
        ratio: "landscape",
      },
    ],
    status: "Available",
  },
  {
    slug: "burl-side-table",
    title: "Burl Side Table",
    category: "Tables",
    price: 780,
    dimensions: '20"Dia × 22"H',
    condition: "Excellent. French polished top.",
    description:
      "Small, dense and figured across the whole top. The kind of thing that makes a plain chair look considered.",
    materials: "Walnut burl veneer",
    provenance: "Continental, c. 1930s",
    images: [
      {
        src: null,
        alt: "Round walnut burl side table",
        note: "Hero — side table",
        ratio: "square",
      },
    ],
    status: "Coming Soon",
  },
  {
    slug: "linen-slipcover-sofa",
    title: "Linen Slipcover Sofa",
    category: "Seating",
    price: 2900,
    dimensions: '84"W × 36"D × 30"H',
    condition:
      "Excellent. Slipcovers washed and ready; frame and cushions as new.",
    description:
      "Deep enough to actually sit back in. Covers come off and go in the machine, which is the only reason a pale sofa is a reasonable idea.",
    materials: "Hardwood frame, Belgian linen slipcovers, down-wrapped cushions",
    images: [
      {
        src: null,
        alt: "Deep sofa in pale washed Belgian linen slipcovers",
        note: "Hero — sofa straight on",
        ratio: "landscape",
      },
      {
        src: null,
        alt: "Detail of washed linen slipcover seam and cushion",
        note: "Detail — linen texture",
        ratio: "square",
      },
    ],
    status: "Available",
  },
  {
    slug: "pine-step-back-cupboard",
    title: "Pine Step-Back Cupboard",
    category: "Storage",
    price: 2100,
    dimensions: '44"W × 19"D × 78"H',
    condition:
      "Good antique condition. Original paint remnants inside; one replaced shelf.",
    description:
      "Tall, plain and useful. Traces of the original blue-green paint survive inside, which is the best part of it and the part nobody sees.",
    materials: "Pine, original iron hinges",
    provenance: "American, c. 1870s",
    images: [
      {
        src: null,
        alt: "Tall antique pine step-back cupboard",
        note: "Hero — cupboard full height",
        ratio: "portrait",
      },
    ],
    status: "Sold",
  },
  {
    slug: "ceramic-table-lamp-pair",
    title: "Pair of Ceramic Table Lamps",
    category: "Lighting",
    price: null,
    dimensions: '14"Dia × 25"H each with shade',
    condition: "Very good. Both rewired; original glaze uncrazed.",
    description:
      "A matched pair in a heavy oatmeal glaze. Price on request — these came in as part of a larger estate and are still being sorted.",
    materials: "Glazed stoneware, paper shades",
    provenance: "American studio pottery, c. 1970s",
    images: [
      {
        src: null,
        alt: "Pair of oatmeal glazed ceramic table lamps",
        note: "Hero — the pair",
        ratio: "landscape",
      },
    ],
    status: "Coming Soon",
  },
];
