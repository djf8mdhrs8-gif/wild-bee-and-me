/**
 * Product catalogue.
 *
 * Prices are in US cents to keep cart maths exact.
 *
 * Every product, option and price here matches what the business actually
 * sells today. Do not add sizes or scents speculatively — an option listed
 * here is one a customer can order.
 *
 * To use real photography: drop files into /public/images/products/ and set
 * `image` on the product or option (e.g. image: "/images/products/honey-8oz.jpg").
 * Anything without an `image` renders the on-brand illustrated placeholder.
 */

export type ProductVariant = {
  id: string;
  name: string;
  /** Price in US cents. */
  price: number;
  /** Short descriptor shown next to the option name. */
  detail?: string;
  image?: string;
  inStock: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: "Honey" | "Salves" | "Skin Care";
  tagline: string;
  /** One-paragraph summary used on cards and meta descriptions. */
  summary: string;
  /** Long-form copy for the product page, one paragraph per entry. */
  body: string[];
  highlights: string[];
  /** Illustration theme for the placeholder artwork. */
  art: "honey" | "salve" | "balm";
  image?: string;
  gallery?: string[];
  variants: ProductVariant[];
  seoKeywords: string[];
};

export const products: Product[] = [
  {
    slug: "raw-local-honey",
    name: "Raw Local Honey",
    category: "Honey",
    tagline: "Pure, unfiltered — straight from our hives",
    summary:
      "Raw local honey from More Chaos Farm in Alva, Florida. Never heated above 95°F and only lightly strained, so the pollen, enzymes and nutrients stay exactly where the bees left them.",
    body: [
      "Our honey comes out of the hive and goes into the jar. It is never heated above 95°F, and it is only lightly strained to take out wax particles — nothing else is done to it.",
      "That matters because heat and fine filtering are what strip honey of its natural enzymes and nutrients. Skipping both is why ours tastes like the season it came from, and why it will crystallise over time. Crystallisation is a sign of genuinely raw honey, not a fault; stand the jar in warm water and it loosens straight back up.",
      "Much of it comes from colonies we rescued and rehomed at the farm. Buying a jar keeps those bees fed, housed and working.",
    ],
    highlights: [
      "Never heated above 95°F",
      "Lightly strained only — enzymes and nutrients intact",
      "From our own hives in Alva, FL",
      "Crystallises naturally, the way raw honey should",
    ],
    art: "honey",
    variants: [
      { id: "honey-8oz", name: "8 oz jar", price: 1200, inStock: true },
    ],
    seoKeywords: [
      "raw honey Alva FL",
      "raw local honey Florida",
      "local honey Fort Myers",
      "unfiltered honey Southwest Florida",
    ],
  },
  {
    slug: "herbal-salves",
    name: "Herbal Salves",
    category: "Salves",
    tagline: "Beeswax & local herbs, hand-poured with care",
    summary:
      "Hand-poured salves made with beeswax from our own hives and local herbs. No synthetic additives, no fillers — just a tin that does its job.",
    body: [
      "Every salve starts with beeswax rendered from our own hives and herbs from the farm or trusted local sources. Each tin is blended, poured and capped by hand in Alva.",
      "There are no synthetic additives and no fillers. Because the ingredients are grown rather than ordered from a catalogue, colour and scent shift a little between batches — that is what a small batch looks like.",
      "The full ingredient list is printed on every tin. If something is not on the label, it is not in there.",
    ],
    highlights: [
      "Beeswax from our own rescued colonies",
      "Local herbs, hand-poured in small batches",
      "No synthetic additives, no fillers",
      "Made by hand in Alva, FL",
    ],
    art: "salve",
    variants: [
      { id: "salve-lavender-calm", name: "Lavender Calm", price: 1800, inStock: true },
    ],
    seoKeywords: [
      "herbal salves Florida",
      "beeswax salve Alva FL",
      "handmade herbal salve Southwest Florida",
    ],
  },
  {
    slug: "tallow-skin-care",
    name: "Tallow Skin Care",
    category: "Skin Care",
    tagline: "Grass-fed tallow & honey — nature's best moisturiser",
    summary:
      "Grass-fed tallow blended with our own raw honey into a rich, simple balm. Made on the farm from ingredients you can name.",
    body: [
      "Tallow works on skin because it is structurally close to what skin already makes. We blend grass-fed tallow with our own raw honey and beeswax, and that is essentially the formula.",
      "There are no synthetic additives and no fillers. A small amount goes a long way — warm a little between your fingers and press it in rather than rubbing it around.",
      "It absorbs cleaner than most people expect. If you have written off balms because they sat on top of your skin, this one is worth an honest week. Full ingredients are printed on the label.",
    ],
    highlights: [
      "Grass-fed tallow blended with our own raw honey",
      "Beeswax from our own hives",
      "No synthetic additives, no fillers",
      "Made by hand in Alva, FL",
    ],
    art: "balm",
    variants: [
      { id: "tallow-face-balm", name: "Face Balm", price: 2500, inStock: true },
    ],
    seoKeywords: [
      "tallow skincare natural",
      "tallow face balm Florida",
      "grass fed tallow moisturizer",
    ],
  },
];

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug);

export const allVariants = products.flatMap((product) =>
  product.variants.map((variant) => ({ product, variant })),
);

export const findVariant = (variantId: string) =>
  allVariants.find(({ variant }) => variant.id === variantId);

/**
 * Fulfilment.
 *
 * The farm does not ship yet: orders are collected in Alva or delivered
 * locally. Both are arranged directly with Ashley when she confirms the
 * order, so no carrier rate or sales tax is calculated here — the cart total
 * is simply what the goods cost.
 */
export const LOCAL_DELIVERY_RADIUS_MILES = 30;
