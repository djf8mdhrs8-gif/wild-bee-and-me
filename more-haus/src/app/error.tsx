"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-center py-[clamp(6rem,14vw,12rem)]">
      <p className="label text-smoke">Something went wrong</p>
      <h1 className="display-lg mt-8 max-w-[18ch] text-balance">
        That did not load as it should have.
      </h1>
      <p className="body-lg mt-8 max-w-[44ch] text-smoke">
        Try again — and if it keeps happening, the studio would genuinely like to
        know.
      </p>
      <div className="mt-10">
        <button type="button" onClick={reset} className="btn">
          Try again
        </button>
      </div>
    </section>
  );
}
