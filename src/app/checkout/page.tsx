import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order from The Wild Bee & Me.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="min-h-[70vh] bg-cream pb-24 pt-28 sm:pt-36">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 text-[0.85rem] text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/shop" className="transition-colors hover:text-honey-600">
                Shop
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/cart" className="transition-colors hover:text-honey-600">
                Basket
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-forest-700" aria-current="page">
              Checkout
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl leading-tight text-forest-800 sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-3 max-w-xl text-[1.02rem] text-ink-muted">
          Tell us where it&rsquo;s going. We confirm every order by email before
          taking payment.
        </p>

        <div className="mt-10">
          <CheckoutForm />
        </div>
      </Container>
    </div>
  );
}
