# MORE HAUS

Interior design studio, curated furniture collection, and The Home Edit —
Southwest Florida.

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

`DESIGN.md` documents the design system — palette, type scale, layout grammar,
motion and the homepage composition. Read it before changing layout.

---

## Before this goes live

Five things, in order. Each is a single file.

### 1. The logo — `src/content/brand.ts`

Right now the site uses a plain letterspaced serif wordmark as a stand-in. **No
attempt has been made to imitate or redraw the handwritten MORE HAUS logo**, and
nothing in the design depends on the stand-in.

1. Save the logo as SVG (preferred) or a transparent PNG at 2× into
   `public/brand/` — e.g. `public/brand/more-haus.svg`.
2. If the logo is dark lettering, export an ivory version too, for use over
   dark photography.
3. Fill in `brand.ts`:

```ts
export const brandLogo = {
  src: "/brand/more-haus.svg",
  srcOnDark: "/brand/more-haus-ivory.svg",
  width: 480,   // the artwork's real dimensions, so nothing shifts on load
  height: 120,
  alt: "MORE HAUS",
};
```

That is the whole change. The header, footer and mobile menu pick it up.

Also replace `src/app/icon.svg` — a placeholder mark — with a favicon cropped
from the real logo.

### 2. Studio details — `src/content/site.ts`

Everything marked `PLACEHOLDER`: the domain, email, phone, street address and
social handles. They feed the header, footer, contact page and search metadata
from this one file.

The studio address also appears in `src/content/home-edit.ts` (the `studio`
constant at the top).

### 3. Photography — `public/images/`

Every image slot currently renders a captioned placeholder describing the
photograph that belongs there. To replace one, drop the file in and point at it:

```ts
cover: {
  src: "/images/projects/mcgregor-hero.jpg",
  alt: "Living room with dark heart pine floors and a low linen sofa",
  ratio: "landscape",
},
```

Suggested structure:

```
public/images/
  projects/     project photography
  collection/   furniture and objects
  home-edit/    market days, past and present
  about/        portrait, lifestyle, sourcing
  journal/      the homepage gallery
```

**Alt text is not optional.** It is read aloud by screen readers and indexed by
search. Describe what is in the photograph, not "image of sofa".

Images are served through `next/image`, which resizes them and serves AVIF or
WebP automatically. Upload the largest version you have — around 2400px on the
long edge is plenty — and let it do the work. If photography ever moves to a
CDN, add the hostname to `images.remotePatterns` in `next.config.ts`.

### 4. Where the forms send — environment variables

**Until these are set, inquiries and signups are written to the server log and
reach nobody.** Copy `.env.example` to `.env.local` for development, and set
the same variables on the host for production.

| Variable | What it does |
| --- | --- |
| `INQUIRY_WEBHOOK_URL` | Every contact-form submission is POSTed here as JSON |
| `NEWSLETTER_WEBHOOK_URL` | Every newsletter signup is POSTed here as JSON |

Either can point at a form service (Formspark, Basin), an email relay (Resend,
Postmark), an automation hook (Zapier, Make), a mailing list provider
(Flodesk, Mailchimp, Klaviyo) or a CRM. The API responses include
`delivered: true | false` so a misconfiguration is visible rather than silent.

### 5. Replace the placeholder copy

Written in the MORE HAUS voice and shaped correctly — right length, right
rhythm — so it can be replaced line for line. Search the repo for
`PLACEHOLDER`:

- `src/content/about.ts` — **no biographical details have been invented.** The
  founder's name, role, biography and philosophy are all stand-ins.
- `src/content/projects.ts` — project stories.
- `src/content/products.ts` — the twelve example pieces.

---

## Day-to-day editing

Nothing below needs a developer.

### Add a piece to the collection

`src/content/products.ts`. Copy an existing block, change the fields, add the
photographs. Categories are fixed: Seating, Tables, Storage, Lighting, Decor,
Art, Outdoor. Set `featured: true` to put it on the homepage rail.

Prices are whole dollars (`2400`), or `null` for "price on request".

### Mark something sold

Change `status` to `"Sold"`.

**Sold pieces deliberately stay on the site** — they are the clearest record of
what the studio sources. They keep their price and get a quiet SOLD mark, and
their page turns into "ask for something similar". Shoppers who only want what
is buyable can tick **Hide sold items** on the collection page.

The other states are `"Available"`, `"Pending"` and `"Coming Soon"`.

### Add Home Edit dates

`src/content/home-edit.ts` — **the only file you touch for dates.**

```ts
{
  id: "2027-02-20",
  date: "2027-02-20",      // YYYY-MM-DD
  startTime: "10:00",      // 24-hour, so 3 PM is "15:00"
  endTime: "15:00",
  title: "The Home Edit",  // or name a seasonal one: "The Holiday Edit"
  location: studio,
  description: "What will be on the floor.",
  status: "scheduled",
},
```

The site works out which edit is next from today's date in Eastern Time, so you
can add a year at once. **Past dates move themselves into the archive** —
nothing to delete, nothing to reorder. Every listed date gets a working "add to
calendar" for Google, Apple and Outlook automatically.

### Add a project

`src/content/projects.ts`. The case study page, the portfolio layout and the
next-project link all build themselves from it. `featured: true` puts it on the
homepage; the first five featured projects fill the composition there.

The `slug` becomes the URL — set it once and do not change it afterwards, or
existing links break.

### Change a service, or the navigation

`src/content/services.ts` and the `navigation` array in `src/content/site.ts`.
Both pages adapt to whatever is in them.

---

## What has been checked

Verified in a real browser against a production build, at 1440px and 390px:

- Build, TypeScript and ESLint all clean.
- Collection filtering, hide-sold, and the empty state.
- `.ics` download carries the right date and timezone; unknown dates 404.
- Contact form: required fields, email format, focus moving to the first
  problem, and the success state. Product pages pre-fill it.
- Newsletter endpoint rejects bad addresses and reports undelivered signups.
- Mobile menu: opens, traps focus, closes on Escape, on navigation and on the
  browser back button, and restores page scrolling.
- Every page has exactly one `<h1>`, no skipped heading levels, no unlabelled
  form controls, no images without alt text, and a description and OG title.
- First tab stop is the skip link.
- Under `prefers-reduced-motion: reduce`, no content is left hidden.

Not yet possible to check: anything depending on the real logo, real
photography or a live form endpoint.

---

## Deployment

Any host that runs Next.js 16. On Vercel it is zero-config; set the two
webhook variables in the project settings. Elsewhere, `npm run build` then
`npm start` behind a reverse proxy.

Set `site.url` in `src/content/site.ts` to the live domain before deploying —
canonical URLs, the sitemap, OpenGraph tags and the calendar links all derive
from it.
