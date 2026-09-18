import type { Metadata } from "next";

import { AboutPreview } from "@/components/home/AboutPreview";
import { CollectionPreview } from "@/components/home/CollectionPreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { HomeEditFeature } from "@/components/home/HomeEditFeature";
import { Introduction } from "@/components/home/Introduction";
import { JournalGallery } from "@/components/home/JournalGallery";
import { Philosophy } from "@/components/home/Philosophy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * The homepage reads the next Home Edit from today's date, so it is rebuilt on
 * a schedule rather than frozen at deploy time. An hour is far more often than
 * a monthly market needs, and costs nothing.
 */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedProjects />
      <Philosophy />
      <CollectionPreview />
      <HomeEditFeature />
      <AboutPreview />
      <JournalGallery />
    </>
  );
}
