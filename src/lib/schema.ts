import { absoluteUrl, site, siteUrl } from "@/lib/site";
import { faqs, serviceArea, testimonials } from "@/lib/content";
import type { Product } from "@/lib/products";

/**
 * JSON-LD builders. Rendered via <script type="application/ld+json"> so Google
 * can surface the local business, the shop items and the FAQ answers.
 */

const areaServed = serviceArea.map((area) => ({
  "@type": "AdministrativeArea",
  name: `${area.county}, Florida`,
}));

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: site.name,
  alternateName: site.altName,
  description: site.description,
  url: siteUrl,
  telephone: site.phone,
  ...(site.email ? { email: site.email } : {}),
  priceRange: "$$",
  image: absoluteUrl("/opengraph-image"),
  logo: absoluteUrl("/icon.svg"),
  founder: { "@type": "Person", name: site.owner },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  areaServed,
  sameAs: [site.social.instagram.url, site.social.facebook.url],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "19:00",
    },
  ],
  knowsAbout: [
    "Live bee removal",
    "Honey bee colony relocation",
    "Beekeeping",
    "Raw honey",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: String(testimonials.length),
  },
  review: testimonials.map((testimonial) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: testimonial.name },
    reviewBody: testimonial.quote,
  })),
};

export const beeRemovalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/bee-removal#service`,
  name: "Live Bee Removal",
  serviceType: "Humane honey bee removal and relocation",
  description:
    "Humane live honey bee removal and colony relocation from homes, walls, attics, trees, structures and vehicles across Lee, Charlotte and Hendry Counties, Florida. Bees are relocated, never exterminated.",
  provider: { "@id": `${siteUrl}/#business` },
  areaServed,
  url: absoluteUrl("/bee-removal"),
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: { "@type": "ContactPoint", telephone: site.phone },
    serviceUrl: absoluteUrl("/bee-removal#request"),
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
  })),
};

export const productSchema = (product: Product) => {
  const prices = product.variants.map((variant) => variant.price / 100);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: product.category,
    url: absoluteUrl(`/shop/${product.slug}`),
    image: [absoluteUrl(`/shop/${product.slug}/opengraph-image`)],
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": `${siteUrl}/#business` },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...prices).toFixed(2),
      highPrice: Math.max(...prices).toFixed(2),
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${siteUrl}/#business` },
    },
  };
};

export const breadcrumbSchema = (
  trail: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});
