import { NextResponse } from "next/server";

import { deliverInquiry } from "@/lib/deliver";
import {
  looksAutomated,
  MAX_BODY_BYTES,
  sanitiseInquiry,
  validateInquiry,
} from "@/lib/inquiry";

/**
 * Receives a design inquiry and hands it to the delivery layer.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE LAUNCH: make submissions reach a person.                         │
 * │                                                                          │
 * │  Simplest: set RESEND_API_KEY and INQUIRY_TO_EMAIL and every inquiry is  │
 * │  emailed to the studio, with reply-to set to whoever wrote in.           │
 * │                                                                          │
 * │  Or set INQUIRY_WEBHOOK_URL to POST it as JSON to a form service, an     │
 * │  automation hook or a CRM instead.                                       │
 * │                                                                          │
 * │  With neither, inquiries are written to the server log ONLY. Useful in   │
 * │  development, and NOT good enough for a live site.                       │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
/** Answered for real submissions and for automated ones alike. */
const ACCEPTED = "Thank you — your note is with the studio.";

export async function POST(request: Request) {
  // Read as text first so an enormous body is turned away before it is parsed
  // and before any of it is relayed to the webhook.
  let body: string;
  try {
    body = await request.text();
  } catch {
    return NextResponse.json(
      { message: "That request could not be read." },
      { status: 400 },
    );
  }

  if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { message: "That message is longer than this form can take." },
      { status: 413 },
    );
  }

  let raw: unknown;
  try {
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { message: "That request could not be read." },
      { status: 400 },
    );
  }

  // Answer an automated submission exactly as a real one, and forward nothing.
  // Saying "you look like a bot" only tells a spammer what to change.
  if (looksAutomated(raw)) {
    return NextResponse.json({ message: ACCEPTED, delivered: false });
  }

  // Rebuild the payload from known fields only, so nothing unexpected is
  // relayed to whatever service receives the webhook.
  const payload = sanitiseInquiry(raw);

  const errors = validateInquiry(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "A couple of fields need attention.", errors },
      { status: 422 },
    );
  }

  const result = await deliverInquiry(payload).catch((error) => ({
    delivered: false,
    reason: String(error),
  }));

  if (!result.delivered) {
    // Loud in the log, quiet to the visitor: they did nothing wrong, and the
    // studio needs to be able to find the inquiry and the reason.
    console.error(
      "[inquiry] NOT DELIVERED —",
      result.reason,
      JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
    );
  }

  return NextResponse.json({ message: ACCEPTED, delivered: result.delivered });
}
