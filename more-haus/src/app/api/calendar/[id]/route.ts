import { buildICS } from "@/lib/calendar";
import { getEdit } from "@/lib/content";
import { homeEditEvents } from "@/content/home-edit";

/** Serves a single Home Edit as a calendar file for Apple Calendar and Outlook. */
export function generateStaticParams() {
  return homeEditEvents.map((event) => ({ id: event.id }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = getEdit(id);

  if (!event) {
    return new Response("Not found", { status: 404 });
  }

  // The id comes from a content file rather than the request, but it still
  // ends up in a response header, so keep it to characters that cannot break
  // out of one.
  const safeId = event.id.replace(/[^A-Za-z0-9._-]/g, "");

  return new Response(buildICS(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="more-haus-${safeId}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
