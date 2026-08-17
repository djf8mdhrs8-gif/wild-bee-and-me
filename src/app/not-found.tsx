import Link from "next/link";
import { BeeIcon, PhoneIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-forest-800 py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(110%_90%_at_60%_10%,#3e6250_0%,#1e3a2f_50%,#0d1a15_100%)]"
      />
      <div
        aria-hidden
        className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.14] [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)]"
      />

      <Container className="max-w-2xl text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-honey-500/15 text-honey-300 ring-1 ring-honey-400/30">
          <BeeIcon className="h-9 w-9" />
        </span>
        <p className="mt-8 font-display text-6xl font-semibold text-honey-300">404</p>
        <h1 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl">
          This one flew off somewhere
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-relaxed text-forest-100">
          The page you were after does not exist. The bees, the honey and the
          phone number are all still where you left them.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-honey-500 px-7 py-3.5 font-semibold text-white shadow-soft transition-colors hover:bg-honey-400"
          >
            Back to home
          </Link>
          <Link
            href="/bee-removal"
            className="rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Bee removal
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </Container>
    </div>
  );
}
