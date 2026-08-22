"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { BagIcon, ShieldIcon } from "@/components/ui/Icons";
import {
  Field,
  FormStatus,
  inputClass,
  textareaClass,
} from "@/components/ui/Field";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { useCart } from "@/lib/cart";
import { site } from "@/lib/site";
import { LOCAL_DELIVERY_RADIUS_MILES } from "@/lib/products";

type Status = "idle" | "submitting" | "error";

export function CheckoutForm() {
  const router = useRouter();
  const { resolved, hydrated, subtotal, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fulfilment, setFulfilment] = useState<"pickup" | "delivery">("pickup");

  if (!hydrated) {
    return (
      <div
        className="h-96 animate-pulse rounded-4xl border border-linen bg-white"
        aria-busy="true"
        aria-label="Loading checkout"
      />
    );
  }

  if (resolved.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-5xl border border-linen bg-white px-8 py-20 text-center shadow-soft">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-honey-100 text-honey-600">
          <BagIcon className="h-8 w-8" />
        </span>
        <h2 className="font-display text-2xl font-semibold text-forest-800">
          Your basket is empty
        </h2>
        <p className="max-w-sm text-[1.02rem] text-ink-muted">
          Add something from the shop and we will get it packed.
        </p>
        <Link
          href="/shop"
          className="mt-2 rounded-full bg-honey-500 px-8 py-3.5 font-semibold text-white shadow-soft transition-colors hover:bg-honey-600"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const customer = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          lines: resolved.map((line) => ({
            variantId: line.variantId,
            quantity: line.quantity,
          })),
          // Sent for cross-checking only — the server recomputes the total
          // from the catalogue so a tampered payload cannot change the price.
          clientTotals: { subtotal },
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "We could not place that order.");

      clear();
      router.push(`/checkout/success?ref=${encodeURIComponent(data.reference)}`);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : `Something went wrong. Please call us on ${site.phone} and we will take the order by phone.`,
      );
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="space-y-6">
        {/* Contact */}
        <fieldset className="rounded-4xl border border-linen bg-white p-6 shadow-soft sm:p-8">
          <legend className="px-2 font-display text-lg font-semibold text-forest-800">
            Contact details
          </legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="checkout-name" required>
              <input
                id="checkout-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClass()}
              />
            </Field>
            <Field label="Phone" htmlFor="checkout-phone" required>
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={inputClass()}
              />
            </Field>
            <Field label="Email" htmlFor="checkout-email" required className="sm:col-span-2">
              <input
                id="checkout-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass()}
              />
            </Field>
          </div>
        </fieldset>

        {/* Fulfilment */}
        <fieldset className="rounded-4xl border border-linen bg-white p-6 shadow-soft sm:p-8">
          <legend className="px-2 font-display text-lg font-semibold text-forest-800">
            Delivery
          </legend>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                {
                  value: "pickup",
                  title: "Local pickup",
                  detail: `Free — collect from the farm in ${site.address.locality}, ${site.address.region}`,
                },
                {
                  value: "delivery",
                  title: "Local delivery",
                  detail: `Within ${LOCAL_DELIVERY_RADIUS_MILES} miles of ${site.address.locality}`,
                },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                  fulfilment === option.value
                    ? "border-honey-500 bg-honey-50/70"
                    : "border-linen hover:border-honey-300"
                }`}
              >
                <input
                  type="radio"
                  name="fulfilment"
                  value={option.value}
                  checked={fulfilment === option.value}
                  onChange={() => setFulfilment(option.value)}
                  className="sr-only"
                />
                <span className="block font-semibold text-forest-800">
                  {option.title}
                </span>
                <span className="mt-1 block text-[0.85rem] text-ink-muted">
                  {option.detail}
                </span>
              </label>
            ))}
          </div>

          {fulfilment === "delivery" ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-6">
              <Field
                label="Street address"
                htmlFor="checkout-address"
                required
                className="sm:col-span-6"
              >
                <input
                  id="checkout-address"
                  name="address1"
                  type="text"
                  required
                  autoComplete="address-line1"
                  className={inputClass()}
                />
              </Field>
              <Field
                label="Apartment, suite, etc."
                htmlFor="checkout-address2"
                className="sm:col-span-6"
              >
                <input
                  id="checkout-address2"
                  name="address2"
                  type="text"
                  autoComplete="address-line2"
                  className={inputClass()}
                />
              </Field>
              <Field label="City" htmlFor="checkout-city" required className="sm:col-span-3">
                <input
                  id="checkout-city"
                  name="city"
                  type="text"
                  required
                  autoComplete="address-level2"
                  className={inputClass()}
                />
              </Field>
              <Field label="State" htmlFor="checkout-state" required className="sm:col-span-1">
                <input
                  id="checkout-state"
                  name="state"
                  type="text"
                  required
                  readOnly
                  defaultValue="FL"
                  aria-describedby="state-note"
                  className={inputClass("bg-sand text-ink-muted")}
                />
              </Field>
              <Field label="ZIP code" htmlFor="checkout-zip" required className="sm:col-span-2">
                <input
                  id="checkout-zip"
                  name="zip"
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{5}(-[0-9]{4})?"
                  autoComplete="postal-code"
                  className={inputClass()}
                />
              </Field>
            </div>
          ) : (
            <p className="mt-6 rounded-2xl bg-sand px-5 py-4 text-[0.92rem] leading-relaxed text-ink-muted">
              We will email you to arrange a pickup time at the farm in{" "}
              {site.address.locality}, {site.address.region}{" "}
              {site.address.postalCode}. Pickup is always free.
            </p>
          )}

          <div className="mt-6">
            <Field
              label="Order notes"
              htmlFor="checkout-notes"
              hint="Gift message, allergy notes, a preferred pickup day — anything useful."
            >
              <textarea
                id="checkout-notes"
                name="notes"
                className={textareaClass("min-h-24")}
              />
            </Field>
          </div>
        </fieldset>

        {/* Payment */}
        <fieldset className="rounded-4xl border-2 border-dashed border-honey-300 bg-honey-50/50 p-6 sm:p-8">
          <legend className="px-2 font-display text-lg font-semibold text-forest-800">
            Payment
          </legend>
          <div className="mt-4 flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-honey-500 text-white">
              <ShieldIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold text-forest-800">
                We take payment after we confirm your order
              </p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                Place your order here and {site.owner} will email you within one
                business day with a payment link and a pickup or delivery time.
                Nothing is charged now, and your card details are never entered on
                this site.
              </p>
              <p className="mt-3 text-[0.85rem] text-ink-muted">
                Prefer to pay by phone? Call {site.phone}.
              </p>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="space-y-4 lg:sticky lg:top-28">
        <OrderSummary showLines />
        <FormStatus status={status === "error" ? "error" : "idle"} message={message} />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-honey-500 py-4 text-base font-semibold text-white shadow-soft transition-all hover:bg-honey-600 hover:shadow-lift disabled:opacity-60"
        >
          {status === "submitting" ? "Placing your order…" : "Place order"}
        </button>
        <p className="text-center text-[0.8rem] leading-relaxed text-ink-muted">
          By placing an order you agree to be contacted about it. No card is
          charged at this step.
        </p>
      </div>
    </form>
  );
}
