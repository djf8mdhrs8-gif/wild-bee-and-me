/**
 * MORE HAUS — content models
 *
 * Everything the site displays comes from these shapes. Editing the files in
 * `src/content/` is the only thing required to change what appears on the
 * site; no layout or component file needs to be touched.
 *
 * Images are referenced as paths under `/public`, e.g. "/images/projects/
 * sanibel-01.jpg". Leave an image `null` (or omit it) and the site renders a
 * composed placeholder in the brand palette, captioned with the photograph
 * that belongs there.
 */

/** A photograph slot. `src: null` renders a labelled placeholder instead. */
export type Media = {
  /** Path under /public, e.g. "/images/projects/sanibel-01.jpg". Null = placeholder. */
  src: string | null;
  /** Always write real alt text — it is read aloud and indexed. */
  alt: string;
  /** Shown inside the placeholder so you know which photo belongs here. */
  note?: string;
  /** Intrinsic ratio hint used for layout before the image loads. */
  ratio?: "portrait" | "landscape" | "square" | "wide";
};

/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/* -------------------------------------------------------------------------- */

export type Project = {
  /** URL segment: /projects/<slug>. Lowercase, hyphenated, never changed once live. */
  slug: string;
  title: string;
  location: string;
  /** Optional descriptor, e.g. "Full-Service Interior Design". */
  type?: string;
  year: string;
  /** One or two sentences — used on the index and in search results. */
  summary: string;
  /** The project story. Each string is one paragraph. */
  description: string[];
  cover: Media;
  /** Ordered gallery. The case study composes these into an editorial run. */
  gallery: Media[];
  /** Pull quote or detail note dropped midway through the case study. */
  pullQuote?: string;
  /** Show on the homepage. Order follows this file's order. */
  featured?: boolean;
};

/* -------------------------------------------------------------------------- */
/*  Collection (furniture + objects)                                           */
/* -------------------------------------------------------------------------- */

export const PRODUCT_CATEGORIES = [
  "Seating",
  "Tables",
  "Storage",
  "Lighting",
  "Decor",
  "Art",
  "Outdoor",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/**
 * Sold pieces stay on the site on purpose — they show what MORE HAUS sources.
 * Shoppers can hide them with the "Hide sold" filter.
 */
export type ProductStatus = "Available" | "Pending" | "Sold" | "Coming Soon";

export type Product = {
  /** URL segment: /collection/<slug>. */
  slug: string;
  title: string;
  category: ProductCategory;
  /** Whole dollars. Use `null` for "price on request". */
  price: number | null;
  /** Free text, e.g. "72\"W x 34\"D x 29\"H". */
  dimensions: string;
  /** e.g. "Very good vintage condition. Light patina to the arms." */
  condition: string;
  /** Short paragraph in the MORE HAUS voice. */
  description: string;
  /** e.g. "Solid white oak, original linen upholstery". */
  materials?: string;
  /** Era or provenance, e.g. "Danish, c. 1960s". */
  provenance?: string;
  images: Media[];
  status: ProductStatus;
  /** Surfaces the piece on the homepage collection rail. */
  featured?: boolean;
  /** Overrides the studio-wide pickup note for this piece. */
  pickup?: string;
  /** Overrides the studio-wide delivery note for this piece. */
  delivery?: string;
};

/* -------------------------------------------------------------------------- */
/*  The Home Edit                                                              */
/* -------------------------------------------------------------------------- */

export type HomeEditStatus = "scheduled" | "cancelled" | "past";

export type HomeEditEvent = {
  /** URL-safe id, e.g. "2026-10-17". Used for the calendar download. */
  id: string;
  /** ISO date, YYYY-MM-DD, in Eastern Time. This drives "the next edit". */
  date: string;
  /** 24-hour local times, HH:MM. */
  startTime: string;
  endTime: string;
  /** Usually "The Home Edit"; name the seasonal ones, e.g. "The Holiday Edit". */
  title: string;
  location: {
    name: string;
    address: string;
    city: string;
    /** Anything Google Maps will resolve; used for the directions link. */
    mapQuery: string;
  };
  /** A sentence or two on what will be on the floor. */
  description: string;
  image?: Media;
  status: HomeEditStatus;
};

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  title: string;
  /** Short line under the title. */
  summary: string;
  description: string[];
  /** What the engagement includes. */
  includes: string[];
  /** e.g. "Full homes and new construction". */
  bestFor: string;
  image: Media;
};
