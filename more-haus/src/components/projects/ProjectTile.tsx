import Link from "next/link";
import { createElement } from "react";

import { EditorialImage } from "@/components/media/EditorialImage";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * One project in an editorial composition.
 *
 * The caption sits below the frame and is always readable — hover only adds
 * emphasis (a slow crop-in, the project type fading up, the rule sweeping)
 * rather than being the only way to learn what the project is. That matters on
 * phones, where there is no hover at all.
 */
export function ProjectTile({
  project,
  /** Aspect ratio of the crop. Vary these across a page; never repeat a row. */
  aspect = "aspect-[4/3]",
  /** Passed to the image so the browser fetches an appropriately sized file. */
  sizes = "(min-width: 1024px) 50vw, 100vw",
  /** Sets the display size of the caption. */
  scale = "md",
  index,
  /** 2 on an index page where this is the first heading under the h1;
      3 inside a section that already has its own h2. */
  headingLevel = 3,
  className,
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
  scale?: "sm" | "md" | "lg";
  index?: number;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const titleClass = {
    sm: "text-[1.25rem] md:text-[1.5rem]",
    md: "display-sm",
    lg: "display-md",
  }[scale];

  return (
    <article className={cn("group", className)}>
      <Link href={`/projects/${project.slug}`} className="block">
        <div className={cn("frame", aspect)}>
          <EditorialImage media={project.cover} sizes={sizes} zoom />
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-6">
          <div className="min-w-0">
            {createElement(
              `h${headingLevel}`,
              {
                className: cn(
                  "font-[family-name:var(--font-display)] leading-tight transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5",
                  titleClass,
                ),
              },
              project.title,
            )}
            <p className="label mt-2 text-smoke">{project.location}</p>
            {project.type ? (
              <p className="label-sm mt-2 text-smoke/70 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
                {project.type} — {project.year}
              </p>
            ) : null}
          </div>

          {typeof index === "number" ? (
            <span
              aria-hidden="true"
              className="label-sm shrink-0 text-smoke/50"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
