import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { clean, cleanMultiline, clientIp, isEmail, rateLimit } from "@/lib/validate";

export const runtime = "nodejs";

const TOPIC_LABELS: Record<string, string> = {
  "bee-removal": "Bee removal enquiry",
  order: "Order or product question",
  wholesale: "Wholesale / farmers market",
  "swarm-report": "Swarm report",
  other: "Other",
};

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientIp(request)}`, 4, 60_000)) {
    return NextResponse.json(
      { error: "Too many messages just now. Give it a minute, or call us." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — a filled hidden field means a bot. Return success so it moves on.
  if (clean(payload.company)) {
    return NextResponse.json({ message: "Thanks — we'll be in touch." });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254);
  const phone = clean(payload.phone, 40);
  const topic = clean(payload.topic, 40);
  const message = cleanMultiline(payload.message, 5000);

  if (!name || !isEmail(email) || !message) {
    return NextResponse.json(
      { error: "Please add your name, a valid email and a message." },
      { status: 400 },
    );
  }

  await notify({
    kind: "contact-message",
    subject: `Website message: ${TOPIC_LABELS[topic] ?? "General enquiry"} — ${name}`,
    fields: [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone || "Not given" },
      { label: "Topic", value: TOPIC_LABELS[topic] ?? topic ?? "Not given" },
      { label: "Message", value: message },
    ],
  });

  return NextResponse.json({
    message:
      "Thanks — your message is with us. We usually reply within a day, and sooner if it's about bees.",
  });
}
