"use client";

import { useSyncExternalStore } from "react";

/** The year never changes while someone is looking at the page. */
const subscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();

/**
 * The current year.
 *
 * Most of this site is static, so a year rendered on the server is the year the
 * site was last built — the footer would still read 2026 well into 2027.
 *
 * `useSyncExternalStore` is the tool for a value that legitimately differs
 * between server and browser: the server snapshot is the build year, so the
 * markup hydrates cleanly, and the browser snapshot is the real year.
 */
export function CopyrightYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(subscribe, getClientYear, () => buildYear);
  return <>{year}</>;
}
