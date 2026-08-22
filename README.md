# The Wild Bee & Me

Production website for **The Wild Bee & Me** (More Chaos Farm) — humane live bee
removal across Lee, Charlotte and Hendry Counties, Florida, plus a shop for raw
local honey, herbal salves and tallow skin care.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Framer
Motion. Designed to deploy to Vercel with no additional configuration.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

Everything works with an empty `.env.local` — form submissions are logged to the
server console rather than delivered. See [Environment variables](#environment-variables).

### Scripts

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Dev server with hot reload                    |
| `npm run build` | Production build (type-checks as it goes)     |
| `npm start`     | Serve the production build locally            |
| `npm run lint`  | ESLint, including the React Compiler rules    |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root layout: fonts, metadata, providers, LocalBusiness JSON-LD
│   ├── page.tsx                Home
│   ├── bee-removal/            Service page + request form + service-area list
│   ├── shop/                   Product grid
│   │   └── [slug]/             Product detail (statically generated per product)
│   ├── cart/                   Full basket page
│   ├── checkout/               Checkout form
│   │   └── success/            Order confirmation
│   ├── about/  contact/  faq/  Content pages
│   ├── api/
│   │   ├── removal-request/    Bee-removal form (multipart, accepts photos)
│   │   ├── contact/            Contact form
│   │   ├── newsletter/         "Join the Hive" signup
│   │   └── checkout/           Order submission  ← Stripe goes here later
│   ├── sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx
│   ├── not-found.tsx  loading.tsx  globals.css
│
├── components/
│   ├── site/                   Header, Footer, sticky call bar & floating CTA
│   ├── home/                   Hero, trust badges, showcase, testimonials, newsletter, FAQ
│   ├── shop/                   Cards, product detail, cart drawer, checkout form
│   ├── removal/                Bee-removal request form
│   ├── contact/                Contact form
│   └── ui/                     Buttons, sections, accordion, icons, fields, product art
│
└── lib/
    ├── site.ts                 ★ Business facts: phone, address, hours, socials
    ├── products.ts             ★ Product catalogue, prices, fulfilment
    ├── content.ts              ★ FAQs, testimonials, service area, process, values
    ├── cart.tsx                Cart store (useSyncExternalStore + localStorage)
    ├── schema.ts               JSON-LD builders (LocalBusiness, Service, Product, FAQ)
    ├── notify.ts               Email + webhook delivery for form submissions
    ├── validate.ts             Input sanitising and rate limiting
    └── format.ts               Currency formatting, class-name helper

★ = the three files you'll edit most. Nearly all copy, pricing and business
    detail lives in these, not in components.
```

---

## Editing the site

### Phone, address, hours, social links

All in **`src/lib/site.ts`**. Change once and it updates the header, footer,
every call button, the contact page and the structured data.

The Instagram and Facebook URLs are **placeholders** (`/thewildbeeandme`) —
update `site.social` with the real handles.

### Products and prices

**`src/lib/products.ts`**. Prices are stored **in cents** (`1200` = $12.00) so
cart maths stays exact.

Also in that file: `LOCAL_DELIVERY_RADIUS_MILES = 30`.

**Every option listed is one a customer can actually order.** The catalogue
deliberately mirrors what the business sells today — one option per product —
rather than padding it with sizes or scents that do not exist. Add new ones only
when they are real.

Adding a product: append to the `products` array and give it a unique `slug`.
Its page, sitemap entry and Product schema are all generated automatically.

### FAQs, testimonials, service area

**`src/lib/content.ts`**. The FAQ list also drives the FAQPage structured data,
so answers added there become eligible for rich results in Google.

**A note on accuracy.** The copy across this site is written to match what the
business has actually published — the products and prices it sells, the "two to
four hours" a removal takes, honey "never heated above 95°F", pickup and local
delivery rather than shipping, and "licensed beekeeper" (not insured). The
customer testimonials are reproduced as they were given. If you change a claim
here, make sure it is one the business can stand behind.

---

## Images

The site ships with **illustrated SVG placeholders**, not stock photos —
on-brand honey jars, salve tins and farm scenes drawn in the brand palette. They
look intentional rather than "image missing", and swapping in real photography
is a one-line change per product.

**To use real photos:**

1. Drop files into `public/images/products/`.
2. Reference them in `src/lib/products.ts`:

```ts
{
  slug: "raw-local-honey",
  image: "/images/products/honey-hero.jpg",        // main product photo
  gallery: ["/images/products/honey-lifestyle.jpg"],
  variants: [
    { id: "honey-8oz", image: "/images/products/honey-8oz.jpg", /* … */ },
  ],
}
```

Anything with an `image` renders through `next/image` (lazy-loaded, responsive,
auto WebP/AVIF). Anything without falls back to the illustration.

Recommended: square-ish product shots, at least 1200 × 1200.

Two larger illustrations — the farm vignette on the home page and the beekeeper
portrait on the About page — are inline SVG inside
`src/components/home/AboutPreview.tsx` and `src/app/about/page.tsx`. Each is
marked with a comment; replace the `<svg>` block with a `next/image` when real
photos of Ashley and the hives are available.

---

## Environment variables

Full documentation lives in **`.env.example`**. Summary:

| Variable                             | Required | Purpose                                          |
| ------------------------------------ | -------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`               | Before launch | Canonical URLs, OG tags, sitemap, schema    |
| `RESEND_API_KEY`                     | Optional | Email delivery of form submissions               |
| `NOTIFY_TO_EMAIL`                    | Optional | Who receives notifications                       |
| `NOTIFY_FROM_EMAIL`                  | Optional | Verified sending address                         |
| `NOTIFY_WEBHOOK_URL`                 | Optional | JSON POST to Zapier / Make / Slack / n8n         |
| `STRIPE_SECRET_KEY`                  | Not yet  | Placeholder — see below                          |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Not yet  | Placeholder — see below                          |
| `STRIPE_WEBHOOK_SECRET`              | Not yet  | Placeholder — see below                          |

**With nothing configured, submissions are printed to the server console and the
form still reports success to the visitor.** That keeps the site deployable
before any accounts exist — but set up email or a webhook before launch, or real
enquiries will be lost.

`NOTIFY_TO_EMAIL` is where submissions are delivered internally. It is separate
from `site.email` in `src/lib/site.ts`, which is the address shown publicly on
the site — that one is intentionally blank, because the business does not
publish an email address yet. Set it and it appears in the footer, on the
contact page and in the structured data automatically.

---

## How the shop works today

The shop is **fully built** — cart state, quantities, a slide-out cart drawer, a
full basket page, and a complete checkout with pickup or local-delivery
selection and order notes.

**There is no shipping, and no payment processor.** Both are deliberate, and both
match how the business actually operates today:

- **Fulfilment** is free pickup from the farm in Alva, or local delivery within
  30 miles. Shipping is "coming soon" — when it launches, add carrier rates in
  `src/app/api/checkout/route.ts` and update the FAQ answer in
  `src/lib/content.ts`.
- **Payment** runs a *manual order flow*:

1. Customer fills in contact and fulfilment details and places the order.
2. `POST /api/checkout` **re-prices every line from the catalogue server-side**
   (a tampered payload cannot change what an order costs), assigns a short
   reference like `WB-8FK3QP`, and sends the farm an email/webhook with the full
   order breakdown.
3. The customer lands on a confirmation page saying nothing has been charged.
4. Ashley emails a payment link and arranges pickup or delivery.

No card details are ever entered on the site, so there is no PCI surface. There
is also no sales-tax line — the order total is simply the goods, and Ashley
confirms the final amount.

### Connecting Stripe later

The exact code to write is in a comment block at the top of
**`src/app/api/checkout/route.ts`**. In short:

1. `npm install stripe`
2. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in
   `.env.local` and in Vercel.
3. In `src/app/api/checkout/route.ts`, replace the `notify(...)` call with a
   `stripe.checkout.sessions.create(...)` built from `pricedLines` — that array
   is already server-verified and priced in cents, which is exactly what Stripe
   wants. Return `{ reference: session.id, url: session.url }`.
4. In `src/components/shop/CheckoutForm.tsx`, redirect to `data.url` instead of
   pushing to `/checkout/success`.
5. Add `src/app/api/stripe/webhook/route.ts` handling `checkout.session.completed`
   to record paid orders, verified with `STRIPE_WEBHOOK_SECRET`.
6. Update the "Payment" fieldset copy in `CheckoutForm.tsx` — it currently
   explains the manual flow.

If shipping is added at the same time, use Stripe's `shipping_options` and
Stripe Tax rather than hardcoding rates.

## Deploying to Vercel

### First deploy

1. Push this repository to GitHub.
2. At <https://vercel.com/new>, import the repo. Vercel detects Next.js — leave
   every build setting on its default.
3. Add environment variables (Settings → Environment Variables), at minimum
   `NEXT_PUBLIC_SITE_URL`.
4. Deploy.

### Custom domain

1. Vercel → Project → Settings → Domains → add the domain.
2. Point the registrar's DNS at Vercel (an `A` record to `76.76.21.21`, or a
   `CNAME` to `cname.vercel-dns.com` for `www`).
3. **Update `NEXT_PUBLIC_SITE_URL` to the live domain and redeploy** — canonical
   tags, the sitemap and the structured data all read from it.

### After launch

- Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
- Create a Google Business Profile for Alva, FL — for "bee removal Fort Myers"
  and similar local searches this matters more than anything on the site.
- Test the structured data at <https://search.google.com/test/rich-results>.

---

## SEO

- Per-page titles, descriptions, keywords, canonicals and Open Graph tags.
- A generated 1200×630 social share card (`src/app/opengraph-image.tsx`).
- Structured data: `LocalBusiness` (with geo, hours, service area and reviews)
  site-wide, `Service` on the removal page, `Product` with `AggregateOffer` on
  every shop page, `FAQPage`, and `BreadcrumbList`.
- `sitemap.xml` and `robots.txt` generated at build time; `/cart`, `/checkout`
  and `/api/*` are excluded from indexing.
- Target keywords are woven into real copy — "bee removal Alva FL", "bee removal
  Fort Myers", "bee removal Cape Coral", "live bee removal Southwest Florida",
  "raw honey Alva FL", "raw local honey Florida", "herbal salves Florida",
  "tallow skincare natural" — along with the named cities in each county.

---

## Design and accessibility notes

**One polished light theme, no dark mode.** The brand is honey gold, deep
forest, cream and warm brown — a dark inversion would fight it. The palette is
defined once as Tailwind v4 tokens in `src/app/globals.css` under `@theme`.
(Tailwind v4 is CSS-first: there is no `tailwind.config.js`.)

Fonts: **Fraunces** for display, **Inter** for body, both self-hosted via
`next/font` so there is no layout shift and no external request.

- Semantic landmarks, a skip link, and labelled form controls throughout.
- Visible focus rings on every interactive element.
- Colour contrast meets WCAG AA for body text.
- Every animation is gated behind `prefers-reduced-motion`.
- The accordion, cart drawer and testimonial carousel are keyboard-operable,
  with `aria-expanded`, `aria-controls` and live regions where appropriate.

### Performance

- Almost every route is statically prerendered at build time.
- Client JavaScript is limited to components that genuinely need interactivity;
  icons are inline SVG, so the icon set costs nothing at runtime.
- Images go through `next/image` with lazy loading and responsive `sizes`.
- Scroll listeners are passive; scroll-triggered animations fire once.

---

## Form protection

Each API route has a honeypot field and a small in-memory rate limiter
(`src/lib/validate.ts`). That is enough for casual spam. If it ever gets
targeted, put Vercel WAF in front or move the limiter to Upstash Redis —
in-memory counters do not coordinate across serverless instances.
