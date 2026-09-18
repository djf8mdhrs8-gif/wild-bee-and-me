import type { Metadata } from "next";

import { CollectionBrowser } from "@/components/collection/CollectionBrowser";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/content/site";
import { getActiveCategories, getProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Vintage and antique furniture, lighting, art and objects sourced by MORE HAUS in Southwest Florida. Available for purchase, with local pickup and delivery.",
  alternates: { canonical: "/collection" },
};

export default function CollectionPage() {
  const products = getProducts();
  const categories = getActiveCategories();

  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title={
          <>
            Found, collected and chosen for the{" "}
            <span className="aside-italic">home</span>.
          </>
        }
        lede="Pieces sourced one at a time for projects and for the studio. Sold work stays on the page — it is the clearest record of what we look for."
      >
        <p className="label mt-10 max-w-[60ch] text-smoke">
          {site.fulfilment.pickup}
        </p>
      </PageHeader>

      {products.length === 0 ? (
        <div className="wrap pb-[clamp(6rem,14vw,12rem)]">
          <p className="display-sm max-w-[22ch]">
            The collection is between pieces.
          </p>
          <p className="body-lg mt-5 max-w-[46ch] text-smoke">
            New finds are listed after each sourcing trip, and the best of them
            go out to the mailing list first.
          </p>
        </div>
      ) : (
        <CollectionBrowser products={products} categories={categories} />
      )}
    </>
  );
}
