"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { ELAPSED_FIELD } from "@/lib/inquiry";

type State = "idle" | "submitting" | "done" | "error";

/**
 * Email capture, used at the foot of the site and beside The Home Edit.
 *
 * A single field on a rule — no boxed card, no pill button. The submit control
 * is the word itself.
 */
export function NewsletterForm({
  /** Where the address came from, so signups can be segmented later. */
  source,
  label = "Be first to see what made the next edit.",
  onDark = false,
  className,
}: {
  source: string;
  label?: string;
  onDark?: boolean;
  className?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  // When this form reached the visitor. A submission arriving within a
  // couple of seconds of that did not involve anyone reading it. Set on
  // mount rather than during render: the clock is not pure, and the server
  // and the browser would disagree about it.
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  /** How long this form has been open, measured on this device alone. */
  const elapsedMs = () =>
    startedAt.current === null ? undefined : Date.now() - startedAt.current;
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, [ELAPSED_FIELD]: elapsedMs() }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(result.message ?? "That did not go through. Try again?");
        return;
      }

      setState("done");
      setMessage(result.message ?? "You are on the list.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("That did not go through. Try again?");
    }
  }

  const tone = onDark ? "text-ivory" : "text-espresso";

  if (state === "done") {
    return (
      <p className={cn("body-lg", onDark ? "text-parchment" : "text-smoke", className)} role="status">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <label htmlFor={id} className={cn("label block", onDark ? "text-parchment" : "text-smoke")}>
        {label}
      </label>

      <div
        className={cn(
          "mt-4 flex items-center gap-4 border-b pb-2 transition-colors duration-500",
          onDark ? "border-ivory/30 focus-within:border-ivory" : "border-espresso/25 focus-within:border-espresso",
        )}
      >
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `${id}-error` : undefined}
          className={cn(
            "w-full border-0 bg-transparent py-2 text-base font-light outline-none",
            tone,
            onDark ? "placeholder:text-parchment/50" : "placeholder:text-smoke/60",
          )}
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className={cn("label shrink-0 whitespace-nowrap py-2 disabled:opacity-50", tone)}
        >
          {state === "submitting" ? "Sending" : "Sign up"}
        </button>
      </div>

      {state === "error" ? (
        <p id={`${id}-error`} role="alert" className="label mt-3 text-clay">
          {message}
        </p>
      ) : null}
    </form>
  );
}
