"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BeeIcon, PhoneIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

/**
 * Two persistent conversion affordances:
 *  - a sticky call/removal bar pinned to the bottom on mobile
 *  - a floating "Request Bee Removal" pill on desktop
 *
 * Both appear only after the visitor scrolls past the hero, so they never
 * cover the first impression, and both hide during checkout.
 */
export function StickyActions() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = pathname.startsWith("/checkout") || pathname.startsWith("/cart");
  if (hidden) return null;

  return (
    <>
      {/* Mobile: full-width dual action bar */}
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-linen bg-cream/95 p-3 backdrop-blur-md md:hidden"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex gap-2.5">
              <a
                href={site.phoneHref}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-honey-500 py-3.5 text-[0.95rem] font-semibold text-white shadow-soft active:scale-[0.98]"
              >
                <PhoneIcon className="h-[18px] w-[18px]" />
                Call Now
              </a>
              <Link
                href="/bee-removal#request"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest-700 py-3.5 text-[0.95rem] font-semibold text-cream shadow-soft active:scale-[0.98]"
              >
                <BeeIcon className="h-[18px] w-[18px]" />
                Bee Removal
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Desktop: floating request pill */}
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-7 right-7 z-40 hidden md:block"
          >
            <Link
              href="/bee-removal#request"
              className="group flex items-center gap-3 rounded-full bg-forest-700 py-3.5 pl-4 pr-6 text-cream shadow-lift transition-all hover:bg-forest-800 hover:shadow-glow"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-honey-500 text-white transition-transform duration-300 group-hover:rotate-12">
                <BeeIcon className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.95rem] font-semibold">
                  Request Bee Removal
                </span>
                <span className="block text-[0.75rem] text-forest-200">
                  Same-day options · 7 days a week
                </span>
              </span>
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
