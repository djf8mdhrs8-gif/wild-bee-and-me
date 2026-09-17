/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  THE MORE HAUS LOGO — the one file to change to put the real logo in.    │
 * │                                                                          │
 * │  1. Save the logo as SVG (preferred) or a transparent PNG at 2x into     │
 * │     /public/brand/  — e.g. /public/brand/more-haus.svg                   │
 * │  2. If the logo is dark lettering, also export an ivory version for use  │
 * │     over dark photographs, and set `srcOnDark`.                          │
 * │  3. Fill in `width` and `height` with the artwork's real dimensions so   │
 * │     the header reserves the right space and nothing shifts on load.      │
 * │                                                                          │
 * │  Until `src` is set, the site uses a plain letterspaced type wordmark.   │
 * │  That is deliberate: no attempt has been made to imitate or redraw the   │
 * │  handwritten logo. Nothing else in the design depends on this switch.    │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
export const brandLogo = {
  /** e.g. "/brand/more-haus.svg" */
  src: null as string | null,
  /** Ivory/reversed version, for use over dark photography. Falls back to `src`. */
  srcOnDark: null as string | null,
  /** Intrinsic dimensions of the artwork above. */
  width: 480,
  height: 120,
  /** Always describes the logo as a logo — it is the site's h1 on the homepage. */
  alt: "MORE HAUS",
};
