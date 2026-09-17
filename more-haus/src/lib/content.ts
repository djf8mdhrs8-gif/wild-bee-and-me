/**
 * The single read layer over `src/content/`.
 *
 * Components never import the content files directly — they call these
 * accessors. Swapping the data source later (a headless CMS, a database)
 * means rewriting this file and nothing else.
 */

import { about } from "@/content/about";
import { homeEditEvents, homeEditExpectations } from "@/content/home-edit";
import { journal } from "@/content/journal";
import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import type {
  HomeEditEvent,
  Product,
  ProductCategory,
  Project,
  Service,
} from "@/content/types";
import { todayInEastern } from "./date";

export { about, homeEditExpectations, journal };

/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/* -------------------------------------------------------------------------- */

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter((project) => project.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The next project in the list, wrapping around — drives "next project". */
export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return undefined;
  return projects[(index + 1) % projects.length];
}

/* -------------------------------------------------------------------------- */
/*  Collection                                                                 */
/* -------------------------------------------------------------------------- */

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/**
 * "More from the collection" — same category first, then anything else,
 * always excluding the piece being viewed.
 */
export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);

  const others = products.filter((product) => product.slug !== slug);
  const sameCategory = others.filter(
    (product) => product.category === current.category,
  );
  const rest = others.filter((product) => product.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

/** Categories that actually have pieces in them, in canonical order. */
export function getActiveCategories(): ProductCategory[] {
  const present = new Set(products.map((product) => product.category));
  return (
    ["Seating", "Tables", "Storage", "Lighting", "Decor", "Art", "Outdoor"] as const
  ).filter((category) => present.has(category));
}

/* -------------------------------------------------------------------------- */
/*  The Home Edit                                                              */
/* -------------------------------------------------------------------------- */

function byDateAscending(a: HomeEditEvent, b: HomeEditEvent) {
  return a.date.localeCompare(b.date);
}

/**
 * Everything still to come, soonest first. Dates roll over on their own at
 * midnight Eastern — an edit stays listed through the day it happens.
 */
export function getUpcomingEdits(limit?: number): HomeEditEvent[] {
  const today = todayInEastern();
  const upcoming = homeEditEvents
    .filter((event) => event.status !== "past" && event.date >= today)
    .sort(byDateAscending);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

/** The next edit, or undefined when no future dates have been added yet. */
export function getNextEdit(): HomeEditEvent | undefined {
  return getUpcomingEdits(1)[0];
}

/** Everything after the next one — the "also on the calendar" list. */
export function getFollowingEdits(limit = 3): HomeEditEvent[] {
  return getUpcomingEdits().slice(1, 1 + limit);
}

/** Past edits, most recent first — the archive. */
export function getPastEdits(limit?: number): HomeEditEvent[] {
  const today = todayInEastern();
  const past = homeEditEvents
    .filter((event) => event.status === "past" || event.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
  return typeof limit === "number" ? past.slice(0, limit) : past;
}

export function getEdit(id: string): HomeEditEvent | undefined {
  return homeEditEvents.find((event) => event.id === id);
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export function getServices(): Service[] {
  return services;
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
