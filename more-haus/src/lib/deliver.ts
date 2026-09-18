import "server-only";

import { site } from "@/content/site";
import { INQUIRY_SUBJECTS } from "./inquiry";

/**
 * Gets a submission to a human.
 *
 * Two routes, tried in order, so the studio can be reachable with one API key
 * and grow into something larger later:
 *
 *  1. `RESEND_API_KEY` — the form is emailed to `INQUIRY_TO_EMAIL`. Reply-to is
 *     set to the person who wrote in, so answering is just hitting reply.
 *  2. `INQUIRY_WEBHOOK_URL` / `NEWSLETTER_WEBHOOK_URL` — the submission is
 *     POSTed as JSON to a form service, automation hook, CRM or list provider.
 *
 * With neither set the submission is written to the server log and `delivered`
 * comes back false. That is fine in development and is not good enough for a
 * live site: a real inquiry would be recorded and never reach anyone.
 */

export type DeliveryResult = {
  delivered: boolean;
  /** Why it did not go, for the server log. Never shown to the visitor. */
  reason?: string;
};

/** Requests are given a bounded time so a slow provider cannot hang the form. */
const TIMEOUT_MS = 8000;

async function postJson(url: string, body: unknown, headers: HeadersInit = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/* -------------------------------------------------------------------------- */
/*  Email, via Resend                                                          */
/* -------------------------------------------------------------------------- */

/** Overridable so the delivery path can be exercised without sending mail. */
const RESEND_URL = process.env.RESEND_API_URL ?? "https://api.resend.com/emails";

/**
 * Resend will not send from a domain you have not verified. Their shared
 * sending address works immediately, which means one API key is enough to make
 * the form live; swap it for a studio address once the domain is verified.
 */
const DEFAULT_FROM = "MORE HAUS <onboarding@resend.dev>";

function asRows(fields: Array<[string, string | undefined]>) {
  return fields.filter(([, value]) => value && value.trim() !== "") as Array<
    [string, string]
  >;
}

function textBody(rows: Array<[string, string]>) {
  return rows.map(([label, value]) => `${label}\n${value}`).join("\n\n");
}

function htmlBody(rows: Array<[string, string]>) {
  const escape = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const cells = rows
    .map(
      ([label, value]) =>
        `<tr>` +
        `<td style="padding:6px 16px 6px 0;vertical-align:top;color:#5A5249;` +
        `font:400 11px/1.5 system-ui,sans-serif;letter-spacing:.14em;` +
        `text-transform:uppercase;white-space:nowrap">${escape(label)}</td>` +
        `<td style="padding:6px 0;color:#2B1717;font:400 15px/1.6 system-ui,sans-serif;` +
        `white-space:pre-wrap">${escape(value)}</td>` +
        `</tr>`,
    )
    .join("");

  return (
    `<div style="background:#F2EFE6;padding:32px">` +
    `<table style="border-collapse:collapse;max-width:640px">${cells}</table>` +
    `</div>`
  );
}

async function sendEmail({
  subject,
  rows,
  replyTo,
}: {
  subject: string;
  rows: Array<[string, string]>;
  replyTo?: string;
}): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL ?? site.email;

  if (!apiKey) return { delivered: false, reason: "no RESEND_API_KEY" };
  if (!to) return { delivered: false, reason: "no INQUIRY_TO_EMAIL" };

  const response = await postJson(
    RESEND_URL,
    {
      from: process.env.INQUIRY_FROM_EMAIL ?? DEFAULT_FROM,
      to: [to],
      subject,
      text: textBody(rows),
      html: htmlBody(rows),
      // So the studio can answer the visitor by replying to the notification.
      ...(replyTo ? { reply_to: replyTo } : {}),
    },
    { Authorization: `Bearer ${apiKey}` },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return {
      delivered: false,
      reason: `Resend responded ${response.status}: ${detail.slice(0, 200)}`,
    };
  }

  return { delivered: true };
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                 */
/* -------------------------------------------------------------------------- */

export async function deliverInquiry(
  payload: Record<string, string | undefined>,
): Promise<DeliveryResult> {
  // Show the label the visitor actually chose, not its internal value.
  const subjectLabel =
    INQUIRY_SUBJECTS.find((option) => option.value === payload.subject)?.label ??
    payload.subject;

  const rows = asRows([
    ["Writing about", subjectLabel],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Project location", payload.projectLocation],
    ["Type of project", payload.projectType],
    ["Square footage", payload.squareFootage],
    ["Timeline", payload.timeline],
    ["Budget", payload.budget],
    ["Heard about us", payload.referral],
    ["About the piece", payload.piece],
    ["Message", payload.message],
  ]);

  const subject = `${site.name} inquiry — ${payload.name ?? "someone"}`;

  if (process.env.RESEND_API_KEY) {
    return sendEmail({ subject, rows, replyTo: payload.email });
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return { delivered: false, reason: "no RESEND_API_KEY and no INQUIRY_WEBHOOK_URL" };
  }

  const response = await postJson(webhook, {
    type: "inquiry",
    receivedAt: new Date().toISOString(),
    ...payload,
  });

  return response.ok
    ? { delivered: true }
    : { delivered: false, reason: `webhook responded ${response.status}` };
}

export async function deliverNewsletterSignup(
  email: string,
  source: string,
): Promise<DeliveryResult> {
  if (process.env.RESEND_API_KEY) {
    return sendEmail({
      subject: `${site.name} — new mailing list signup`,
      rows: [
        ["Email", email],
        ["Signed up from", source],
      ],
      replyTo: email,
    });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return {
      delivered: false,
      reason: "no RESEND_API_KEY and no NEWSLETTER_WEBHOOK_URL",
    };
  }

  const response = await postJson(webhook, {
    type: "newsletter",
    email,
    source,
    receivedAt: new Date().toISOString(),
  });

  return response.ok
    ? { delivered: true }
    : { delivered: false, reason: `webhook responded ${response.status}` };
}
