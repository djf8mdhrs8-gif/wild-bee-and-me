import { NextResponse } from "next/server";

import { deliverNewsletterSignup } from "@/lib/deliver";
import { looksAutomated, MAX_BODY_BYTES } from "@/lib/inquiry";

/**
 * Newsletter signups.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE LAUNCH: set RESEND_API_KEY (signups are emailed to the studio)   │
 * │  or NEWSLETTER_WEBHOOK_URL (signups are POSTed to the list provider).    │
 * │  With neither, addresses are written to the server log and go nowhere.   │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  // Same guard as the inquiry route: an email address is never large, so an
  // oversized body is turned away before it is parsed.
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
      { message: "That request is larger than this form accepts." },
      { status: 413 },
    );
  }

  let payload: { email?: string; source?: string };

  try {
    payload = JSON.parse(body) as { email?: string; source?: string };
  } catch {
    return NextResponse.json(
      { message: "That request could not be read." },
      { status: 400 },
    );
  }

  // Same silent treatment as the inquiry form.
  if (looksAutomated(payload)) {
    return NextResponse.json({ message: "You are on the list.", delivered: false });
  }

  // 254 is the maximum length of an email address; anything longer is not one.
  const email = (payload.email ?? "").trim().slice(0, 254);

  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { message: "That email address does not look right." },
      { status: 422 },
    );
  }

  const source = String(payload.source ?? "unknown").slice(0, 60);

  const result = await deliverNewsletterSignup(email, source).catch((error) => ({
    delivered: false,
    reason: String(error),
  }));

  if (!result.delivered) {
    console.error("[newsletter] NOT DELIVERED —", result.reason, { email, source });
  }

  return NextResponse.json({
    message: "You are on the list.",
    delivered: result.delivered,
  });
}
