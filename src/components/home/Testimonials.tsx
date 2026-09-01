"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/format";

const AUTOPLAY_MS = 8000;

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="h-5 w-5 text-honey-400" aria-hidden>
          <path
            fill="currentColor"
            d="M10 1.6l2.5 5.6 6.1.6-4.6 4.1 1.3 6-5.3-3.1-5.3 3.1 1.3-6L1.4 7.8l6.1-.6z"
          />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const go = useCallback(
    (next: number) => setIndex((next + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % testimonials.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  const active = testimonials[index];

  return (
    <section className="bg-sand py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Reviews"
          title="What Our Customers Say"
          lede="Real people, real hives, across Lee, Charlotte and Hendry Counties."
        />

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="relative min-h-[22rem] sm:min-h-[19rem]"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.name}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-5xl border border-linen bg-white p-8 shadow-lift sm:p-12"
              >
                <Stars />
                <blockquote className="mt-6 font-display text-xl leading-[1.55] text-forest-800 sm:text-[1.6rem]">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-linen pt-6">
                  <span
                    aria-hidden
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-honey-100 font-display text-lg font-semibold text-honey-700"
                  >
                    {active.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-semibold text-forest-800">
                      {active.name}
                    </span>
                    <span className="block text-[0.88rem] text-ink-muted">
                      {active.location} · {active.service}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-linen bg-white text-forest-600 transition-colors hover:border-forest-300 hover:text-forest-800"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex gap-2.5">
              {testimonials.map((testimonial, dotIndex) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => go(dotIndex)}
                  aria-label={`Show testimonial from ${testimonial.name}`}
                  aria-current={dotIndex === index}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    dotIndex === index
                      ? "w-8 bg-honey-500"
                      : "w-2.5 bg-forest-200 hover:bg-forest-300",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-linen bg-white text-forest-600 transition-colors hover:border-forest-300 hover:text-forest-800"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
