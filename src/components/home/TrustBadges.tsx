import { HoneycombIcon, LeafIcon, MapPinIcon, ShieldIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const badges = [
  {
    Icon: HoneycombIcon,
    title: "Licensed Beekeeper",
    detail: "Registered with the state and insured for structural removals.",
  },
  {
    Icon: ShieldIcon,
    title: "Humane Removal",
    detail: "Colonies are relocated and rehomed. We never exterminate.",
  },
  {
    Icon: LeafIcon,
    title: "100% Natural Products",
    detail: "Raw honey, beeswax and grass-fed tallow. Nothing synthetic.",
  },
  {
    Icon: MapPinIcon,
    title: "Serving SW Florida",
    detail: "Lee, Charlotte and Hendry Counties, seven days a week.",
  },
];

export function TrustBadges() {
  return (
    <section className="relative z-10 -mt-8 pb-4 sm:-mt-12">
      <Container>
        <ul className="grid gap-px overflow-hidden rounded-4xl border border-linen bg-linen shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, index) => (
            <Reveal
              as="li"
              key={badge.title}
              delay={index * 0.07}
              className="bg-white p-7"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-honey-50 text-honey-600">
                <badge.Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-[1.1rem] font-semibold text-forest-800">
                {badge.title}
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">
                {badge.detail}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
