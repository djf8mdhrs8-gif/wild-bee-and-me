"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDownIcon } from "@/components/ui/Icons";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/format";

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = `${panelId}-button`;
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-b border-linen last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              "font-display text-lg font-semibold transition-colors sm:text-xl",
              isOpen ? "text-honey-600" : "text-forest-800",
            )}
          >
            {faq.question}
          </span>
          <span
            className={cn(
              "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
              isOpen
                ? "rotate-180 border-honey-400 bg-honey-50 text-honey-600"
                : "border-linen text-forest-500",
            )}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pb-7 pr-4 text-[1.02rem] leading-relaxed text-ink-muted">
              {faq.answer.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: Faq[];
  /** Index open on first render, or -1 for all collapsed. */
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="rounded-4xl border border-linen bg-white px-6 shadow-soft sm:px-10">
      {items.map((faq, index) => (
        <AccordionItem
          key={faq.question}
          faq={faq}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}
