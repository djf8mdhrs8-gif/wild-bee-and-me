import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { clean, clientIp, isEmail, rateLimit } from "@/lib/validate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!rateLimit(`newsletter:${clientIp(request)}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "That's a few too many tries. Give it a minute and try again." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = clean((payload as { email?: unknown })?.email, 254);

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  await notify({
    kind: "newsletter-signup",
    subject: "New Join the Hive signup",
    fields: [
      { label: "Email", value: email },
      { label: "Source", value: "Website newsletter form" },
    ],
  });

  return NextResponse.json({
    message:
      "You're on the list. We'll let you know the moment the next batch of honey comes off the hives.",
  });
}
