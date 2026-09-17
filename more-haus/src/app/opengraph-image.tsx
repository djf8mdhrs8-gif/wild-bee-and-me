import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Typeset rather than photographic, so it holds up before real
 * photography exists and stays on-brand after.
 */
export default function OpengraphImage() {
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
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#B3BD83",
          }}
        >
          Southwest Florida
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 108, letterSpacing: -2, lineHeight: 1 }}>
            {site.tagline}
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
          }}
        >
          <div style={{ display: "flex" }}>More Haus</div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 6, color: "#A89F90" }}>
            Interiors · Collection · Home Edit
          </div>
        </div>
      </div>
    ),
    size,
  );
}
