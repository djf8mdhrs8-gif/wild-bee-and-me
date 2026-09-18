import { ImageResponse } from "next/og";

import { OG_SANS, OG_SERIF, ogFonts } from "@/lib/og-fonts";
import { site } from "@/content/site";
import { getProduct, getProducts } from "@/lib/content";
import { formatPrice } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "A piece from the MORE HAUS collection";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

/**
 * The share card for a single piece.
 *
 * Most people who share a piece do it straight from a phone into Instagram or
 * Facebook, and a link with no image is a link nobody taps. This is typeset
 * rather than photographic so it works before real photography exists, and it
 * carries the three things somebody needs to decide whether to look: what it
 * is, what it costs, and whether it is still available.
 */
export default async function ProductOgImage({
  params,
}: {
  // Next 16 hands these to image routes as a promise.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  const title = product?.title ?? site.name;
  const price = product ? formatPrice(product.price) : "";
  const status = product?.status ?? "";
  const category = product?.category ?? "The Collection";

  // Long names need to come down a step or they wrap into the rule below.
  const titleSize = title.length > 26 ? 84 : 108;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#2B1717",
          padding: "72px",
          color: "#F2EFE6",
          fontFamily: OG_SERIF,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 10,
            textTransform: "uppercase",
            fontFamily: OG_SANS,
            color: "#B3BD83",
          }}
        >
          {category}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 34 }}>
            <span style={{ display: "flex" }}>{price}</span>
            {status && status !== "Available" ? (
              <>
                <span style={{ display: "flex", color: "#A89F90" }}>/</span>
                <span
                  style={{
                    display: "flex",
                    fontSize: 24,
                    letterSpacing: 8,
                    textTransform: "uppercase",
            fontFamily: OG_SANS,
                    color: "#C19A86",
                  }}
                >
                  {status}
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(242,239,230,0.25)",
            paddingTop: 28,
            fontSize: 24,
            letterSpacing: 12,
            textTransform: "uppercase",
            fontFamily: OG_SANS,
          }}
        >
          <div style={{ display: "flex" }}>More Haus</div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 6, color: "#A89F90" }}>
            {site.serviceArea}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}
