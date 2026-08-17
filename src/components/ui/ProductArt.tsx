import Image from "next/image";
import { cn } from "@/lib/format";

/**
 * Product imagery.
 *
 * When a product/variant has an `image` path, a real optimised photo renders.
 * Otherwise this draws an on-brand illustrated vessel — good enough to launch
 * with, and swapping in photography is a one-line data change.
 */

export type ArtTheme = "honey" | "salve" | "balm";

const themes: Record<
  ArtTheme,
  { from: string; to: string; body: string; bodyDark: string; lid: string; label: string }
> = {
  honey: {
    from: "#fdf3dc",
    to: "#f6dfae",
    body: "#e0a52c",
    bodyDark: "#c8871b",
    lid: "#7f5210",
    label: "#fdfbf5",
  },
  salve: {
    from: "#eef4ef",
    to: "#d5e4d9",
    body: "#5f8570",
    bodyDark: "#3e6250",
    lid: "#2c4a3b",
    label: "#fdfbf5",
  },
  balm: {
    from: "#faf1e6",
    to: "#eddbc3",
    body: "#b98a5c",
    bodyDark: "#8d6844",
    lid: "#6b4a2e",
    label: "#fdfbf5",
  },
};

function HoneyJar({ theme }: { theme: (typeof themes)[ArtTheme] }) {
  return (
    <g>
      <rect x="88" y="54" width="64" height="16" rx="5" fill={theme.lid} />
      <rect x="94" y="46" width="52" height="12" rx="4" fill={theme.bodyDark} opacity="0.85" />
      <path
        d="M84 70h72a10 10 0 0 1 10 10v78a14 14 0 0 1-14 14H88a14 14 0 0 1-14-14V80a10 10 0 0 1 10-10z"
        fill={theme.body}
      />
      <path
        d="M84 70h30v102H88a14 14 0 0 1-14-14V80a10 10 0 0 1 10-10z"
        fill="#ffffff"
        opacity="0.22"
      />
      <rect x="92" y="98" width="56" height="46" rx="8" fill={theme.label} opacity="0.94" />
      <path d="M120 108l9 5.2v10.4l-9 5.2-9-5.2v-10.4z" fill={theme.bodyDark} opacity="0.55" />
      <rect x="103" y="134" width="34" height="4" rx="2" fill={theme.lid} opacity="0.4" />
    </g>
  );
}

function SalveTin({ theme }: { theme: (typeof themes)[ArtTheme] }) {
  return (
    <g>
      <ellipse cx="120" cy="150" rx="58" ry="14" fill={theme.bodyDark} opacity="0.25" />
      <rect x="62" y="96" width="116" height="52" rx="14" fill={theme.bodyDark} />
      <rect x="62" y="82" width="116" height="42" rx="16" fill={theme.body} />
      <ellipse cx="120" cy="82" rx="58" ry="17" fill={theme.lid} />
      <ellipse cx="120" cy="80" rx="48" ry="13" fill={theme.body} opacity="0.55" />
      <circle cx="120" cy="80" r="20" fill={theme.label} opacity="0.92" />
      <path d="M120 70l7.5 4.3v8.7l-7.5 4.3-7.5-4.3v-8.7z" fill={theme.lid} opacity="0.6" />
      <rect x="62" y="82" width="26" height="42" rx="14" fill="#ffffff" opacity="0.18" />
    </g>
  );
}

function BalmJar({ theme }: { theme: (typeof themes)[ArtTheme] }) {
  return (
    <g>
      <rect x="74" y="62" width="92" height="24" rx="8" fill={theme.lid} />
      <rect x="80" y="86" width="80" height="80" rx="16" fill={theme.body} />
      <rect x="80" y="86" width="26" height="80" rx="14" fill="#ffffff" opacity="0.2" />
      <rect x="90" y="106" width="60" height="42" rx="8" fill={theme.label} opacity="0.94" />
      <path d="M120 114l8 4.6v9.2l-8 4.6-8-4.6v-9.2z" fill={theme.bodyDark} opacity="0.5" />
      <rect x="100" y="138" width="40" height="4" rx="2" fill={theme.lid} opacity="0.35" />
      <ellipse cx="120" cy="62" rx="46" ry="8" fill={theme.bodyDark} opacity="0.5" />
    </g>
  );
}

export function ProductArt({
  theme = "honey",
  image,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  theme?: ArtTheme;
  image?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const palette = themes[theme];

  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-sand", className)}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      </div>
    );
  }

  const gradientId = `art-${theme}`;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <svg
        viewBox="0 0 240 240"
        className="h-full w-full"
        role="img"
        aria-label={alt}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.from} />
            <stop offset="100%" stopColor={palette.to} />
          </linearGradient>
          <pattern
            id={`${gradientId}-comb`}
            width="28"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M14 0l12 7v14l-12 7-12-7V7z"
              fill="none"
              stroke={palette.bodyDark}
              strokeWidth="0.9"
              opacity="0.25"
            />
          </pattern>
        </defs>
        <rect width="240" height="240" fill={`url(#${gradientId})`} />
        <rect width="240" height="240" fill={`url(#${gradientId}-comb)`} />
        <ellipse cx="120" cy="186" rx="72" ry="16" fill={palette.bodyDark} opacity="0.14" />
        {theme === "honey" ? <HoneyJar theme={palette} /> : null}
        {theme === "salve" ? <SalveTin theme={palette} /> : null}
        {theme === "balm" ? <BalmJar theme={palette} /> : null}
      </svg>
    </div>
  );
}
