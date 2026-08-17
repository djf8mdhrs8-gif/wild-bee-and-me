import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export function FaqSection({
  showLinkToFaqPage = true,
}: {
  showLinkToFaqPage?: boolean;
}) {
  return (
    <section id="faq" className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Questions"
          title="The things people ask before they call"
          lede="If yours is not here, ring us — you will get a person, not a script."
        />

        <Reveal delay={0.08} className="mx-auto mt-14 max-w-3xl">
          <Accordion items={faqs} />
        </Reveal>

        <Reveal delay={0.12} className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-[0.98rem] text-ink-muted">
            Still stuck?{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-honey-600 underline-offset-4 hover:underline"
            >
              Call {site.phone}
            </a>{" "}
            or{" "}
            <Link
              href="/contact"
              className="font-semibold text-honey-600 underline-offset-4 hover:underline"
            >
              send a message
            </Link>
            {showLinkToFaqPage ? (
              <>
                {" "}— or read the{" "}
                <Link
                  href="/faq"
                  className="font-semibold text-honey-600 underline-offset-4 hover:underline"
                >
                  full FAQ
                </Link>
                .
              </>
            ) : (
              "."
            )}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
