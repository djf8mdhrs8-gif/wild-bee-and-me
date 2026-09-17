/**
 * MORE HAUS — studio details and navigation.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  REPLACE BEFORE LAUNCH                                                   │
 * │  Every value marked PLACEHOLDER below is a stand-in. Swap in the real    │
 * │  address, phone, email and social handles here and they update           │
 * │  everywhere on the site — header, footer, contact page, schema markup.   │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

export const site = {
  name: "MORE HAUS",
  /** Used in the <title> template and OpenGraph cards. */
  tagline: "Interiors, objects, and pieces worth keeping.",
  description:
    "MORE HAUS is an interior design studio and curated collection of furniture and objects in Southwest Florida, home of the monthly Home Edit.",

  /** PLACEHOLDER — set to the live domain before launch. */
  url: "https://morehaus.com",

  serviceArea: "Southwest Florida",
  /** Shown in the footer and on the contact page. */
  locationLine: "Fort Myers, Florida — serving Southwest Florida and beyond",

  /** PLACEHOLDER — real studio contact details. */
  email: "studio@morehaus.com",
  /** Leave empty to hide the phone number everywhere it appears. */
  phone: "" as string,

  social: [
    /** PLACEHOLDER — real handles. Remove any row you do not use. */
    { label: "Instagram", href: "https://instagram.com/morehaus" },
    { label: "Pinterest", href: "https://pinterest.com/morehaus" },
  ],

  /** Studio-wide defaults. A piece can override these in products.ts. */
  fulfilment: {
    pickup:
      "Local pickup from the Fort Myers studio by appointment, typically within a week of purchase.",
    delivery:
      "White-glove delivery available throughout Southwest Florida. Shipping quoted by piece for anything further.",
  },
} as const;

/** Primary navigation. Order here is the order everywhere. */
export const navigation = [
  { label: "Projects", href: "/projects" },
  { label: "Design Services", href: "/design-services" },
  { label: "The Collection", href: "/collection" },
  { label: "Home Edit", href: "/home-edit" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Routes whose hero is a full-bleed dark image — the header sits over them in
 * ivory until the page scrolls.
 */
export const overlayHeroRoutes = ["/", "/home-edit", "/about"];
