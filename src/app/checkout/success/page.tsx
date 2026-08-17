import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false, follow: false },
};

type PageProps = { searchParams: Promise<{ ref?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;

  return (
    <div className="min-h-[70vh] bg-cream pb-24 pt-32 sm:pt-40">
      <Container className="max-w-2xl">
        <div className="rounded-5xl border border-linen bg-white p-8 text-center shadow-lift sm:p-14">
          <span className="mx-auto grid h-18 w-18 place-items-center rounded-full bg-forest-600 text-cream">
            <CheckIcon className="h-9 w-9" />
          </span>

          <h1 className="mt-7 text-3xl leading-tight text-forest-800 sm:text-4xl">
            Thank you — your order is in
          </h1>

          {ref ? (
            <p className="mt-4 inline-block rounded-full bg-sand px-5 py-2 font-mono text-[0.9rem] text-forest-700">
              Order reference: <strong>{ref}</strong>
            </p>
          ) : null}

          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-muted">
            {site.owner} will email you within one business day to confirm what you
            ordered, the final shipping cost, and a secure payment link. Nothing has
            been charged yet.
          </p>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 rounded-2xl border border-linen p-4 transition-colors hover:border-honey-300 hover:bg-honey-50/50"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey-100 text-honey-600">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[0.78rem] uppercase tracking-[0.1em] text-ink-muted">
                  Questions?
                </span>
                <span className="block font-semibold text-forest-800">
                  {site.phone}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 rounded-2xl border border-linen p-4 transition-colors hover:border-honey-300 hover:bg-honey-50/50"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey-100 text-honey-600">
                <MailIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[0.78rem] uppercase tracking-[0.1em] text-ink-muted">
                  Email
                </span>
                <span className="block truncate font-semibold text-forest-800">
                  {site.email}
                </span>
              </span>
            </a>
          </div>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-full bg-forest-700 px-7 py-3.5 font-semibold text-cream shadow-soft transition-colors hover:bg-forest-800"
            >
              Keep shopping
            </Link>
            <Link
              href="/"
              className="rounded-full border border-forest-200 px-7 py-3.5 font-semibold text-forest-700 transition-colors hover:bg-forest-50"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
