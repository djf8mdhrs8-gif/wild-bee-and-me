import Link from "next/link";
import {
  BeeIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { nav, site } from "@/lib/site";
import { products } from "@/lib/products";
import { serviceArea } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-800 text-forest-100">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-honey-500/15 text-honey-300 ring-1 ring-honey-400/30">
                <BeeIcon className="h-6 w-6" />
              </span>
              <span className="font-display text-xl font-semibold text-cream">
                The Wild Bee &amp; Me
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-forest-200">
              Humane live bee removal and small-batch honey, salves and skin care
              from More Chaos Farm in Alva, Florida. Run by {site.owner} — a
              licensed beekeeper who answers her own phone.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on Instagram`}
                className="grid h-11 w-11 place-items-center rounded-full bg-forest-700 text-forest-100 transition-colors hover:bg-honey-500 hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={site.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on Facebook`}
                className="grid h-11 w-11 place-items-center rounded-full bg-forest-700 text-forest-100 transition-colors hover:bg-honey-500 hover:text-white"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-honey-300">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <Link href="/" className="transition-colors hover:text-honey-300">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-honey-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-honey-300">
              From the Farm
            </h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="transition-colors hover:text-honey-300"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/bee-removal#request"
                  className="transition-colors hover:text-honey-300"
                >
                  Request a Removal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-honey-300">
              Get in Touch
            </h2>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-3 transition-colors hover:text-honey-300"
                >
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-honey-400" />
                  <span>
                    {site.phone}
                    <span className="block text-[0.82rem] text-forest-300">
                      {site.hours}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 transition-colors hover:text-honey-300"
                >
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-honey-400" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-honey-400" />
                <span>
                  {site.address.locality}, {site.address.region}{" "}
                  {site.address.postalCode}
                  <span className="block text-[0.82rem] text-forest-300">
                    Serving {serviceArea.map((area) => area.county.replace(" County", "")).join(", ")} Counties
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-forest-700 pt-8 text-[0.85rem] text-forest-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · More Chaos Farm, Alva FL. All rights reserved.
          </p>
          <p className="text-honey-300/90">
            No colony exterminated. Not one, not ever.
          </p>
        </div>
      </Container>
    </footer>
  );
}
