import { NextResponse } from "next/server";

import {
  looksAutomated,
  MAX_BODY_BYTES,
  sanitiseInquiry,
  validateInquiry,
} from "@/lib/inquiry";

/**
 * Receives a design inquiry.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE LAUNCH: set INQUIRY_WEBHOOK_URL.                                 │
 * │                                                                          │
 * │  With it set, every inquiry is POSTed there as JSON — point it at a form │
 * │  service, an email relay, a Zapier/Make hook, or a CRM.                  │
 * │                                                                          │
 * │  Without it, inquiries are written to the server log ONLY. That is        │
 * │  useful in development and is NOT good enough for a live site: a real     │
 * │  enquiry would be recorded and never reach anyone.                       │
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

  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      "[inquiry] INQUIRY_WEBHOOK_URL is not set — this inquiry was logged and NOT delivered.",
      { ...payload, receivedAt: new Date().toISOString() },
    );
    return NextResponse.json({ message: ACCEPTED, delivered: false });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "inquiry",
        receivedAt: new Date().toISOString(),
        ...payload,
      }),
    });

    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("[inquiry] delivery failed", error, payload);
    return NextResponse.json(
      {
        message:
          "That did not send. Please try again, or email the studio directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: ACCEPTED, delivered: true });
}
