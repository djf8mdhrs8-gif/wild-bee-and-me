import type { Metadata } from "next";

import { InquiryForm } from "@/components/forms/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/content/site";
import { getProduct } from "@/lib/content";
import { INQUIRY_SUBJECTS } from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a design inquiry with MORE HAUS, ask about a piece in the collection, or get in touch about The Home Edit.",
  alternates: { canonical: "/contact" },
};

type SearchParams = {
  searchParams: Promise<{ subject?: string; piece?: string }>;
};

/**
 * Links from a product page arrive as /contact?subject=furniture&piece=<slug>.
 * Reading that here on the server means the form renders pre-filled in the
 * first response rather than snapping into shape after hydration.
 */
export default async function ContactPage({ searchParams }: SearchParams) {
  const { subject, piece } = await searchParams;

  const validSubject = INQUIRY_SUBJECTS.some((option) => option.value === subject)
    ? subject
    : "interior-design";

  const referencedPiece = piece ? getProduct(piece) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us about the{" "}
            <span className="aside-italic">house</span>.
          </>
        }
        lede="Design inquiries, questions about a piece, or anything to do with The Home Edit. Everything here reaches the studio directly."
      />

      <div className="wrap pb-[clamp(6rem,14vw,12rem)]">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {referencedPiece ? (
              <Reveal>
                <p className="rule label pt-6 text-smoke">
                  About{" "}
                  <span className="text-espresso">{referencedPiece.title}</span>
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={0.05}>
              <div className={referencedPiece ? "mt-10" : undefined}>
                <InquiryForm
                  defaultSubject={validSubject}
                  piece={referencedPiece?.slug}
                />
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <div className="lg:sticky lg:top-32">
              <div className="rule pt-8">
                <h2 className="label text-smoke">The studio</h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed font-light">
                  {site.locationLine}
                </p>
                <p className="mt-4">
                  <a href={`mailto:${site.email}`} className="link-rule text-[1.0625rem] font-light">
                    {site.email}
                  </a>
                </p>
                {site.phone ? (
                  <p className="mt-3">
                    <a
                      href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                      className="link-rule text-[1.0625rem] font-light"
                    >
                      {site.phone}
                    </a>
                  </p>
                ) : null}
              </div>

              <div className="rule mt-10 pt-8">
                <h2 className="label text-smoke">Elsewhere</h2>
                <ul className="mt-4 space-y-2">
                  {site.social.map((channel) => (
                    <li key={channel.href}>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-rule text-[1.0625rem] font-light"
                      >
                        {channel.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rule mt-10 pt-8">
                <h2 className="label text-smoke">What happens next</h2>
                <p className="body-lg mt-4 text-smoke">
                  Every inquiry is read by the studio, not a form inbox. Design
                  projects usually start with a call, then a walkthrough of the
                  house. Questions about a piece are answered the same week.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
