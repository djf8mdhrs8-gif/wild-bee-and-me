import Link from "next/link";

import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getFeaturedProjects } from "@/lib/content";

/**
 * A composed run of projects rather than a portfolio grid.
 *
 * Each project occupies a deliberately different shape and position: a wide
 * lead image, a small portrait dropped below the fold line, a full-bleed
 * landscape, then a paired composition. The arrangement is fixed and the
 * content flows into it, so adding a project never produces a row of identical
 * cards. If fewer than five are featured, the later slots simply do not render.
 */
export function FeaturedProjects() {
  const projects = getFeaturedProjects(5);
  if (projects.length === 0) return null;

  const [lead, offset, full, pairOne, pairTwo] = projects;

  return (
    <section className="py-[clamp(3rem,8vw,6rem)]" aria-labelledby="featured-projects">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 pb-[clamp(2.5rem,6vw,4.5rem)]">
            <div>
              <Eyebrow>Selected Work</Eyebrow>
              <h2 id="featured-projects" className="display-md mt-6">
                Projects
              </h2>
            </div>
            <ArrowLink href="/projects">All projects</ArrowLink>
          </div>
        </Reveal>

        {/* Lead image with a portrait dropped alongside and below it. */}
        <div className="grid gap-x-8 gap-y-[clamp(3rem,7vw,5rem)] md:grid-cols-12">
          {lead ? (
            <Reveal className="md:col-span-8" distance={36}>
              <ProjectTile
                project={lead}
                index={0}
                aspect="aspect-[4/3]"
                scale="lg"
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
            </Reveal>
          ) : null}

          {offset ? (
            <Reveal
              className="md:col-span-4 md:col-start-9 md:mt-[6vw] lg:col-span-3 lg:col-start-10 lg:mt-[9vw]"
              delay={0.1}
              distance={36}
            >
              <ProjectTile
                project={offset}
                index={1}
                aspect="aspect-[3/4]"
                scale="sm"
                sizes="(min-width: 1024px) 24vw, 100vw"
              />
            </Reveal>
          ) : null}
        </div>
      </div>

      {/* Full-bleed. The one moment the composition touches both edges — so the
          image escapes the wrap while its caption stays on the text grid. */}
      {full ? (
        <Reveal distance={40}>
          <article className="group mt-[clamp(4rem,10vw,8rem)]">
            <Link href={`/projects/${full.slug}`} className="block">
              <div className="frame aspect-[16/10] md:aspect-[21/9]">
                <EditorialImage media={full.cover} sizes="100vw" zoom />
              </div>

              <div className="wrap mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <div>
                  <h3 className="display-md transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
                    {full.title}
                  </h3>
                  <p className="label mt-3 text-smoke">{full.location}</p>
                </div>
                {full.type ? (
                  <p className="label-sm text-smoke/70 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
                    {full.type} — {full.year}
                  </p>
                ) : null}
              </div>
            </Link>
          </article>
        </Reveal>
      ) : null}

      {/* A two-image composition, the second dropped out of alignment. */}
      {(pairOne || pairTwo) && (
        <div className="wrap mt-[clamp(4rem,10vw,8rem)]">
          <div className="grid gap-x-8 gap-y-[clamp(3rem,7vw,5rem)] md:grid-cols-12">
            {pairOne ? (
              <Reveal className="md:col-span-5" distance={36}>
                <ProjectTile
                  project={pairOne}
                  index={3}
                  aspect="aspect-[3/4]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </Reveal>
            ) : null}

            {pairTwo ? (
              <Reveal
                className="md:col-span-6 md:col-start-7 md:mt-[5vw] lg:mt-[7vw]"
                delay={0.1}
                distance={36}
              >
                <ProjectTile
                  project={pairTwo}
                  index={4}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </Reveal>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
