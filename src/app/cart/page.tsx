import type { Metadata } from "next";
import { CartPageContent } from "@/components/shop/CartPageContent";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Your Basket",
  description: "Review your order of raw honey, herbal salves and tallow skin care from The Wild Bee & Me.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="min-h-[70vh] bg-cream pb-24 pt-28 sm:pt-36">
      <Container>
        <h1 className="text-3xl leading-tight text-forest-800 sm:text-4xl">
          Your basket
        </h1>
        <p className="mt-3 text-[1.02rem] text-ink-muted">
          Everything below is made by hand at More Chaos Farm in Alva, Florida.
        </p>
        <div className="mt-10">
          <CartPageContent />
        </div>
      </Container>
    </div>
  );
}
