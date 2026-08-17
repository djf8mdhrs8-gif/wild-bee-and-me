"use client";

import { useState, type FormEvent } from "react";
import { BeeIcon, CheckIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { inputClass } from "@/components/ui/Field";

const perks = [
  "First word when a honey batch is pulled",
  "Seasonal bee-proofing tips for Florida homes",
  "Subscriber-only bundles and farm pickup days",
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not sign you up just now. Please try again.",
      );
    }
  };

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-5xl bg-forest-700 px-7 py-14 shadow-lift sm:px-14 sm:py-16">
            <div
              aria-hidden
              className="bg-honeycomb absolute inset-0 -z-10 opacity-[0.14] [mask-image:radial-gradient(70%_80%_at_80%_20%,black,transparent)]"
            />
            <div
              aria-hidden
              className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(221,168,47,0.35),transparent_65%)] blur-2xl"
            />

            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-honey-400/30 bg-honey-500/10 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-honey-200">
                  <BeeIcon className="h-4 w-4" />
                  Join the Hive
                </span>
                <h2 className="mt-6 text-3xl leading-[1.1] text-cream sm:text-[2.4rem]">
                  Know when the honey is ready
                </h2>
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-forest-100">
                  Small batches sell out. One short email when there is something
                  worth telling you about — no more than a couple a month, ever.
                </p>
                <ul className="mt-7 space-y-3">
                  {perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-3 text-[0.95rem] text-forest-100"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-honey-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-4xl border border-cream/12 bg-forest-800/70 p-7 backdrop-blur-sm sm:p-8">
                {status === "success" ? (
                  <div className="flex flex-col items-center gap-4 py-6 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-honey-500 text-white">
                      <CheckIcon className="h-7 w-7" />
                    </span>
                    <p className="font-display text-xl text-cream">
                      Welcome to the hive
                    </p>
                    <p className="text-[0.95rem] text-forest-100">{message}</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <label
                      htmlFor="newsletter-email"
                      className="text-[0.88rem] font-semibold text-cream"
                    >
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className={inputClass("border-transparent")}
                    />
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="rounded-2xl bg-honey-500 py-3.5 font-semibold text-white transition-all hover:bg-honey-400 disabled:opacity-60"
                    >
                      {status === "submitting" ? "Signing you up…" : "Join the Hive"}
                    </button>
                    {status === "error" ? (
                      <p role="status" className="text-[0.85rem] text-honey-200">
                        {message}
                      </p>
                    ) : null}
                    <p className="text-[0.78rem] leading-relaxed text-forest-300">
                      We never sell or share your address. Unsubscribe in one click.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
