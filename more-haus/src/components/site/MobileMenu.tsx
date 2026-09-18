"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";

/** Keep in step with the transition durations in the markup below. */
const EXIT_MS = 400;

/**
 * Full-screen navigation for phones and tablets.
 *
 * Deliberately not a slide-out drawer: the menu takes the whole screen, sets
 * the links at display size, and reads as part of the design rather than as a
 * utility panel. Most visitors arrive here from Instagram on a phone, so this
 * is the primary navigation, not a fallback.
 *
 * The open and close transitions are CSS. An animation library would be the
 * obvious way to handle the exit, but it is the only thing on the site that
 * would need one, and loading it on every page to fade one panel is a poor
 * trade for the visitor — so the panel stays mounted for the length of its own
 * exit transition and then unmounts itself.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [prevOpen, setPrevOpen] = useState(open);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // React's sanctioned way to react to a prop change: adjust state during
  // render rather than in an effect, which would cost an extra pass and make
  // the panel flash at full opacity before transitioning out.
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) {
      setClosing(false);
    } else {
      setClosing(true);
      setVisible(false);
    }
  }

  // Rendered while open, and while the closing transition is still running.
  const mounted = open || closing;

  // Mount at the closed state, let it paint, then transition in.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Unmount once the exit transition has finished.
  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => setClosing(false), EXIT_MS);
    return () => clearTimeout(timer);
  }, [closing]);

  // Escape closes, and focus stays inside the panel while it is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
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

  if (!mounted) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={cn(
        "fixed inset-0 z-[60] bg-ivory transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
        visible ? "opacity-100" : "opacity-0",
      )}
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
              <li
                key={item.href}
                className={cn(
                  "border-b border-espresso/10 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0",
                )}
                // Links arrive one after another rather than all at once.
                style={{ transitionDelay: visible ? `${80 + index * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="display-sm block py-4 text-espresso"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-10 transition-opacity duration-500",
              visible ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: visible ? "450ms" : "0ms" }}
          >
            <Link href="/contact" onClick={onClose} className="btn btn-solid">
              Inquire
            </Link>
          </div>
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
    </div>
  );
}
