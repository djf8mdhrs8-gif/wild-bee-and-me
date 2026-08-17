"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BeeIcon, CheckIcon, CloseIcon, PhoneIcon } from "@/components/ui/Icons";
import {
  Field,
  FormStatus,
  inputClass,
  selectClass,
  textareaClass,
} from "@/components/ui/Field";
import { site } from "@/lib/site";

const urgencyOptions = [
  { value: "emergency", label: "Emergency — bees inside the house or someone is allergic" },
  { value: "urgent", label: "Urgent — need someone within 24–48 hours" },
  { value: "soon", label: "Soon — sometime this week is fine" },
  { value: "flexible", label: "Flexible — whenever suits your schedule" },
];

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

type Status = "idle" | "submitting" | "success" | "error";

export function RemovalForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotos = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    const rejected: string[] = [];

    const accepted = incoming.filter((file) => {
      if (!file.type.startsWith("image/")) {
        rejected.push(`${file.name} is not an image`);
        return false;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        rejected.push(`${file.name} is larger than 5 MB`);
        return false;
      }
      return true;
    });

    const combined = [...photos, ...accepted].slice(0, MAX_PHOTOS);
    if (photos.length + accepted.length > MAX_PHOTOS) {
      rejected.push(`Only the first ${MAX_PHOTOS} photos are sent`);
    }

    setPhotos(combined);
    setPhotoError(rejected.join(". "));
  };

  const removePhoto = (index: number) =>
    setPhotos((current) => current.filter((_, i) => i !== index));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    // Rebuild the photo list from state so removals are respected.
    formData.delete("photos");
    photos.forEach((photo) => formData.append("photos", photo));

    try {
      const response = await fetch("/api/removal-request", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("success");
      setMessage(data.message);
      setPhotos([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not send that. Please call us instead.",
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
        <h3 className="mt-6 font-display text-2xl font-semibold text-forest-800">
          Request received
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-muted">
          {message}
        </p>
        <a
          href={site.phoneHref}
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-honey-500 px-7 py-3.5 font-semibold text-white shadow-soft transition-colors hover:bg-honey-600"
        >
          <PhoneIcon className="h-5 w-5" />
          Or call now: {site.phone}
        </a>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-4xl border border-linen bg-white p-7 shadow-lift sm:p-10"
      noValidate={false}
    >
      <div className="flex items-center gap-3 border-b border-linen pb-6">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-honey-100 text-honey-600">
          <BeeIcon className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-forest-800">
            Request a removal
          </h3>
          <p className="text-[0.88rem] text-ink-muted">
            Usually answered the same day. Urgent? Call {site.phone}.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass()}
            placeholder="Ashley More"
          />
        </Field>

        <Field label="Phone" htmlFor="phone" required hint="The fastest way to reach you.">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass()}
            placeholder="239-555-0134"
          />
        </Field>

        <Field label="Email" htmlFor="email" required className="sm:col-span-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass()}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          label="Property address"
          htmlFor="address"
          required
          className="sm:col-span-2"
          hint="Street, city and ZIP — so we know which county we're heading to."
        >
          <input
            id="address"
            name="address"
            type="text"
            required
            autoComplete="street-address"
            className={inputClass()}
            placeholder="123 Palm Beach Blvd, Fort Myers, FL 33905"
          />
        </Field>

        <Field label="How urgent is it?" htmlFor="urgency" required className="sm:col-span-2">
          <select
            id="urgency"
            name="urgency"
            required
            defaultValue="soon"
            className={selectClass()}
          >
            {urgencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Where are the bees, and what are you seeing?"
          htmlFor="situation"
          required
          className="sm:col-span-2"
          hint="Wall, soffit, tree, meter box, vehicle? How long have they been there? Roughly how many?"
        >
          <textarea
            id="situation"
            name="situation"
            required
            className={textareaClass()}
            placeholder="They're going in and out of a gap under the second-storey soffit on the west side. Started about three weeks ago and there are a lot of them now."
          />
        </Field>

        <div className="sm:col-span-2">
          <span className="text-[0.88rem] font-semibold text-forest-800">
            Photos
            <span className="ml-1.5 font-normal text-ink-muted">(optional)</span>
          </span>
          <p className="mt-1 text-[0.8rem] text-ink-muted">
            A photo of the entry point helps a lot — we can often tell honey bees
            from wasps before we drive out. Up to {MAX_PHOTOS} images, 5&nbsp;MB each.
          </p>

          <label
            htmlFor="photos"
            className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-linen bg-sand/60 px-6 py-8 text-center transition-colors hover:border-honey-300 hover:bg-honey-50/60"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-honey-600" aria-hidden>
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 16V4M8 8l4-4 4 4" />
                <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
              </g>
            </svg>
            <span className="text-[0.92rem] font-semibold text-forest-700">
              Tap to add photos
            </span>
            <span className="text-[0.8rem] text-ink-muted">JPG, PNG or HEIC</span>
          </label>
          <input
            ref={fileInputRef}
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => handlePhotos(event.target.files)}
          />

          <AnimatePresence>
            {photos.length > 0 ? (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {photos.map((photo, index) => (
                  <li
                    key={`${photo.name}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl bg-sand px-4 py-2.5 text-[0.85rem]"
                  >
                    <span className="truncate text-forest-700">{photo.name}</span>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      aria-label={`Remove ${photo.name}`}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white hover:text-forest-800"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>

          {photoError ? (
            <p className="mt-2 text-[0.82rem] text-red-700">{photoError}</p>
          ) : null}
        </div>
      </div>

      {/* Honeypot — bots fill hidden fields, humans never see this one. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <FormStatus status={status} message={message} />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-honey-500 py-4 text-base font-semibold text-white shadow-soft transition-all hover:bg-honey-600 hover:shadow-lift disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send my removal request"}
        </button>
        <p className="text-center text-[0.82rem] text-ink-muted">
          No obligation, no call-out fee for an estimate. We only take the job if
          the bees can be relocated alive.
        </p>
      </div>
    </form>
  );
}
