import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { getNextProject, getProject, getProjects } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.location}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <article>
      {/* Hero — full height, title set over the photograph. */}
      <header className="relative h-[80svh] min-h-[28rem] w-full overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <EditorialImage
            media={project.cover}
            sizes="100vw"
            priority
            dark
            showCaption={false}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/20 to-espresso/40"
        />

        <div className="wrap relative flex h-full flex-col justify-end pb-[clamp(2.5rem,7vw,5rem)]">
          <p className="label anim-fade text-parchment/80" style={{ animationDelay: "0.1s" }}>
            {project.location}
          </p>
          <h1
            className="display-lg anim-rise mt-5 max-w-[18ch] text-ivory"
            style={{ animationDelay: "0.2s" }}
          >
            {project.title}
          </h1>
        </div>
      </header>

      {/* Facts, then the story in a single narrow column. */}
      <div className="wrap py-[clamp(4rem,10vw,8rem)]">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <dl className="space-y-6">
              <div>
                <dt className="label text-smoke">Location</dt>
                <dd className="mt-2 text-[1.0625rem] font-light">{project.location}</dd>
              </div>
              {project.type ? (
                <div>
                  <dt className="label text-smoke">Scope</dt>
                  <dd className="mt-2 text-[1.0625rem] font-light">{project.type}</dd>
                </div>
              ) : null}
              <div>
                <dt className="label text-smoke">Year</dt>
                <dd className="mt-2 text-[1.0625rem] font-light">{project.year}</dd>
              </div>
            </dl>
          </Reveal>

          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={0.08}>
              <p className="display-sm max-w-[26ch] text-balance">{project.summary}</p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {project.description.map((paragraph, index) => (
                <Reveal key={index} delay={0.12 + index * 0.05}>
                  <p className="body-lg max-w-[58ch] text-smoke">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProjectGallery gallery={project.gallery} />

      {project.pullQuote ? (
        <div className="wrap py-[clamp(5rem,12vw,10rem)]">
          <Reveal>
            <blockquote className="display-md mx-auto max-w-[22ch] text-balance lg:ml-[16.666%]">
              <span className="aside-italic">&ldquo;{project.pullQuote}&rdquo;</span>
            </blockquote>
          </Reveal>
        </div>
      ) : (
        <div className="py-[clamp(3rem,7vw,5rem)]" />
      )}

      {/* Next project — a full-bleed hand-off rather than a pagination row. */}
      {next ? (
        <Reveal>
          <Link
            href={`/projects/${next.slug}`}
            className="group relative block h-[55svh] min-h-[22rem] overflow-hidden bg-charcoal"
          >
            <div className="absolute inset-0">
              <EditorialImage
                media={next.cover}
                sizes="100vw"
                dark
                zoom
                showCaption={false}
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-espresso/55 transition-colors duration-700 group-hover:bg-espresso/45"
            />
            <div className="wrap relative flex h-full flex-col justify-center">
              <p className="label text-parchment/80">Next project</p>
              <p className="display-md mt-4 text-ivory">{next.title}</p>
              <p className="label mt-4 text-parchment/70">{next.location}</p>
            </div>
          </Link>
        </Reveal>
      ) : null}
    </article>
  );
}
