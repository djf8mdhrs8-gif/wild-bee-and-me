"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon, BeeIcon, PhoneIcon, ShieldIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/site";

const chips = [
  "Licensed beekeeper",
  "Bees relocated, never exterminated",
  "Lee · Charlotte · Hendry Counties",
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative isolate overflow-hidden bg-forest-800 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-36 lg:pt-48">
      {/* Layered atmosphere: deep forest base, warm honey glow, honeycomb texture */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_75%_10%,#3e6250_0%,#1e3a2f_45%,#0d1a15_100%)]"
      />
      <div
        aria-hidden
        className="animate-drift absolute -right-[10%] -top-[20%] -z-10 h-[70vw] max-h-[820px] w-[70vw] max-w-[820px] rounded-full bg-[radial-gradient(circle,rgba(221,168,47,0.38)_0%,rgba(200,135,27,0.14)_45%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.16] [mask-image:radial-gradient(80%_70%_at_50%_35%,black,transparent)]"
      />

      <Container>
        <div className="max-w-3xl">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-honey-400/30 bg-honey-500/10 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-honey-200 backdrop-blur-sm"
          >
            <BeeIcon className="h-4 w-4" />
            More Chaos Farm · Alva, Florida
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="text-shadow-hero mt-7 text-[2.6rem] leading-[1.03] text-cream sm:text-6xl lg:text-[4.25rem]"
          >
            Get the bees out.
            <span className="block text-honey-300">Keep the bees alive.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-forest-100 sm:text-xl"
          >
            Humane live bee removal across Lee, Charlotte and Hendry Counties —
            every colony relocated to our farm, never destroyed. And when the bees
            settle in, they give us the raw honey, salves and skin care we bottle
            by hand.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={site.phoneHref}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-honey-500 px-8 py-4 text-base font-semibold text-white shadow-glow transition-all hover:bg-honey-400 hover:shadow-lift active:scale-[0.98]"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {site.phone}
            </a>
            <Link
              href="/bee-removal#request"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-8 py-4 text-base font-semibold text-cream backdrop-blur-sm transition-all hover:border-cream/60 hover:bg-cream/20 active:scale-[0.98]"
            >
              Request a Removal
            </Link>
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 px-4 py-4 text-base font-semibold text-honey-200 transition-colors hover:text-honey-100"
            >
              Shop the farm
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.ul
            {...rise(0.32)}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9rem] text-forest-200"
          >
            {chips.map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <ShieldIcon className="h-4 w-4 text-honey-400" />
                {chip}
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>

      {/* Soft transition into the cream page body */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream/95"
      />
    </section>
  );
}
