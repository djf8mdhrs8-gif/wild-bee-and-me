import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import {
  FLAT_SHIPPING_RATE,
  FREE_SHIPPING_THRESHOLD,
  TAX_RATE,
  findVariant,
} from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { clean, cleanMultiline, clientIp, isEmail, rateLimit } from "@/lib/validate";

export const runtime = "nodejs";

/* ---------------------------------------------------------------------------
 * PAYMENT — currently a manual-order flow, not a card charge.
 *
 * Placing an order here notifies the farm (email and/or webhook) and Ashley
 * follows up with a payment link. No card details ever touch this site.
 *
 * TO CONNECT REAL STRIPE CHECKOUT LATER:
 *   1. npm install stripe
 *   2. Set these in .env.local and in Vercel → Settings → Environment Variables:
 *        STRIPE_SECRET_KEY=sk_live_...
 *        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
 *   3. Replace the `notify(...)` call below with a Stripe Checkout Session,
 *      built from `pricedLines` (which is already server-verified):
 *
 *        import Stripe from "stripe";
 *        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *        const session = await stripe.checkout.sessions.create({
 *          mode: "payment",
 *          customer_email: customer.email,
 *          line_items: pricedLines.map((line) => ({
 *            quantity: line.quantity,
 *            price_data: {
 *              currency: "usd",
 *              unit_amount: line.unitPrice,           // already in cents
 *              product_data: { name: `${line.productName} — ${line.variantName}` },
 *            },
 *          })),
 *          shipping_options: shipping
 *            ? [{ shipping_rate_data: {
 *                  type: "fixed_amount",
 *                  fixed_amount: { amount: shipping, currency: "usd" },
 *                  display_name: "Standard shipping",
 *                } }]
 *            : undefined,
 *          success_url: `${origin}/checkout/success?ref={CHECKOUT_SESSION_ID}`,
 *          cancel_url: `${origin}/checkout`,
 *        });
 *        return NextResponse.json({ reference: session.id, url: session.url });
 *
 *   4. In src/components/shop/CheckoutForm.tsx, redirect to `data.url` instead
 *      of pushing to /checkout/success.
 *   5. Add a /api/stripe/webhook route for `checkout.session.completed` to
 *      record paid orders. See README → "Connecting Stripe later".
 *
 * Note on tax: TAX_RATE in src/lib/products.ts is a flat Florida rate. Stripe
 * Tax is the right answer once you ship out of state at volume.
 * ------------------------------------------------------------------------- */

type IncomingLine = { variantId?: unknown; quantity?: unknown };

/** Order reference like WB-8FK3QP — short enough to read over the phone. */
function orderReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  for (const byte of bytes) suffix += alphabet[byte % alphabet.length];
  return `WB-${suffix}`;
}

export async function POST(request: Request) {
  if (!rateLimit(`checkout:${clientIp(request)}`, 6, 60_000)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment, or call 239-600-1058." },
      { status: 429 },
    );
  }

  let payload: { customer?: Record<string, unknown>; lines?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawCustomer = payload.customer ?? {};
  const customer = {
    name: clean(rawCustomer.name, 120),
    email: clean(rawCustomer.email, 254),
    phone: clean(rawCustomer.phone, 40),
    fulfilment: clean(rawCustomer.fulfilment, 20) === "pickup" ? "pickup" : "ship",
    address1: clean(rawCustomer.address1, 200),
    address2: clean(rawCustomer.address2, 200),
    city: clean(rawCustomer.city, 100),
    state: clean(rawCustomer.state, 2).toUpperCase(),
    zip: clean(rawCustomer.zip, 12),
    notes: cleanMultiline(rawCustomer.notes, 2000),
  };

  if (!customer.name || !isEmail(customer.email) || !customer.phone) {
    return NextResponse.json(
      { error: "Please give us your name, a valid email and a phone number." },
      { status: 400 },
    );
  }

  const isShipping = customer.fulfilment === "ship";
  if (isShipping && (!customer.address1 || !customer.city || !customer.state || !customer.zip)) {
    return NextResponse.json(
      { error: "We need a full shipping address to post your order." },
      { status: 400 },
    );
  }

  if (!Array.isArray(payload.lines) || payload.lines.length === 0) {
    return NextResponse.json({ error: "Your basket is empty." }, { status: 400 });
  }

  // Re-price everything from the catalogue. Whatever the client sent as totals
  // is ignored — a tampered payload cannot change what an order costs.
  const pricedLines = (payload.lines as IncomingLine[]).flatMap((line) => {
    if (typeof line?.variantId !== "string") return [];
    const match = findVariant(line.variantId);
    if (!match || !match.variant.inStock) return [];

    const quantity = Math.min(
      20,
      Math.max(1, Math.round(Number(line.quantity) || 0)),
    );

    return [
      {
        variantId: match.variant.id,
        productName: match.product.name,
        variantName: match.variant.name,
        quantity,
        unitPrice: match.variant.price,
        lineTotal: match.variant.price * quantity,
      },
    ];
  });

  if (pricedLines.length === 0) {
    return NextResponse.json(
      { error: "We couldn't match those items. Please refresh and try again." },
      { status: 400 },
    );
  }

  const subtotal = pricedLines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping =
    !isShipping || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  const reference = orderReference();

  const deliveryValue = isShipping
    ? [
        customer.address1,
        customer.address2,
        `${customer.city}, ${customer.state} ${customer.zip}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "LOCAL PICKUP — arrange a time in Alva";

  await notify({
    kind: "order",
    subject: `New order ${reference} — ${customer.name} (${formatPrice(total)})`,
    fields: [
      { label: "Reference", value: reference },
      { label: "Name", value: customer.name },
      { label: "Email", value: customer.email },
      { label: "Phone", value: customer.phone },
      { label: "Fulfilment", value: isShipping ? "Ship" : "Local pickup" },
      { label: "Delivery", value: deliveryValue },
      {
        label: "Items",
        value: pricedLines
          .map(
            (line) =>
              `${line.quantity} × ${line.productName} — ${line.variantName} @ ${formatPrice(
                line.unitPrice,
              )} = ${formatPrice(line.lineTotal)}`,
          )
          .join("\n"),
      },
      { label: "Subtotal", value: formatPrice(subtotal) },
      { label: "Shipping", value: shipping === 0 ? "Free" : formatPrice(shipping) },
      { label: "Sales tax", value: formatPrice(tax) },
      { label: "TOTAL DUE", value: formatPrice(total) },
      { label: "Notes", value: customer.notes || "None" },
      {
        label: "Payment",
        value: "NOT CHARGED — send the customer a payment link to collect.",
      },
    ],
  });

  return NextResponse.json({
    reference,
    totals: { subtotal, shipping, tax, total },
  });
}
