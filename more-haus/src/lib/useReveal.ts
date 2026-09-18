"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decides when a block has arrived and should fade in.
 *
 * This deliberately does not use IntersectionObserver. An observer only fires
 * when an element *crosses* the viewport edge, so anything the page jumps past
 * — a restored scroll position, an in-page anchor, End on the keyboard — would
 * never receive its callback and would stay invisible forever. Checking the
 * element's actual position instead means a block is shown whenever it is in
 * view *or already above it*, whatever route the page took to get there.
 *
 * One scroll listener is shared by every block on the page rather than one per
 * block, and it detaches itself as soon as the last block has been revealed.
 */

type Pending = { element: HTMLElement; reveal: () => void };

const pending = new Set<Pending>();
let listening = false;
let frame = 0;

function check() {
  frame = 0;
  const viewportHeight = window.innerHeight;

  for (const item of Array.from(pending)) {
    const rect = item.element.getBoundingClientRect();
    const arrived = rect.top < viewportHeight * 0.92;
    const passed = rect.bottom < 0;

    if (arrived || passed) {
      pending.delete(item);
      item.reveal();
    }
  }

  if (pending.size === 0) stopListening();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(check);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Anything already in view on load is revealed without waiting for a scroll
    // that may never come.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }

    const item: Pending = { element, reveal: () => setShown(true) };
    pending.add(item);
    startListening();

    return () => {
      pending.delete(item);
      if (pending.size === 0) stopListening();
    };
  }, []);

  return { ref, shown };
}
