/**
 * Single source of truth for business facts, contact details and social links.
 * Update values here and they propagate to every page, schema block and form.
 */

export const site = {
  name: "The Wild Bee & Me",
  legalName: "The Wild Bee & Me",
  altName: "More Chaos Farm",
  owner: "Ashley More",
  tagline: "Live Bee Removals & Local Honey",
  description:
    "Humane live bee removal across Lee, Charlotte and Hendry Counties, plus raw local honey, herbal salves and tallow skin care handmade at More Chaos Farm in Alva, Florida.",

  phone: "239-600-1058",
  phoneHref: "tel:+12396001058",

  /**
   * No public email address is published yet — the business lists only a phone
   * number. Set this once a real inbox exists and it will appear in the footer,
   * on the contact page, on the order confirmation and in the LocalBusiness
   * schema automatically. Leave it empty and those all fall back to the phone.
   *
   * NOTE: this is separate from NOTIFY_TO_EMAIL, which is where form
   * submissions get delivered internally.
   */
  email: "",

  address: {
    locality: "Alva",
    region: "FL",
    regionName: "Florida",
    postalCode: "33920",
    country: "US",
  },

  /** Approximate centre of Alva, FL — used for LocalBusiness geo data. */
  geo: { latitude: 26.7156, longitude: -81.6117 },

  /** Placeholder social handles — swap the URLs when the real accounts are live. */
  social: {
    instagram: {
      label: "Instagram",
      handle: "@thewildbeeandme",
      url: "https://www.instagram.com/thewildbeeandme",
    },
    facebook: {
      label: "Facebook",
      handle: "The Wild Bee & Me",
      url: "https://www.facebook.com/thewildbeeandme",
    },
  },

  hours: "Open 7 days a week, 8am – 7pm",
  serviceCounties: ["Lee County", "Charlotte County", "Hendry County"],
} as const;

/**
 * Canonical origin used for metadata, sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the real domain is attached.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thewildbeeandme.com"
).replace(/\/$/, "");

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const nav = [
  { href: "/bee-removal", label: "Bee Removal" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
