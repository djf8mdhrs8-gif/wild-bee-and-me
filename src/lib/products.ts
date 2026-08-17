/**
 * Product catalogue.
 *
 * Prices are stored in cents to keep cart maths exact.
 *
 * To use real photography: drop files into /public/images/products/ and set
 * `image` on the variant or product (e.g. image: "/images/products/honey-8oz.jpg").
 * Anything without an `image` renders the on-brand illustrated placeholder.
 */

export type ProductVariant = {
  id: string;
  name: string;
  /** Price in US cents. */
  price: number;
  /** Short descriptor shown next to the variant name. */
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
  ingredients: string[];
  /** Illustration theme for the placeholder artwork. */
  art: "honey" | "salve" | "balm";
  image?: string;
  gallery?: string[];
  variants: ProductVariant[];
  shipping: string;
  seoKeywords: string[];
};

export const products: Product[] = [
  {
    slug: "raw-local-honey",
    name: "Raw Local Honey",
    category: "Honey",
    tagline: "Pure, unfiltered, straight from our hives",
    summary:
      "Raw local honey from More Chaos Farm in Alva, Florida — never heated, never filtered, never blended. Bottled by hand from the hives our rescued colonies call home.",
    body: [
      "Our honey comes out of the hive and goes into the jar. That is the whole process. We do not heat it, we do not micro-filter it, and we never cut it with corn syrup or imported honey. What settles at the bottom of your jar is pollen and a little beeswax, exactly the way the bees made it.",
      "Because it is genuinely local, the flavour shifts through the season. Spring frames off the saw palmetto and citrus bloom run light and floral. Late-summer honey pulls darker and richer from Brazilian pepper and wildflower. We bottle each pull as it comes, so no two batches taste identical — that is the point.",
      "Many of these frames come from colonies we rescued out of a wall, a soffit or a fallen oak somewhere in Lee, Charlotte or Hendry County. Buying a jar keeps those relocated bees fed, housed and working.",
    ],
    highlights: [
      "Raw and unfiltered — nothing added, nothing removed",
      "Harvested from our own hives in Alva, FL",
      "Seasonal wildflower character, bottled by the batch",
      "Crystallises naturally — a sign it is the real thing",
    ],
    ingredients: ["100% raw Southwest Florida honey"],
    art: "honey",
    variants: [
      { id: "honey-8oz", name: "8 oz jar", price: 1200, detail: "Our classic size", inStock: true },
      { id: "honey-16oz", name: "16 oz jar", price: 2000, detail: "Best value", inStock: true },
      { id: "honey-32oz", name: "32 oz jar", price: 3600, detail: "For the honey-in-everything household", inStock: true },
    ],
    shipping:
      "Ships in protective packaging anywhere in the continental US. Local pickup in Alva is always free — just mention it in your order notes.",
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
    tagline: "Beeswax and local herbs, hand-poured in small batches",
    summary:
      "Hand-poured herbal salves built on our own beeswax and slow-infused local herbs. No fillers, no fragrance oils, no petroleum — just a tin that actually works.",
    body: [
      "Every salve starts with beeswax rendered from our own hives. We infuse herbs into carrier oil low and slow for weeks — not an afternoon — then blend, pour and cap each tin by hand at the farm.",
      "There is no petroleum jelly in here, and no synthetic fragrance. The scent you get is the herbs and the wax. That means the colour and aroma vary a little between batches, which is what happens when the ingredients are grown rather than ordered from a catalogue.",
      "Salves are the product people come back for. Gardeners, anglers, anyone who works outdoors in Florida — they run out and they reorder.",
    ],
    highlights: [
      "Beeswax from our own rescued colonies",
      "Herbs infused for weeks, not hours",
      "No petroleum, no synthetic fragrance, no fillers",
      "Poured and labelled by hand in Alva, FL",
    ],
    ingredients: [
      "Olive oil infused with herbs",
      "More Chaos Farm beeswax",
      "Shea butter",
      "Vitamin E",
      "Pure essential oils",
    ],
    art: "salve",
    variants: [
      { id: "salve-lavender-calm", name: "Lavender Calm", price: 1800, detail: "2 oz tin — soothing, for end of day", inStock: true },
      { id: "salve-garden-hands", name: "Garden Hands", price: 1800, detail: "2 oz tin — for cracked, hard-working hands", inStock: true },
      { id: "salve-bee-balm", name: "Bee Balm Rescue", price: 1800, detail: "2 oz tin — bites, scrapes and sun", inStock: true },
    ],
    shipping:
      "Ships nationwide. In Florida summer heat we pack salves with an insulating sleeve so they arrive solid.",
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
    tagline: "Grass-fed tallow and raw honey — a moisturiser with a short ingredient list",
    summary:
      "Grass-fed tallow whipped with our raw honey into a rich face balm. Five ingredients, no water, no emulsifiers, nothing you cannot pronounce.",
    body: [
      "Tallow works on skin because it is structurally close to what skin already makes. We render grass-fed tallow ourselves, whip it with a little of our raw honey and a touch of our beeswax, and that is the formula.",
      "There is no water in this balm, which means there is no need for the emulsifiers and preservatives a water-based lotion requires. A small amount goes a long way — warm a pea-sized scoop between your fingers and press it in.",
      "It absorbs cleaner than people expect. If you have written off oils because they sat on your skin, this is worth one honest week.",
    ],
    highlights: [
      "Grass-fed tallow, rendered in-house",
      "Sweetened and softened with our own raw honey",
      "Water-free, so no preservatives needed",
      "Five ingredients, all of them readable",
    ],
    ingredients: [
      "Grass-fed beef tallow",
      "More Chaos Farm raw honey",
      "More Chaos Farm beeswax",
      "Jojoba oil",
      "Vitamin E",
    ],
    art: "balm",
    variants: [
      { id: "tallow-face-balm", name: "Face Balm", price: 2500, detail: "2 oz — our signature moisturiser", inStock: true },
      { id: "tallow-body-butter", name: "Whipped Body Butter", price: 3200, detail: "4 oz — for elbows, heels and shins", inStock: true },
      { id: "tallow-baby-balm", name: "Gentle Baby Balm", price: 2200, detail: "2 oz — unscented, extra mild", inStock: true },
    ],
    shipping:
      "Ships nationwide with heat-protective packaging. Tallow softens above 90°F but re-sets without losing quality.",
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

/** Free shipping threshold, in cents. */
export const FREE_SHIPPING_THRESHOLD = 6000;
/** Flat shipping rate applied below the threshold, in cents. */
export const FLAT_SHIPPING_RATE = 795;
/** Lee County, FL sales tax rate applied at checkout. */
export const TAX_RATE = 0.065;
