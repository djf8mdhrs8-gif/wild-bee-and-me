import "server-only";

/**
 * Outbound notifications for form submissions and orders.
 *
 * Two independent, optional channels — configure either, both, or neither:
 *
 *  1. Email via Resend (RESEND_API_KEY + NOTIFY_TO_EMAIL + NOTIFY_FROM_EMAIL)
 *  2. Webhook POST (NOTIFY_WEBHOOK_URL) — works with Zapier, Make, n8n,
 *     Slack Workflow Builder, or any endpoint that accepts JSON.
 *
 * With nothing configured the submission is logged to the server console and
 * the request still succeeds, so the site is deployable before any keys exist.
 */

export type NotificationKind =
  | "bee-removal-request"
  | "contact-message"
  | "newsletter-signup"
  | "order";

export type Notification = {
  kind: NotificationKind;
  subject: string;
  /** Ordered label/value pairs, rendered into both the email and the webhook. */
  fields: Array<{ label: string; value: string }>;
  /** Optional files (e.g. photos of a hive) attached to the email only. */
  attachments?: Array<{ filename: string; content: Buffer }>;
};

type DeliveryResult = {
  email: "sent" | "skipped" | "failed";
  webhook: "sent" | "skipped" | "failed";
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const toPlainText = (notification: Notification) =>
  notification.fields.map((field) => `${field.label}: ${field.value}`).join("\n");

const toHtml = (notification: Notification) => `
  <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#241c13;max-width:640px">
    <h2 style="font-family:Georgia,serif;color:#1e3a2f;margin:0 0 16px">${escapeHtml(
      notification.subject,
    )}</h2>
    <table style="border-collapse:collapse;width:100%">
      ${notification.fields
        .map(
          (field) => `<tr>
            <td style="padding:8px 12px;background:#f6f0e2;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(
              field.label,
            )}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #ece3d0;white-space:pre-wrap">${escapeHtml(
              field.value,
            )}</td>
          </tr>`,
        )
        .join("")}
    </table>
    <p style="margin-top:24px;font-size:12px;color:#5c5245">
      Sent from thewildbeeandme.com
    </p>
  </div>`;

async function sendEmail(notification: Notification): Promise<DeliveryResult["email"]> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_TO_EMAIL;
  const from = process.env.NOTIFY_FROM_EMAIL;

  if (!apiKey || !to || !from) return "skipped";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        subject: notification.subject,
        text: toPlainText(notification),
        html: toHtml(notification),
        attachments: notification.attachments?.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.content.toString("base64"),
        })),
      }),
    });

    if (!response.ok) {
      console.error("[notify] Resend rejected the email", response.status, await response.text());
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("[notify] Email delivery threw", error);
    return "failed";
  }
}

async function sendWebhook(
  notification: Notification,
): Promise<DeliveryResult["webhook"]> {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return "skipped";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: notification.kind,
        subject: notification.subject,
        // Slack-friendly flat text alongside the structured payload.
        text: `*${notification.subject}*\n${toPlainText(notification)}`,
        fields: Object.fromEntries(
          notification.fields.map((field) => [field.label, field.value]),
        ),
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error("[notify] Webhook rejected the payload", response.status);
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("[notify] Webhook delivery threw", error);
    return "failed";
  }
}

export async function notify(notification: Notification): Promise<DeliveryResult> {
  const [email, webhook] = await Promise.all([
    sendEmail(notification),
    sendWebhook(notification),
  ]);

  if (email === "skipped" && webhook === "skipped") {
    // No channel configured yet — make sure the submission is not simply lost.
    console.info(
      `[notify] ${notification.kind} received (no delivery channel configured)\n${toPlainText(
        notification,
      )}`,
    );
  }

  return { email, webhook };
}
