import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { ProductCard } from "@/components/shop/ProductCard";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct, products } from "@/lib/products";
import { breadcrumbSchema, productSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ slug: string }> };

/** Pre-render every product at build time. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.summary,
    keywords: product.seoKeywords,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} | The Wild Bee & Me`,
      description: product.summary,
      url: `/shop/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const related = products.filter((item) => item.slug !== product.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            productSchema(product),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: product.name, path: `/shop/${product.slug}` },
            ]),
          ]),
        }}
      />

      <div className="bg-cream pb-20 pt-28 sm:pb-28 sm:pt-36">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.85rem] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-honey-600">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/shop" className="transition-colors hover:text-honey-600">
                  Shop
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-forest-700" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <ProductDetail product={product} />

          {/* Long-form story */}
          <Reveal className="mt-20 max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-forest-800 sm:text-3xl">
              About this {product.category.toLowerCase()}
            </h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink-muted">
              {product.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>

      <section className="bg-sand py-20 sm:py-24">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-forest-800 sm:text-3xl">
            Also from the farm
          </h2>
          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.08} className="h-full">
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
