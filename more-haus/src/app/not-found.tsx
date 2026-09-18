import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { navigation } from "@/content/site";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-center py-[clamp(6rem,14vw,12rem)]">
      <Eyebrow>404</Eyebrow>

      <h1 className="display-lg mt-8 max-w-[18ch] text-balance">
        This one has already{" "}
        <span className="aside-italic">gone home</span>.
      </h1>

      <p className="body-lg mt-8 max-w-[44ch] text-smoke">
        The page you were after is not here. The collection turns over quickly —
        it may have been a piece that sold.
      </p>

      <nav aria-label="Site" className="mt-12">
        <ul className="flex flex-wrap gap-x-10 gap-y-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link-rule label">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
