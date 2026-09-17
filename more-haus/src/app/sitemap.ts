import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { getProducts, getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/collection", priority: 0.9 },
    { path: "/home-edit", priority: 0.9 },
    { path: "/design-services", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
  ].map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const projectRoutes = getProjects().map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const productRoutes = getProducts().map((product) => ({
    url: `${site.url}/collection/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...productRoutes];
}
