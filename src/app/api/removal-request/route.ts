import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { clean, cleanMultiline, clientIp, isEmail, rateLimit } from "@/lib/validate";

export const runtime = "nodejs";

const URGENCY_LABELS: Record<string, string> = {
  emergency: "🚨 EMERGENCY — bees inside the house or allergy risk",
  urgent: "⚠️ Urgent — needs someone within 24–48 hours",
  soon: "Soon — sometime this week",
  flexible: "Flexible — whenever suits",
};

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  if (!rateLimit(`removal:${clientIp(request)}`, 4, 60_000)) {
    return NextResponse.json(
      {
        error:
          "Too many submissions just now. Please call 239-600-1058 — that's faster anyway.",
      },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields.
  if (clean(form.get("company"))) {
    return NextResponse.json({ message: "Thanks — we'll be in touch shortly." });
  }

  const name = clean(form.get("name"), 120);
  const phone = clean(form.get("phone"), 40);
  const email = clean(form.get("email"), 254);
  const address = clean(form.get("address"), 300);
  const urgency = clean(form.get("urgency"), 40);
  const situation = cleanMultiline(form.get("situation"), 5000);

  if (!name || !phone || !isEmail(email) || !address || !situation) {
    return NextResponse.json(
      {
        error:
          "Please fill in your name, phone, a valid email, the property address and a description.",
      },
      { status: 400 },
    );
  }

  // Photos are optional; anything oversized or non-image is silently dropped
  // rather than failing the whole request — the removal details still matter.
  const attachments: Array<{ filename: string; content: Buffer }> = [];
  const photoNames: string[] = [];

  for (const entry of form.getAll("photos")) {
    if (attachments.length >= MAX_PHOTOS) break;
    if (!(entry instanceof File)) continue;
    if (!entry.type.startsWith("image/") || entry.size > MAX_PHOTO_BYTES) continue;

    const buffer = Buffer.from(await entry.arrayBuffer());
    // Strip any path components a client might have supplied.
    const filename = entry.name.replace(/[/\\]/g, "_").slice(-120) || "photo";
    attachments.push({ filename, content: buffer });
    photoNames.push(`${filename} (${Math.round(entry.size / 1024)} KB)`);
  }

  const isEmergency = urgency === "emergency";

  await notify({
    kind: "bee-removal-request",
    subject: `${isEmergency ? "🚨 EMERGENCY " : ""}Bee removal request — ${name}, ${address}`,
    fields: [
      { label: "Urgency", value: URGENCY_LABELS[urgency] ?? urgency ?? "Not given" },
      { label: "Name", value: name },
      { label: "Phone", value: phone },
      { label: "Email", value: email },
      { label: "Property address", value: address },
      { label: "Situation", value: situation },
      {
        label: "Photos",
        value: photoNames.length ? photoNames.join(", ") : "None attached",
      },
    ],
    attachments,
  });

  return NextResponse.json({
    message: isEmergency
      ? "Your request is flagged as urgent and has gone straight through. If you haven't heard back within the hour, please call 239-600-1058."
      : "We've got it. Ashley will be in touch — usually the same day — to confirm a time and talk you through what's involved.",
  });
}
