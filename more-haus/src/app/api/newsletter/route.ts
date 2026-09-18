import { NextResponse } from "next/server";

import { looksAutomated, MAX_BODY_BYTES } from "@/lib/inquiry";

/**
 * Newsletter signups.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE LAUNCH: set NEWSLETTER_WEBHOOK_URL.                              │
 * │                                                                          │
 * │  Point it at the mailing list provider (Mailchimp, Flodesk, Klaviyo,     │
 * │  Buttondown) or an automation hook that adds the address to the list.    │
 * │                                                                          │
 * │  Without it, addresses are written to the server log ONLY and go nowhere. │
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

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      "[newsletter] NEWSLETTER_WEBHOOK_URL is not set — this signup was logged and NOT delivered.",
      { email, source: payload.source },
    );
    return NextResponse.json({
      message: "You are on the list.",
      delivered: false,
    });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "newsletter",
        email,
        source: String(payload.source ?? "unknown").slice(0, 60),
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("[newsletter] delivery failed", error, { email });
    return NextResponse.json(
      { message: "That did not go through. Try again?" },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "You are on the list.", delivered: true });
}
