# MORE HAUS — design system

The decisions the site is built on. Read this before changing layout or type.

---

## 1. Site architecture

```
/                       Home — the full brand argument in eight movements
/projects               Portfolio index, asymmetric editorial layout
/projects/[slug]        Case study: hero, facts, story, magazine gallery, next project
/design-services        Four service tiers, alternating image/text
/collection             Shop — filterable, sold pieces kept visible
/collection/[slug]      Piece: gallery, detail, pickup/delivery, inquiry
/home-edit              The monthly market: next edit, schedule, archive
/about                  Founder story, philosophy, service area
/contact                Design inquiry form
404 / error / loading   Handled in the brand voice
```

Supporting routes: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`,
`/opengraph-image`, `/api/inquiry`, `/api/newsletter`, `/api/calendar/[id]`.

---

## 2. Visual principles

1. **Photography is the design.** Type and space arrange it; nothing else
   competes with it.
2. **No cards.** No rounded rectangles, no drop shadows, no pill buttons, no
   boxed sections. Hierarchy comes from scale, weight, position and air.
3. **Asymmetry by default.** Content sits in columns 1–7 or 6–12, rarely
   1–12, and almost never centered.
4. **One idea per screen.** Sections are tall and calm rather than dense.
5. **Colour blocking once.** Olive is used at full strength for The Home Edit
   and nowhere else, which makes the market read as a thing of its own.
6. **Motion you notice only if you look for it.** One reveal, one drift, slow
   crops on hover. Nothing bounces, nothing staggers into place letter by
   letter.

---

## 3. Colour

Defined once as tokens in `src/app/globals.css` under `@theme`. Tailwind
generates `bg-*`, `text-*` and `border-*` utilities from them.

| Token | Value | Role |
| --- | --- | --- |
| `ivory` | `#F2EFE6` | Page ground. Never pure white. |
| `linen` | `#EDE8DC` | Half-step, for quiet banding between sections |
| `parchment` | `#E8E1D3` | Recessed panels, image mats, type on dark grounds |
| `olive` | `#B3BD83` | The logo green. The Home Edit block; accents on dark |
| `olive-soft` | `#C7CF9F` | Tint |
| `olive-deep` | `#7E8A54` | Accessible olive for type and focus rings on light |
| `clay` | `#A77A65` | Dusty terracotta. One accent per page at most; form errors |
| `clay-soft` | `#C19A86` | Tint |
| `espresso` | `#2B1717` | Primary ink, from the logo lettering. Never pure black |
| `charcoal` | `#302C28` | Secondary dark ground |
| `smoke` | `#5A5249` | Muted body copy — 6.3:1 on ivory |
| `mushroom` | `#A89F90` | Hairlines and captions on dark only — too low-contrast for body text |

**Contrast that has been checked:** espresso on ivory 14:1; smoke on ivory
6.3:1; olive on espresso 8.2:1; espresso on olive 8.2:1. Olive on ivory is
1.7:1 and is therefore **decorative only** — never set type in it on a light
ground.

---

## 4. Typography

Two families, loaded through `next/font` and self-hosted.

**Instrument Serif** — display. High contrast, a genuinely good italic, and
not the serif every design studio is using. Weight 400 only, roman and italic.

**Jost** — everything else. Geometric, quiet, and excellent letterspaced small
and uppercase. Variable weight; the site uses 300 for body and 400 for labels.

The handwritten logo is used **only as the logo**. It never becomes a
typeface for headings.

| Class | Size | Use |
| --- | --- | --- |
| `.display-xl` | `clamp(3.25rem, 10.5vw, 10.5rem)` | Hero statements. Once per page |
| `.display-lg` | `clamp(2.5rem, 6.8vw, 6rem)` | Page titles, major statements |
| `.display-md` | `clamp(2rem, 4.4vw, 3.5rem)` | Section headings |
| `.display-sm` | `clamp(1.5rem, 2.6vw, 2.125rem)` | Sub-headings, project titles |
| `.lede` | `clamp(1.06rem, 1.5vw, 1.375rem)` | Standfirst paragraphs |
| `.body-lg` | `1.0625rem / 1.8` | Body copy |
| `.label` | `0.6875rem`, `0.24em` tracking, uppercase | Navigation, eyebrows, meta, buttons |
| `.label-sm` | `0.625rem`, `0.26em` tracking, uppercase | Captions, numerals, fine print |
| `.aside-italic` | Instrument Serif italic | One or two words inside a headline. Never a paragraph |

Display sizes are tracked tight (`-0.015em` to `-0.025em`) and set at
`line-height: 0.9–1.05`. Labels are tracked wide. That contrast — very tight
versus very loose — is most of the site's typographic character.

---

## 5. Layout

- `.wrap` — max `96rem`, side padding `clamp(1.25rem, 5vw, 5.5rem)`.
- `.wrap-narrow` — max `60rem`, for reading columns.
- `.bleed` — escapes a wrap back to the viewport edge for full-bleed plates.
- Desktop grids are 12 columns. Section rhythm is `clamp(5rem, 13vw, 11rem)`
  vertical padding.
- Offsets use `vw` (`lg:mt-[9vw]`) so the composition holds its proportions
  across screen sizes instead of collapsing at one breakpoint.

---

## 6. Components

```
site/       Header, MobileMenu, Footer, Wordmark
media/      EditorialImage, PlaceholderArt
motion/     Reveal, Parallax
ui/         PageHeader, Eyebrow, ArrowLink, Field, InquiryBanner
home/       Hero, Introduction, FeaturedProjects, Philosophy,
            CollectionPreview, HomeEditFeature, AboutPreview, JournalGallery
projects/   ProjectTile, ProjectGallery
collection/ ProductCard, ProductGallery, CollectionBrowser
home-edit/  EditDateStack, AddToCalendar
forms/      InquiryForm, NewsletterForm
```

Three of these carry most of the weight:

**`EditorialImage`** — every photograph goes through it. It fills its parent,
so the parent owns the crop: put `.frame` and an aspect class on the wrapper.
With no `src` it renders `PlaceholderArt` instead, so layouts are final before
any photography exists.

**`Reveal`** — the one scroll animation. It uses a shared scroll listener that
checks each block's *position* rather than an IntersectionObserver, because an
observer only fires on a crossing: anything the page jumps past (restored
scroll position, an in-page anchor, End on the keyboard) would never receive
its callback and would stay invisible. See `src/lib/useReveal.ts`.

**`Wordmark`** — the single place the logo lives. See `src/content/brand.ts`.

---

## 7. Motion

| Where | What | Duration |
| --- | --- | --- |
| Hero entrance | CSS `rise-in` / `fade-in`, staggered 0.15–0.85s | 1.1s |
| Blocks arriving | Opacity 0→1, `translateY(28px)`→0 | 1s |
| Image hover | `scale(1.04)` inside a fixed frame | 1.2s |
| Philosophy / About hero | Parallax drift, 7–9% of frame height | scroll-linked |
| Link hover | Rule sweeps out right and back in from the left | 0.7s |
| Header ground | Transparent → ivory past 24px of scroll | 0.7s |
| Mobile menu | Fade, links staggered 50ms apart | 0.7s |

Easing is `cubic-bezier(0.22, 1, 0.36, 1)` everywhere.

**The hero entrance is CSS, not JavaScript**, deliberately: the headline is the
largest-contentful paint and must not wait for hydration to become visible.

**`prefers-reduced-motion: reduce`** is a hard stop — all durations collapse to
`0.001ms`, smooth scrolling is disabled, and `.motion-reveal` is forced to full
opacity with no offset so nothing can be stranded invisible.

---

## 8. Homepage composition

**Desktop**

| # | Section | Ground | Composition |
| --- | --- | --- | --- |
| 1 | Hero | Dark photograph | 92svh, statement bottom-left, nav over the image, scroll cue |
| 2 | Introduction | Ivory | Labels in cols 1–3, statement and two columns of copy in 5–12 |
| 3 | Featured projects | Ivory | Large landscape (1–8), small portrait dropped 9vw (10–12), full-bleed plate, then a pair with the second dropped 7vw |
| 4 | Philosophy | Espresso | Full-bleed, parallax image at 45%, oversized statement with an olive italic |
| 5 | Collection | Linen | Horizontal rail running off the right edge, alternating heights |
| 6 | The Home Edit | **Olive** | The one colour block. Huge date numeral, next three dates, signup |
| 7 | About | Ivory | Portrait in 1–5, type in 7–12 |
| 8 | Journal | Parchment | Loose 12-column grid, per-slot spans and offsets, gaps left in |
| 9 | Footer | Espresso | Wordmark at display size, four columns, newsletter on a rule |

**Mobile (not a shrunk desktop)**

- Hero keeps full height; the headline drops to ~3rem and the right-hand
  descriptor is removed rather than squeezed.
- Projects stack full-width with alternating aspect ratios; the `vw` offsets
  fall away below `lg`.
- The collection rail becomes a natural swipe — it is the same component, and
  it is the reason the rail exists.
- The Home Edit date stack and copy stack vertically; the date stays oversized.
- Journal becomes a 2-column grid.
- Navigation is a full-screen ivory overlay with links at display size,
  Escape to close, focus trapped, body scroll locked.
- The collection index is 2-up on phones — deliberate, because most visitors
  arrive from Instagram and are scanning.

---

## 9. Content architecture

Everything displayed comes from `src/content/`, typed in `types.ts`:

| File | Model |
| --- | --- |
| `projects.ts` | `Project` — title, location, type, year, summary, description[], cover, gallery[], pullQuote, featured |
| `products.ts` | `Product` — title, category, price, dimensions, condition, description, materials, provenance, images[], status, featured, pickup, delivery |
| `home-edit.ts` | `HomeEditEvent` — id, date, startTime, endTime, title, location, description, image, status |
| `services.ts` | `Service` — title, summary, description[], includes[], bestFor, image |
| `about.ts` | Founder statement, biography, philosophy, imagery |
| `journal.ts` | The homepage gallery |
| `site.ts` | Studio details, navigation, fulfilment defaults |
| `brand.ts` | The logo |

Components never import those files directly — they call accessors in
`src/lib/content.ts`. Moving to a headless CMS later means rewriting that one
file.

**Home Edit dates are derived, not flagged.** `getNextEdit()` compares ISO date
strings against today in `America/New_York`, so an edit moves itself from
"next" to the archive at midnight on the day after it happens. Add a year of
dates at once and never touch it again. The pages that show a date carry
`export const revalidate = 3600`, so a static build stays current.
