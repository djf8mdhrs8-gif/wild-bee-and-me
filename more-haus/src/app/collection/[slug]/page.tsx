import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/collection/ProductCard";
import { ProductGallery } from "@/components/collection/ProductGallery";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { getProduct, getProducts, getRelatedProducts } from "@/lib/content";
import { formatPrice } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Piece not found" };

  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/collection/${product.slug}` },
    openGraph: {
      title: `${product.title} — ${formatPrice(product.price)}`,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 3);
  const sold = product.status === "Sold";

  const details: Array<[string, string]> = [
    ["Dimensions", product.dimensions],
    ["Condition", product.condition],
  ];
  if (product.materials) details.push(["Materials", product.materials]);
  if (product.provenance) details.push(["Provenance", product.provenance]);

  return (
    <article className="pt-[clamp(6rem,11vw,9rem)]">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="label text-smoke">
          <Link href="/collection" className="link-rule">
            The Collection
          </Link>
          <span className="mx-3 opacity-40" aria-hidden="true">
            /
          </span>
          <span>{product.category}</span>
        </nav>

        <div className="mt-8 grid gap-x-12 gap-y-10 pb-[clamp(4rem,9vw,7rem)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* The detail column sticks while the photographs scroll past it. */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              <h1 className="display-md">{product.title}</h1>

              <p className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span
                  className={
                    sold
                      ? "text-[1.375rem] font-light text-smoke/70"
                      : "text-[1.375rem] font-light"
                  }
                >
                  {formatPrice(product.price)}
                </span>
                <span
                  className={
                    product.status === "Available"
                      ? "label text-olive-deep"
                      : "label text-clay"
                  }
                >
                  {product.status}
                </span>
              </p>

              <p className="body-lg mt-8 text-smoke">{product.description}</p>

              <dl className="rule mt-10 pt-8">
                {details.map(([term, value]) => (
                  <div key={term} className="grid grid-cols-3 gap-4 border-b border-espresso/10 py-4">
                    <dt className="label text-smoke">{term}</dt>
                    <dd className="col-span-2 text-[0.9375rem] leading-relaxed font-light">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                {sold ? (
                  <>
                    <p className="body-lg text-smoke">
                      This one has gone. Pieces like it turn up regularly — tell
                      us what you are after and it will be watched for.
                    </p>
                    <Link
                      href={`/contact?subject=furniture&piece=${product.slug}`}
                      className="btn mt-6"
                    >
                      Ask for something similar
                    </Link>
                  </>
                ) : (
                  <Link
                    href={`/contact?subject=furniture&piece=${product.slug}`}
                    className="btn btn-solid w-full sm:w-auto"
                  >
                    {product.status === "Coming Soon"
                      ? "Ask to be told first"
                      : "Inquire about this piece"}
                  </Link>
                )}
              </div>

              <div className="rule mt-10 space-y-5 pt-8">
                <div>
                  <h2 className="label text-smoke">Pickup</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed font-light">
                    {product.pickup ?? site.fulfilment.pickup}
                  </p>
                </div>
                <div>
                  <h2 className="label text-smoke">Delivery</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed font-light">
                    {product.delivery ?? site.fulfilment.delivery}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section
          className="bg-linen py-[clamp(4rem,10vw,8rem)]"
          aria-labelledby="related"
        >
          <div className="wrap">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 id="related" className="display-sm">
                  More from the collection
                </h2>
                <Link href="/collection" className="link-rule label">
                  View all
                </Link>
              </div>
            </Reveal>

            <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 items-start gap-x-6 gap-y-10 lg:grid-cols-3 lg:gap-x-10">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.06}>
                  <ProductCard
                    product={item}
                    aspect={index === 1 ? "aspect-[3/4]" : "aspect-[4/5]"}
                    sizes="(min-width: 1024px) 30vw, 45vw"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
