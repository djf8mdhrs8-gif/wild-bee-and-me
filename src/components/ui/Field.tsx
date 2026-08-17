import type { ReactNode } from "react";
import { cn } from "@/lib/format";

const controlBase =
  "w-full rounded-2xl border border-linen bg-white px-4 py-3.5 text-[0.98rem] text-ink shadow-[inset_0_1px_2px_rgb(36_28_19/0.04)] outline-none transition-all placeholder:text-ink-muted/60 focus:border-honey-400 focus:ring-4 focus:ring-honey-500/12 disabled:opacity-60";

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[0.88rem] font-semibold text-forest-800"
      >
        {label}
        {required ? (
          <span className="ml-1 text-honey-600" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-ink-muted">(optional)</span>
        )}
      </label>
      {children}
      {hint ? <p className="text-[0.8rem] text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export const inputClass = (className?: string) => cn(controlBase, className);

export const textareaClass = (className?: string) =>
  cn(controlBase, "min-h-32 resize-y leading-relaxed", className);

export const selectClass = (className?: string) =>
  cn(controlBase, "appearance-none bg-[length:1.1rem] pr-10", className);

/** Inline status message shown under a form after submission. */
export function FormStatus({
  status,
  message,
}: {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
}) {
  if (status === "idle" || status === "submitting" || !message) return null;

  return (
    <p
      role="status"
      className={cn(
        "rounded-2xl px-4 py-3 text-[0.92rem]",
        status === "success"
          ? "bg-forest-50 text-forest-700"
          : "bg-red-50 text-red-700",
      )}
    >
      {message}
    </p>
  );
}
