"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation, overlayHeroRoutes } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

/**
 * Understated, fixed navigation.
 *
 * On pages that open with a full-bleed dark hero the header sits over the
 * photograph in ivory with no background at all; once the page scrolls past the
 * hero it settles onto an ivory ground with a single hairline. Everywhere else
 * it starts settled.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overHero = overlayHeroRoutes.includes(pathname);
  // Project case studies all open with a full-bleed hero too.
  const overProjectHero = pathname.startsWith("/projects/");
  const startsTransparent = overHero || overProjectHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Every link inside the menu closes it on click, which covers ordinary
  // navigation. Browser history is the one route change the menu cannot see,
  // so it subscribes to that directly rather than reacting to the pathname.
  useEffect(() => {
    const onPopState = () => setMenuOpen(false);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const inverted = startsTransparent && !scrolled;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-espresso focus:px-4 focus:py-2 focus:text-ivory label"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-700",
          inverted
            ? "border-b border-transparent bg-transparent text-ivory"
            : "border-b border-espresso/10 bg-ivory/92 text-espresso backdrop-blur-[6px]",
        )}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-8 lg:h-[5.5rem]">
          <Link
            href="/"
            aria-label="MORE HAUS — home"
            className="shrink-0 transition-opacity duration-500 hover:opacity-70"
          >
            <Wordmark onDark={inverted} size="md" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-x-9">
              {navigation.map((item) => {
                const active = pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "label relative pb-1 transition-opacity duration-500",
                        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                        "hover:after:origin-left hover:after:scale-x-100",
                        active ? "opacity-100 after:scale-x-100" : "opacity-70 hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={cn(
                "label hidden shrink-0 border px-6 py-3 transition-colors duration-500 lg:inline-flex",
                inverted
                  ? "border-ivory/50 text-ivory hover:bg-ivory hover:text-espresso"
                  : "border-espresso/30 text-espresso hover:bg-espresso hover:text-ivory",
              )}
            >
              Inquire
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="label -mr-2 flex items-center gap-2 p-2 lg:hidden"
            >
              Menu
              <span aria-hidden="true" className="flex w-5 flex-col gap-[3px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
