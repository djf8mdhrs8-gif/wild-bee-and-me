/** Shared shape and validation for the inquiry form, used by client and route. */

export const INQUIRY_SUBJECTS = [
  { value: "interior-design", label: "Interior Design" },
  { value: "furniture", label: "Furniture Inquiry" },
  { value: "home-edit", label: "Home Edit Question" },
  { value: "press", label: "Press / Collaboration" },
  { value: "other", label: "Other" },
] as const;

export const PROJECT_TYPES = [
  "Whole home",
  "New construction",
  "Renovation",
  "Second home",
  "Single room",
  "Furnishing only",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within three months",
  "Three to six months",
  "Six to twelve months",
  "Still planning",
] as const;

export const BUDGETS = [
  "Under $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000 – $250,000",
  "$250,000+",
  "Would rather discuss",
] as const;

export type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  projectLocation?: string;
  projectType?: string;
  squareFootage?: string;
  timeline?: string;
  budget?: string;
  referral?: string;
  message: string;
  /** Slug of a piece, when the inquiry started from a product page. */
  piece?: string;
};

export type FieldErrors = Partial<Record<keyof InquiryPayload, string>>;

/* -------------------------------------------------------------------------- */
/*  Abuse handling                                                             */
/* -------------------------------------------------------------------------- */

/**
 * A field no human ever sees or reaches — it sits inside an `aria-hidden`
 * wrapper and is out of the tab order. Automated submitters fill in everything
 * they find, so anything arriving with this set did not come from a person.
 */
export const HONEYPOT_FIELD = "company_website";

/** Submissions faster than this did not involve reading the form. */
export const MIN_SECONDS_ON_FORM = 3;

/**
 * Upper bounds for each field. These are generous for a real inquiry and stop
 * the endpoint from relaying something enormous to whatever service is on the
 * other end of the webhook.
 */
const FIELD_LIMITS: Record<keyof InquiryPayload, number> = {
  name: 120,
  email: 254, // the maximum length of an email address
  phone: 40,
  subject: 40,
  projectLocation: 120,
  projectType: 60,
  squareFootage: 40,
  timeline: 60,
  budget: 60,
  referral: 200,
  message: 5000,
  piece: 120,
};

/** Rejects a body larger than any legitimate inquiry before parsing it. */
export const MAX_BODY_BYTES = 16 * 1024;

/**
 * Keeps only the fields the form defines, coerces each to a trimmed string and
 * enforces its length cap.
 *
 * The client posts whatever the form contains, and anyone can post here
 * directly, so the shape is rebuilt from scratch rather than trusted: unknown
 * keys are dropped instead of being relayed onward.
 */
export function sanitiseInquiry(raw: unknown): Partial<InquiryPayload> {
  if (typeof raw !== "object" || raw === null) return {};

  const source = raw as Record<string, unknown>;
  const clean: Partial<InquiryPayload> = {};

  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    const value = source[field];
    if (typeof value !== "string") continue;

    const trimmed = value.trim().slice(0, limit);
    if (trimmed) clean[field as keyof InquiryPayload] = trimmed;
  }

  return clean;
}

/**
 * Whether a submission looks automated. Both signals are silent: the caller
 * should answer exactly as it would for a real submission, so an automated
 * submitter learns nothing about why nothing happened.
 */
export function looksAutomated(raw: unknown, now = Date.now()): boolean {
  if (typeof raw !== "object" || raw === null) return true;

  const source = raw as Record<string, unknown>;

  const honeypot = source[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  const startedAt = Number(source.startedAt);
  if (!Number.isFinite(startedAt)) return false; // absent: give the benefit of the doubt
  return (now - startedAt) / 1000 < MIN_SECONDS_ON_FORM;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validated the same way on both sides, so the messages always match. */
export function validateInquiry(payload: Partial<InquiryPayload>): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.name?.trim()) {
    errors.name = "Please add your name.";
  }

  if (!payload.email?.trim()) {
    errors.email = "Please add an email address.";
  } else if (!EMAIL.test(payload.email.trim())) {
    errors.email = "That email address does not look right.";
  }

  if (!payload.message?.trim()) {
    errors.message = "Tell us a little about the project.";
  } else if (payload.message.trim().length < 12) {
    errors.message = "A sentence or two is plenty — just a bit more.";
  }

  return errors;
}
