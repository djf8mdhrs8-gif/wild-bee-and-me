import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Live Bee Removal & Raw Local Honey in Alva, Florida`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time. Uses system-default fonts so the
 * build never depends on fetching a webfont.
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
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1e3a2f 0%, #0d1a15 55%, #2c4a3b 100%)",
        }}
      >
        {/* Honey glow */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(221,168,47,0.42) 0%, rgba(200,135,27,0.12) 48%, rgba(0,0,0,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 9999,
              background: "#c8871b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            🐝
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#e8c46b",
              fontWeight: 600,
            }}
          >
            More Chaos Farm · Alva, Florida
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.05,
              color: "#fdfbf5",
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            Get the bees out.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.05,
              color: "#e8c46b",
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            Keep the bees alive.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#dde7df",
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Humane live bee removal across Lee, Charlotte &amp; Hendry Counties —
            plus raw local honey, herbal salves and tallow skin care.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(253,251,245,0.16)",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", fontSize: 34, color: "#fdfbf5", fontWeight: 600 }}>
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#e8c46b",
              fontWeight: 700,
            }}
          >
            {site.phone}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
