/** Small hand-rolled validators — no runtime dependency, no bundle cost. */

export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Trim, collapse whitespace and cap length so notifications stay readable. */
export const clean = (value: unknown, maxLength = 2000) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";

/** Preserve line breaks for message bodies, but still trim and cap. */
export const cleanMultiline = (value: unknown, maxLength = 5000) =>
  typeof value === "string"
    ? value.trim().replace(/[^\S\n]+/g, " ").slice(0, maxLength)
    : "";

/**
 * Very small in-memory rate limiter.
 *
 * Enough to blunt casual form spam on a single instance. It intentionally does
 * not survive a cold start or coordinate across serverless instances — if this
 * site ever needs real protection, put Vercel WAF or Upstash Redis in front.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) return false;

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [existingKey, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(existingKey);
    }
  }

  return true;
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";
