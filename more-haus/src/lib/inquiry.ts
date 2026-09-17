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
