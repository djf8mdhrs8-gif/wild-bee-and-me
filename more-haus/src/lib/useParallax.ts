"use client";

import { useEffect, useRef } from "react";

/**
 * Drifts an element vertically as its container passes through the viewport.
 *
 * Like `useReveal`, every parallax element on the page shares one scroll
 * listener rather than registering its own, and the work per frame is a single
 * `transform` write — which the compositor handles without a layout or paint.
 *
 * Returns refs for the container (whose position drives the effect) and the
 * inner element that actually moves.
 */

type Registered = { container: HTMLElement; inner: HTMLElement; strength: number };

const registry = new Set<Registered>();
let listening = false;
let frame = 0;

function update() {
  frame = 0;
  const viewportHeight = window.innerHeight;

  for (const item of registry) {
    const rect = item.container.getBoundingClientRect();

    // Skip anything nowhere near the viewport — most of a long page.
    if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 2) continue;

    // 0 when the container's top reaches the bottom of the viewport,
    // 1 when its bottom leaves the top — the same span framer-motion's
    // ["start end", "end start"] offset covers.
    const raw = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const progress = Math.min(1, Math.max(0, raw));
    const offset = (progress * 2 - 1) * item.strength;

    item.inner.style.transform = `translate3d(0, ${offset.toFixed(2)}%, 0)`;
  }
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(update);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

export function useParallax(strength: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // Honour the OS setting, and keep honouring it if it changes mid-session.
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const attach = () => {
      if (query.matches) {
        inner.style.transform = "";
        return;
      }
      const item: Registered = { container, inner, strength };
      registry.add(item);
      start();
      schedule();
      return item;
    };

    let item = attach();

    const onPreferenceChange = () => {
      if (item) {
        registry.delete(item);
        if (registry.size === 0) stop();
      }
      item = attach();
    };

    query.addEventListener("change", onPreferenceChange);

    return () => {
      query.removeEventListener("change", onPreferenceChange);
      if (item) registry.delete(item);
      if (registry.size === 0) stop();
    };
  }, [strength]);

  return { containerRef, innerRef };
}
