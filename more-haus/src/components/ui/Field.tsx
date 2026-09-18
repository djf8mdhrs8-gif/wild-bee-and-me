import { cn } from "@/lib/cn";

/**
 * One form row: a small uppercase label sitting above a field on a rule.
 * Every control gets a real `<label for>` and errors are wired with
 * `aria-describedby`, so the form is usable by screen reader and keyboard.
 */
export function Field({
  id,
  label,
  error,
  required = false,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="label block text-smoke">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-clay">
            *
          </span>
        ) : null}
      </label>

      {/* The control is passed in as children, so this component cannot wire
          `aria-describedby` itself — the caller must point the control at
          `<id>-hint` (and at `<id>-error` when there is an error) for the hint
          to be announced. */}
      <div className="mt-2">{children}</div>

      {hint && !error ? (
        <p id={`${id}-hint`} className="label-sm mt-2 text-smoke/70">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} role="alert" className="label-sm mt-2 text-clay">
          {error}
        </p>
      ) : null}
    </div>
  );
}
