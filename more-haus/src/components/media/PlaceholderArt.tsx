import { cn } from "@/lib/cn";

/**
 * Stand-in artwork for a photograph that has not been supplied yet.
 *
 * Rather than filling the site with stock interiors — which would set entirely
 * the wrong aesthetic — each empty slot renders a quiet abstract composition in
 * the brand palette, captioned with the photograph that belongs there. The
 * composition is chosen deterministically from the caption, so the same slot
 * always looks the same and a page reads as a considered set rather than noise.
 *
 * The shapes are laid out with CSS rather than a fixed SVG viewBox: slots on
 * this site run from square thumbnails to 21:9 full-bleed plates, and a single
 * viewBox either crops a composition down to one flat field or stretches a
 * circle into a lozenge. Discs are sized from their height with `aspect-ratio`,
 * so they stay circular whatever shape the frame is.
 *
 * Every one of these disappears the moment a real `src` is added in the content
 * files. Nothing else changes.
 */

type Palette = {
  ground: string;
  shapeA: string;
  shapeB: string;
  line: string;
  /** Caption colour — must sit comfortably on `ground`. */
  ink: string;
};

const LIGHT_PALETTES: Palette[] = [
  { ground: "#E8E1D3", shapeA: "#B3BD83", shapeB: "#A89F90", line: "#2B1717", ink: "#2B1717" },
  { ground: "#EDE8DC", shapeA: "#A77A65", shapeB: "#C3BCAB", line: "#2B1717", ink: "#2B1717" },
  { ground: "#D6CFBD", shapeA: "#7E8A54", shapeB: "#F2EFE6", line: "#2B1717", ink: "#2B1717" },
  { ground: "#BDB6A5", shapeA: "#E8E1D3", shapeB: "#A77A65", line: "#2B1717", ink: "#2B1717" },
];

const DARK_PALETTES: Palette[] = [
  { ground: "#302C28", shapeA: "#7E8A54", shapeB: "#1E1717", line: "#F2EFE6", ink: "#E8E1D3" },
  { ground: "#2B1717", shapeA: "#A77A65", shapeB: "#453C34", line: "#F2EFE6", ink: "#E8E1D3" },
  { ground: "#3A342E", shapeA: "#B3BD83", shapeB: "#241C1C", line: "#F2EFE6", ink: "#E8E1D3" },
];

/** Stable small hash so a caption always yields the same composition. */
function hash(value: string): number {
  let total = 0;
  for (let i = 0; i < value.length; i += 1) {
    total = (total * 31 + value.charCodeAt(i)) % 100000;
  }
  return total;
}

/** A disc that stays circular at any frame proportion. */
function Disc({
  color,
  opacity,
  size,
  style,
}: {
  color: string;
  opacity: number;
  /** Height as a percentage of the frame; the width follows. */
  size: string;
  style: React.CSSProperties;
}) {
  return (
    <span
      className="absolute block rounded-full"
      style={{
        height: size,
        aspectRatio: "1 / 1",
        backgroundColor: color,
        opacity,
        ...style,
      }}
    />
  );
}

function Composition({ index, palette }: { index: number; palette: Palette }) {
  const { shapeA, shapeB, line } = palette;

  switch (index % 4) {
    case 0:
      // A low horizon with a disc sitting above it.
      return (
        <>
          <Disc color={shapeA} opacity={0.85} size="44%" style={{ right: "10%", top: "12%" }} />
          <span
            className="absolute inset-x-0 bottom-0 block"
            style={{ height: "34%", backgroundColor: shapeB, opacity: 0.7 }}
          />
          <span
            className="absolute inset-x-0 block"
            style={{ bottom: "34%", height: "1px", backgroundColor: line, opacity: 0.3 }}
          />
        </>
      );
    case 1:
      // A standing panel offset left, with a small disc dropped to the right.
      return (
        <>
          <span
            className="absolute block"
            style={{
              left: "9%",
              top: "10%",
              bottom: "0",
              width: "30%",
              backgroundColor: shapeA,
              opacity: 0.8,
            }}
          />
          <Disc color={shapeB} opacity={0.75} size="32%" style={{ right: "16%", bottom: "14%" }} />
          <span
            className="absolute inset-y-0 block"
            style={{ left: "39%", width: "1px", backgroundColor: line, opacity: 0.25 }}
          />
        </>
      );
    case 2:
      // Two planes overlapping, cut by a diagonal drawn as a gradient so it
      // stays a clean line at any proportion.
      return (
        <>
          <span
            className="absolute block"
            style={{
              left: "0",
              top: "16%",
              width: "58%",
              height: "62%",
              backgroundColor: shapeA,
              opacity: 0.75,
            }}
          />
          <span
            className="absolute block"
            style={{
              right: "0",
              bottom: "0",
              width: "52%",
              height: "58%",
              backgroundColor: shapeB,
              opacity: 0.7,
            }}
          />
          <span
            className="absolute inset-0 block"
            style={{
              backgroundImage: `linear-gradient(to top right, transparent calc(50% - 0.5px), ${line} 50%, transparent calc(50% + 0.5px))`,
              opacity: 0.22,
            }}
          />
        </>
      );
    default:
      // A wide band across the top with a large disc rising from below it.
      return (
        <>
          <span
            className="absolute inset-x-0 top-0 block"
            style={{ height: "18%", backgroundColor: shapeB, opacity: 0.75 }}
          />
          <Disc color={shapeA} opacity={0.72} size="50%" style={{ left: "8%", bottom: "-10%" }} />
          <span
            className="absolute inset-x-0 block"
            style={{ top: "18%", height: "1px", backgroundColor: line, opacity: 0.28 }}
          />
        </>
      );
  }
}

export function PlaceholderArt({
  /** The photograph that belongs in this slot — shown as the caption. */
  note,
  /** Falls back to the alt text when no note is given. */
  alt,
  dark = false,
  /** Hide the caption where it would crowd the composition. */
  showCaption = true,
  className,
}: {
  note?: string;
  alt?: string;
  dark?: boolean;
  showCaption?: boolean;
  className?: string;
}) {
  const caption = note ?? alt ?? "";
  const seed = hash(caption || "more haus");
  const palettes = dark ? DARK_PALETTES : LIGHT_PALETTES;
  const palette = palettes[seed % palettes.length];

  return (
    <div
      className={cn("grain absolute inset-0 overflow-hidden", className)}
      style={{ backgroundColor: palette.ground }}
      aria-hidden="true"
    >
      <Composition index={seed} palette={palette} />

      {showCaption && caption ? (
        <div className="absolute inset-x-0 bottom-0 flex items-end p-[clamp(0.9rem,2vw,1.75rem)]">
          <span
            className="label-sm max-w-[80%] opacity-65"
            style={{ color: palette.ink }}
          >
            {caption}
          </span>
        </div>
      ) : null}
    </div>
  );
}
