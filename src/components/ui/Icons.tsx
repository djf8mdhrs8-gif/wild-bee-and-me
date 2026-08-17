import type { SVGProps } from "react";

/** Shared stroke-icon defaults — inline SVG keeps the JS bundle at zero. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type IconProps = SVGProps<SVGSVGElement>;

const Svg = ({ children, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
    {children}
  </svg>
);

export const BeeIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <ellipse cx="12" cy="14" rx="4.2" ry="5.6" />
      <path d="M7.9 12.2h8.2M8.1 15.6h7.8" />
      <path d="M12 8.4V6.6M12 6.6a2 2 0 1 1 0-.001" />
      <path d="M10.4 5.4 8.9 4M13.6 5.4 15.1 4" />
      <path d="M8.6 10.4C6 8.6 3.4 8.9 3 10.4c-.4 1.6 2 3.2 4.6 2.6M15.4 10.4c2.6-1.8 5.2-1.5 5.6 0 .4 1.6-2 3.2-4.6 2.6" />
    </g>
  </Svg>
);

export const HoneycombIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M12 2.6 17 5.5v5.8L12 14.2 7 11.3V5.5z" />
      <path d="M6.4 12.2 11.4 15v5.8L6.4 23.6 1.4 20.8V15z" transform="translate(0 -2.2)" />
      <path d="M17.6 12.2 22.6 15v5.8l-5 2.8-5-2.8V15z" transform="translate(0 -2.2)" />
    </g>
  </Svg>
);

export const LeafIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M4 20c0-8 5.2-13.2 16-14-.4 10.8-5.6 16-14 16H4z" />
      <path d="M4.8 19.2C8 16 11.2 13.6 15.6 11.6" />
    </g>
  </Svg>
);

export const ShieldIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M12 2.8 20 6v6.2c0 4.6-3.2 7.8-8 9.2-4.8-1.4-8-4.6-8-9.2V6z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </g>
  </Svg>
);

export const MapPinIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M12 21.4c4.4-4.4 6.6-7.9 6.6-10.6a6.6 6.6 0 1 0-13.2 0c0 2.7 2.2 6.2 6.6 10.6z" />
      <circle cx="12" cy="10.6" r="2.5" />
    </g>
  </Svg>
);

export const PhoneIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M6.4 3.6h3l1.6 4-2 1.4a11.6 11.6 0 0 0 6 6l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.4 5.8a2 2 0 0 1 2-2.2z" />
    </g>
  </Svg>
);

export const MailIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
      <path d="m3.6 7 8.4 6 8.4-6" />
    </g>
  </Svg>
);

export const JarIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M8 2.8h8v2.4H8z" />
      <path d="M7.4 5.2h9.2A2.4 2.4 0 0 1 19 7.6v11.2a2.4 2.4 0 0 1-2.4 2.4H7.4A2.4 2.4 0 0 1 5 18.8V7.6a2.4 2.4 0 0 1 2.4-2.4z" />
      <path d="M5 13.6c2-1.4 3.6-1.4 5.6 0s3.4 1.4 5.4 0 1.6-1.2 3-.4" />
    </g>
  </Svg>
);

export const SparkleIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M12 3.2 13.8 9 19.6 10.8 13.8 12.6 12 18.4 10.2 12.6 4.4 10.8 10.2 9z" />
      <path d="M18.4 16.4 19.2 18.8 21.6 19.6 19.2 20.4 18.4 22.8 17.6 20.4 15.2 19.6 17.6 18.8z" />
    </g>
  </Svg>
);

export const ClockIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2" />
    </g>
  </Svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M4.4 12h15.2M13.6 6l6 6-6 6" />
    </g>
  </Svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="m6 9.5 6 6 6-6" />
    </g>
  </Svg>
);

export const CloseIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M6 6l12 12M18 6 6 18" />
    </g>
  </Svg>
);

export const MenuIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </g>
  </Svg>
);

export const BagIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="M5 8h14l-1.1 11.2a2 2 0 0 1-2 1.8H8.1a2 2 0 0 1-2-1.8z" />
      <path d="M8.8 10.4V7.2a3.2 3.2 0 1 1 6.4 0v3.2" />
    </g>
  </Svg>
);

export const InstagramIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </g>
  </Svg>
);

export const FacebookIcon = (props: IconProps) => (
  <Svg {...props}>
    <path
      fill="currentColor"
      d="M13.5 21.9v-8.1h2.7l.5-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8v8.1z"
    />
  </Svg>
);

export const CheckIcon = (props: IconProps) => (
  <Svg {...props}>
    <g {...stroke}>
      <path d="m5 12.6 4.4 4.4L19 7.4" />
    </g>
  </Svg>
);
