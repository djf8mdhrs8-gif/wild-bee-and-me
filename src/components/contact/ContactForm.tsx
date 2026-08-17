"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@/components/ui/Icons";
import {
  Field,
  FormStatus,
  inputClass,
  selectClass,
  textareaClass,
} from "@/components/ui/Field";
import { site } from "@/lib/site";

const topics = [
  { value: "bee-removal", label: "Bee removal enquiry" },
  { value: "order", label: "An order or product question" },
  { value: "wholesale", label: "Wholesale or farmers market" },
  { value: "swarm-report", label: "Reporting a swarm" },
  { value: "other", label: "Something else" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("success");
      setMessage(data.message);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : `We could not send that. Please call ${site.phone} instead.`,
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-4xl border border-forest-200 bg-white p-10 text-center shadow-lift sm:p-14"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-600 text-cream">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold text-forest-800">
          Message sent
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-muted">
          {message}
        </p>
        <a
          href={site.phoneHref}
          className="mt-8 inline-flex rounded-full bg-honey-500 px-7 py-3.5 font-semibold text-white shadow-soft transition-colors hover:bg-honey-600"
        >
          Or call {site.phone}
        </a>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-4xl border border-linen bg-white p-7 shadow-lift sm:p-10"
    >
      <h2 className="font-display text-xl font-semibold text-forest-800">
        Send a message
      </h2>
      <p className="mt-1.5 text-[0.9rem] text-ink-muted">
        We answer everything, usually within a day.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="contact-name" required>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass()}
          />
        </Field>
        <Field label="Phone" htmlFor="contact-phone">
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass()}
          />
        </Field>
        <Field label="Email" htmlFor="contact-email" required className="sm:col-span-2">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass()}
          />
        </Field>
        <Field label="What is this about?" htmlFor="contact-topic" required className="sm:col-span-2">
          <select
            id="contact-topic"
            name="topic"
            required
            defaultValue="bee-removal"
            className={selectClass()}
          >
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Message" htmlFor="contact-message" required className="sm:col-span-2">
          <textarea
            id="contact-message"
            name="message"
            required
            className={textareaClass()}
            placeholder="Tell us what you need…"
          />
        </Field>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="sr-only">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-7 flex flex-col gap-4">
        <FormStatus status={status} message={message} />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-honey-500 py-4 text-base font-semibold text-white shadow-soft transition-all hover:bg-honey-600 hover:shadow-lift disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
