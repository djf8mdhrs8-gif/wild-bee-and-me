import { ImageResponse } from "next/og";

import { OG_SANS, OG_SERIF, ogFonts } from "@/lib/og-fonts";
import { site } from "@/content/site";
import { getProject, getProjects } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "A MORE HAUS interior design project";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

/** The share card for a project, typeset to match the collection cards. */
export default async function ProjectOgImage({
  params,
}: {
  // Next 16 hands these to image routes as a promise.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.title ?? site.name;
  const location = project?.location ?? site.serviceArea;
  const meta = [project?.type, project?.year].filter(Boolean).join(" — ");

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
          backgroundColor: "#302C28",
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
          Project
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#E8E1D3" }}>{location}</div>
          {meta ? (
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
            fontFamily: OG_SANS,
                color: "#A89F90",
              }}
            >
              {meta}
            </div>
          ) : null}
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
            Interiors
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}
