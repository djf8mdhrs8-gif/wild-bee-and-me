import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Interiors by MORE HAUS across Southwest Florida — whole houses, single rooms, and everything sourced along the way.",
  alternates: { canonical: "/projects" },
};

/**
 * Six layout slots cycle as the list runs, so no two neighbouring projects get
 * the same shape or sit on the same baseline. Adding projects to the content
 * file extends the rhythm rather than adding rows of matching cards.
 */
const LAYOUT = [
  {
    span: "md:col-span-7",
    start: "",
    aspect: "aspect-[4/3]",
    offset: "",
    scale: "lg" as const,
    sizes: "(min-width: 1024px) 58vw, (min-width: 768px) 58vw, 100vw",
  },
  {
    span: "md:col-span-4 md:col-start-9",
    start: "",
    aspect: "aspect-[3/4]",
    offset: "md:mt-[7vw] lg:mt-[9vw]",
    scale: "sm" as const,
    sizes: "(min-width: 768px) 32vw, 100vw",
  },
  {
    span: "md:col-span-5 md:col-start-2",
    start: "",
    aspect: "aspect-[4/5]",
    offset: "",
    scale: "md" as const,
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
  {
    span: "md:col-span-5 md:col-start-8",
    start: "",
    aspect: "aspect-[5/4]",
    offset: "md:mt-[6vw] lg:mt-[7vw]",
    scale: "md" as const,
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
  {
    span: "md:col-span-9 md:col-start-3",
    start: "",
    aspect: "aspect-[16/9]",
    offset: "",
    scale: "lg" as const,
    sizes: "(min-width: 768px) 74vw, 100vw",
  },
  {
    span: "md:col-span-4",
    start: "",
    aspect: "aspect-[3/4]",
    offset: "md:mt-[4vw]",
    scale: "sm" as const,
    sizes: "(min-width: 768px) 32vw, 100vw",
  },
];

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Houses that look like they were{" "}
            <span className="aside-italic">gathered</span>.
          </>
        }
        lede="Whole homes, second homes and single rooms across Southwest Florida. Every one of them furnished over months rather than in one delivery."
      />

      {projects.length === 0 ? (
        <div className="wrap pb-[clamp(6rem,14vw,12rem)]">
          <p className="lede text-smoke">
            Project photography is being finished. In the meantime, the studio is
            happy to walk you through recent work in person.
          </p>
        </div>
      ) : (
        <div className="wrap pb-[clamp(6rem,14vw,12rem)]">
          <div className="grid items-start gap-x-8 gap-y-[clamp(3.5rem,8vw,7rem)] md:grid-cols-12">
            {projects.map((project, index) => {
              const layout = LAYOUT[index % LAYOUT.length];
              return (
                <Reveal
                  key={project.slug}
                  className={`${layout.span} ${layout.start} ${layout.offset}`}
                  distance={34}
                >
                  <ProjectTile
                    project={project}
                    index={index}
                    aspect={layout.aspect}
                    scale={layout.scale}
                    sizes={layout.sizes}
                    headingLevel={2}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
