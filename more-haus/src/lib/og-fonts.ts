import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The brand faces, for share cards.
 *
 * Satori — the renderer behind `ImageResponse` — has no system fonts at all, so
 * a `font-family` of "Georgia, serif" silently falls back to a generic sans.
 * The share card is the first thing most people see of this brand, usually in
 * an Instagram or Facebook feed, so it is the last place to be off-brand.
 *
 * These are TTFs because Satori cannot read WOFF2, which is what `next/font`
 * downloads for the site itself. Read once at module scope, as the docs
 * prescribe: the files never change between requests.
 */
const [serif, sans] = await Promise.all([
  readFile(join(process.cwd(), "assets/InstrumentSerif-Regular.ttf")),
  readFile(join(process.cwd(), "assets/Jost-Regular.ttf")),
]);

export const ogFonts = [
  { name: "Instrument Serif", data: serif, weight: 400 as const, style: "normal" as const },
  { name: "Jost", data: sans, weight: 400 as const, style: "normal" as const },
];

/** Display face — headlines and names. */
export const OG_SERIF = "Instrument Serif";
/** Label face — eyebrows, meta and the wordmark. */
export const OG_SANS = "Jost";
