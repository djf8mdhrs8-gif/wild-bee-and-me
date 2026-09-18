"use client";

import { useEffect, useRef, useState } from "react";

import { Field } from "@/components/ui/Field";
import {
  BUDGETS,
  HONEYPOT_FIELD,
  INQUIRY_SUBJECTS,
  PROJECT_TYPES,
  TIMELINES,
  validateInquiry,
  type FieldErrors,
  type InquiryPayload,
} from "@/lib/inquiry";

type State = "idle" | "submitting" | "sent" | "error";

/**
 * The design inquiry.
 *
 * The project questions — square footage, timeline, budget — only appear for
 * design inquiries. Somebody asking about a lamp or about press should not have
 * to scroll past a budget dropdown to reach the message box.
 */
export function InquiryForm({
  defaultSubject = "interior-design",
  piece,
}: {
  defaultSubject?: string;
  /** Pre-filled when the visitor arrived from a piece in the collection. */
  piece?: string;
}) {
  const [subject, setSubject] = useState(defaultSubject);
  const [errors, setErrors] = useState<FieldErrors>({});
  // When this form reached the visitor. A submission arriving within a
  // couple of seconds of that did not involve anyone reading it. Set on
  // mount rather than during render: the clock is not pure, and the server
  // and the browser would disagree about it.
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [state, setState] = useState<State>("idle");
  const [notice, setNotice] = useState("");

  const isDesignInquiry = subject === "interior-design";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries()) as unknown as InquiryPayload;

    // Validate only the fields a person fills in; the spam signals travel
    // alongside and are the server's business.
    const found = validateInquiry(payload);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setState("error");
      setNotice("A couple of fields need attention.");
      // Move focus to the first problem so keyboard users are not left guessing.
      const firstField = Object.keys(found)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setState("submitting");
    setNotice("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt: startedAt.current ?? undefined }),
      });
      const result = (await response.json()) as {
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setState("error");
        setNotice(result.message ?? "That did not send. Please try again.");
        return;
      }

      setState("sent");
      setNotice(result.message ?? "Thank you — your note is with the studio.");
    } catch {
      setState("error");
      setNotice("That did not send. Please try again, or email the studio directly.");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rule pt-10">
        <p className="display-sm max-w-[20ch]">Thank you — it came through.</p>
        <p className="body-lg mt-5 max-w-[46ch] text-smoke">{notice}</p>
        <p className="body-lg mt-5 max-w-[46ch] text-smoke">
          We read everything ourselves and reply within a few working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {piece ? <input type="hidden" name="piece" value={piece} /> : null}

      {/* Left for automated submitters to find. It is removed from the
          accessibility tree and from the tab order, so nobody using a screen
          reader or a keyboard will ever meet it — but it is a real, labelled
          field in the markup, which is what makes it work. It is positioned
          off-screen rather than set to display:none, which some submitters
          know to skip. */}
      <div
        aria-hidden="true"
        className="absolute h-px w-px overflow-hidden"
        style={{ left: "-9999px", top: "auto" }}
      >
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <fieldset className="border-0 p-0">
        <legend className="label text-smoke">I am writing about</legend>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {INQUIRY_SUBJECTS.map((option) => (
            <label
              key={option.value}
              className="label flex cursor-pointer items-center gap-3 select-none"
            >
              <input
                type="radio"
                name="subject"
                value={option.value}
                checked={subject === option.value}
                onChange={(event) => setSubject(event.target.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="block h-3 w-3 rounded-full border border-espresso/35 transition-colors duration-300 peer-checked:border-espresso peer-checked:bg-espresso peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive-deep"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="field-input"
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="field-input"
          />
        </Field>

        <Field id="phone" label="Phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="field-input"
          />
        </Field>

        <Field id="projectLocation" label="Project location">
          <input
            id="projectLocation"
            name="projectLocation"
            type="text"
            autoComplete="address-level2"
            placeholder="City or neighborhood"
            className="field-input"
          />
        </Field>

        {isDesignInquiry ? (
          <>
            <Field id="projectType" label="Type of project">
              <select id="projectType" name="projectType" className="field-input" defaultValue="">
                <option value="">Select</option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="squareFootage"
              label="Approximate square footage"
              hint="A rough number is fine."
            >
              <input
                id="squareFootage"
                name="squareFootage"
                type="text"
                inputMode="numeric"
                className="field-input"
              />
            </Field>

            <Field id="timeline" label="Timeline">
              <select id="timeline" name="timeline" className="field-input" defaultValue="">
                <option value="">Select</option>
                {TIMELINES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="budget"
              label="Estimated design + furnishing budget"
              hint="Helps us scope honestly. Nothing is held to it."
            >
              <select id="budget" name="budget" className="field-input" defaultValue="">
                <option value="">Select</option>
                {BUDGETS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </>
        ) : null}

        <Field id="referral" label="How did you hear about MORE HAUS?" className="sm:col-span-2">
          <input id="referral" name="referral" type="text" className="field-input" />
        </Field>

        <Field
          id="message"
          label="Tell us about your home or project"
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="field-input resize-y"
            placeholder="What the house is, which rooms are not working, and what you would like it to feel like."
          />
        </Field>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <button type="submit" disabled={state === "submitting"} className="btn btn-solid">
          {state === "submitting" ? "Sending" : "Send inquiry"}
        </button>
        <p className="label-sm text-smoke/70">
          <span aria-hidden="true" className="text-clay">
            *
          </span>{" "}
          Required
        </p>
      </div>

      {state === "error" && notice ? (
        <p role="alert" className="label mt-6 text-clay">
          {notice}
        </p>
      ) : null}
    </form>
  );
}
