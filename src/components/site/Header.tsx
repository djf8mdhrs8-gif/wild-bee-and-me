"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BagIcon, BeeIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/format";
import { useCart } from "@/lib/cart";

/** Routes whose hero is dark, so the header can start transparent over it. */
const DARK_HERO_ROUTES = new Set(["/", "/bee-removal", "/about"]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart, hydrated } = useCart();

  const overDarkHero = DARK_HERO_ROUTES.has(pathname) && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a cascading second render.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMenuOpen(false);
  }

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        overDarkHero
          ? "bg-transparent"
          : "border-b border-linen/80 bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgb(36_28_19/0.04)]",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full transition-colors",
              overDarkHero
                ? "bg-cream/15 text-honey-300 ring-1 ring-cream/25"
                : "bg-honey-100 text-honey-600",
            )}
          >
            <BeeIcon className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span
              className={cn(
                "block font-display text-[1.05rem] font-semibold tracking-tight transition-colors sm:text-lg",
                overDarkHero ? "text-cream" : "text-forest-800",
              )}
            >
              The Wild Bee &amp; Me
            </span>
            <span
              className={cn(
                "hidden text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors sm:block",
                overDarkHero ? "text-honey-200/90" : "text-honey-600",
              )}
            >
              More Chaos Farm · Alva, FL
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  overDarkHero
                    ? "text-cream/85 hover:bg-cream/10 hover:text-cream"
                    : "text-forest-600 hover:bg-forest-50 hover:text-forest-800",
                  active &&
                    (overDarkHero
                      ? "bg-cream/15 text-cream"
                      : "bg-honey-50 text-honey-700"),
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all md:inline-flex",
              overDarkHero
                ? "bg-cream/12 text-cream ring-1 ring-cream/30 hover:bg-cream/20"
                : "bg-honey-500 text-white shadow-soft hover:bg-honey-600 hover:shadow-lift",
            )}
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart${hydrated && itemCount > 0 ? `, ${itemCount} items` : ""}`}
            className={cn(
              "relative grid h-11 w-11 place-items-center rounded-full transition-colors",
              overDarkHero
                ? "text-cream hover:bg-cream/12"
                : "text-forest-700 hover:bg-forest-50",
            )}
          >
            <BagIcon className="h-5 w-5" />
            {hydrated && itemCount > 0 ? (
              <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-honey-500 px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden",
              overDarkHero
                ? "text-cream hover:bg-cream/12"
                : "text-forest-700 hover:bg-forest-50",
            )}
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-linen bg-cream px-5 pb-8 pt-4 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-linen/70 py-4 font-display text-xl text-forest-800"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 grid gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-honey-500 px-6 py-3.5 font-semibold text-white shadow-soft"
              >
                <PhoneIcon className="h-4 w-4" />
                Call {site.phone}
              </a>
              <Link
                href="/bee-removal#request"
                className="inline-flex items-center justify-center rounded-full bg-forest-700 px-6 py-3.5 font-semibold text-cream shadow-soft"
              >
                Request a Bee Removal
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
