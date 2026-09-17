"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { navigation, site } from "@/content/site";
import { Wordmark } from "./Wordmark";

/**
 * Full-screen navigation for phones and tablets.
 *
 * Deliberately not a slide-out drawer: the menu takes the whole screen, sets
 * the links at display size, and reads as part of the design rather than as a
 * utility panel. Most visitors arrive here from Instagram on a phone, so this
 * is the primary navigation, not a fallback.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape closes, and focus is kept inside the panel while it is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Hold the page still behind the menu.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const duration = reduceMotion ? 0 : 0.7;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] bg-ivory lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration * 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-[clamp(1.25rem,5vw,5.5rem)] py-6">
              <Link href="/" onClick={onClose} aria-label="MORE HAUS — home">
                <Wordmark size="sm" />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="label -mr-2 p-2 text-espresso"
              >
                Close
              </button>
            </div>

            <nav
              aria-label="Primary"
              className="flex flex-1 flex-col justify-center px-[clamp(1.25rem,5vw,5.5rem)]"
            >
              <ul>
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration,
                      delay: reduceMotion ? 0 : 0.08 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-espresso/10"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="display-sm block py-4 text-espresso"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration, delay: reduceMotion ? 0 : 0.45 }}
                className="mt-10"
              >
                <Link href="/contact" onClick={onClose} className="btn btn-solid">
                  Inquire
                </Link>
              </motion.div>
            </nav>

            <div className="px-[clamp(1.25rem,5vw,5.5rem)] pb-10">
              <p className="label text-smoke">{site.serviceArea}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {site.social.map((channel) => (
                  <li key={channel.href}>
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="label text-espresso"
                    >
                      {channel.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="label text-espresso">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
