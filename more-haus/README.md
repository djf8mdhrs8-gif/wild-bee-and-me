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

### Share cards

Every project and every piece has its own card for when a link is posted to
Instagram, Facebook or iMessage — the piece's name, price and availability, or
the project's name and location, set in the brand faces on the espresso ground.
They are generated, so a new piece gets one the moment it is added; there is
nothing to design or upload.

The two fonts they use live in `assets/` as TTFs. That is deliberate and they
should not be deleted: the card renderer has no system fonts and cannot read
the WOFF2 files the site itself uses, so without them the cards fall back to a
generic sans.

Once real photography exists you may prefer the actual photograph on the card.
That is a change to the two `opengraph-image.tsx` files and nothing else.

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

**Both endpoints turn away automated submissions before anything is
forwarded**, which matters because a public contact form collects spam from the
day it goes live:

- A **honeypot field** no person can see or tab to. Anything that fills it in
  is not a person.
- A **timing check** — a submission arriving within three seconds of the form
  loading did not involve reading it.
- Only the **fields the form defines** are relayed onward, each capped in
  length, and a body over 16 KB is refused outright. Nothing unexpected reaches
  whatever service is on the other end of the webhook.

Automated submissions get exactly the same reply as a real one and are simply
not forwarded — telling a spammer why it failed only tells them what to change.
If you ever wonder why a submission did not arrive, `delivered: false` in the
server log is the thing to look for.

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

### Cancel a Home Edit

Change its `status` to `"cancelled"`. It disappears from the site completely —
it will not be headlined, listed, offered as a calendar download, or filed in
the archive afterwards. Leave the entry in the file; it is the record of what
was planned.

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

Three behaviours worth knowing, each of them tested by moving the dates around
and rebuilding:

- **An edit stays "next" all through its own day**, so someone checking their
  phone on the morning of the market still sees it, with directions and hours.
  It moves to the archive overnight.
- **If you run out of dates**, nothing breaks and nothing looks empty: the
  homepage and the Home Edit page both say the next date is being set and show
  the email signup instead. The upcoming schedule section hides itself and the
  search-engine event listing is withdrawn.
- **The archive builds itself** from dates that have passed, newest first.

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

Verified in a real browser against a production build, at 1440px, 834px and 390px:

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
- Under `prefers-reduced-motion: reduce`, no content is left hidden; parallax
  stays still and reveals stay visible.
- Home Edit date handling, by moving the dates and rebuilding: an edit on
  today's date still shows as next, yesterday's has already moved to the
  archive, and a schedule with nothing left falls back gracefully everywhere.
- Product gallery: thumbnails swap the main plate, work from the keyboard, are
  marked with `aria-current`, and are not rendered at all for a piece with one
  photograph. Sold pieces offer "ask for something similar" rather than a buy
  button.
- The mobile menu opens, staggers, traps focus, reopens correctly after
  closing, and unmounts only once its exit transition has finished.
- Structured data is escaped before it reaches the page, so content containing
  `</script>` cannot break out of the tag. Confirmed by putting a payload in an
  event description and checking it no longer executes.
- The calendar file round-trips a torture string — semicolons, commas,
  backslashes, an em-dash and a description long enough to need folding —
  through a conforming unfold-and-unescape, with every line inside the 75-octet
  limit RFC 5545 sets.
- Form abuse handling: honeypot and instant submissions are accepted politely
  and not forwarded, unknown fields are dropped, an oversized body is refused,
  and a long but plausible message still gets through. A real person filling in
  the real form still succeeds, the honeypot never takes keyboard focus across
  45 tab presses, and it stays out of the accessibility tree.
- All 17 share cards render, at 1200×630, in the brand faces.
- A visible focus ring on every input, textarea and select.
- With JavaScript disabled, every page renders its content in full.
- Closing the mobile menu returns focus to the button that opened it.
- A cancelled Home Edit disappears from the site: the next edit rolls forward,
  the calendar link goes, and the search-engine listing follows.
- A piece added with no photographs yet renders rather than breaking the build.
- The calendar file carries a `VTIMEZONE`, as RFC 5545 requires alongside a
  named `TZID`.
- Tablet has its own layout tier rather than the phone stack: at 834px the
  projects index is 2618px tall rather than 5896px, and the collection is
  three across.

Measured on a throttled phone (4× CPU slowdown, 4G, 390px viewport), which is
roughly what Instagram traffic looks like:

| Page | LCP | CLS | JS transferred |
| --- | --- | --- | --- |
| Home | 812ms | 0 | 145 KB |
| The Collection | 668ms | 0 | 150 KB |
| Project case study | 628ms | 0 | 145 KB |
| The Home Edit | 644ms | 0 | 145 KB |

Google's "good" threshold is 2500ms for LCP and 0.1 for CLS. LCP and FCP are
the same number on every page, which is the CSS-rather-than-JavaScript hero
entrance doing its job — the headline paints with the document instead of
waiting for hydration. CLS is zero because every image sits in a frame with a
declared aspect ratio, so nothing reflows as photography loads.

These numbers are from placeholder artwork. Real photography will add weight;
`next/image` will resize and serve AVIF/WebP, but keep an eye on LCP once the
hero image is real.

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
