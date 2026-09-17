/**
 * Shown while a route's data resolves. Deliberately quiet — a single hairline
 * drawing across the top of the page rather than a spinner.
 */
export default function Loading() {
  return (
    <div className="wrap flex min-h-[70svh] flex-col justify-center" role="status">
      <span className="sr-only">Loading</span>
      <span
        aria-hidden="true"
        className="anim-cue h-px w-full max-w-xs origin-left bg-espresso/30"
      />
    </div>
  );
}
