/**
 * Route-level loading state. Deliberately quiet — a warm field with a slow
 * drifting glow, so navigation never flashes a blank white screen.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center bg-cream"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="relative grid h-16 w-16 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-honey-300/40" />
          <span className="relative grid h-12 w-12 place-items-center rounded-full bg-honey-500 text-white">
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="12" cy="14" rx="4.2" ry="5.6" />
                <path d="M7.9 12.2h8.2M8.1 15.6h7.8M12 8.4V6.6" />
                <path d="M8.6 10.4C6 8.6 3.4 8.9 3 10.4c-.4 1.6 2 3.2 4.6 2.6M15.4 10.4c2.6-1.8 5.2-1.5 5.6 0 .4 1.6-2 3.2-4.6 2.6" />
              </g>
            </svg>
          </span>
        </span>
        <p className="font-display text-[1.05rem] text-forest-700">Just a moment…</p>
        <span className="sr-only">Loading page content</span>
      </div>
    </div>
  );
}
