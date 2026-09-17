import Link from "next/link";

import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { navigation, site } from "@/content/site";
import { Wordmark } from "./Wordmark";

/**
 * A closing page rather than a utility strip: the wordmark at display size,
 * wide spacing, and a single hairline dividing the two halves.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative bg-espresso text-ivory">
      <div className="wrap relative z-10 pt-[clamp(4rem,10vw,9rem)] pb-12">
        <div className="grid gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark onDark size="lg" />
            <p className="lede mt-8 max-w-sm text-parchment/85">
              {site.tagline}
            </p>
            <p className="label mt-8 text-parchment/60">{site.locationLine}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <h2 className="label text-parchment/60">Explore</h2>
            <ul className="mt-6 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[1.0625rem] font-light text-ivory/85 transition-colors duration-500 hover:text-olive"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label text-parchment/60">Elsewhere</h2>
            <ul className="mt-6 space-y-3">
              {site.social.map((channel) => (
                <li key={channel.href}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[1.0625rem] font-light text-ivory/85 transition-colors duration-500 hover:text-olive"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[1.0625rem] font-light text-ivory/85 transition-colors duration-500 hover:text-olive"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-light mt-[clamp(3.5rem,8vw,6rem)] pt-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <NewsletterForm
                source="footer"
                label="Letters from the studio — new pieces, project notes and Home Edit dates."
                onDark
              />
            </div>

            <div className="flex items-end lg:col-span-5 lg:col-start-8">
              <p className="label-sm text-parchment/50">
                &copy; {year} {site.name}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
