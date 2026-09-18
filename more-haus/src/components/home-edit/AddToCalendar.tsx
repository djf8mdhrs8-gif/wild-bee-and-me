import type { HomeEditEvent } from "@/content/types";
import { cn } from "@/lib/cn";
import { googleCalendarUrl } from "@/lib/calendar";

/**
 * Two plain links rather than a dropdown: Google for everyone on Android or
 * Gmail, and a downloadable .ics for Apple Calendar and Outlook. No JavaScript
 * involved, so it works on the first paint.
 */
export function AddToCalendar({
  event,
  className,
  onDark = false,
}: {
  event: HomeEditEvent;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      <span className={cn("label", onDark ? "text-parchment/70" : "text-smoke")}>
        Add to calendar
      </span>
      <a
        href={googleCalendarUrl(event)}
        target="_blank"
        rel="noreferrer noopener"
        className="link-rule label"
      >
        Google
      </a>
      <a
        href={`/api/calendar/${event.id}`}
        className="link-rule label"
        download={`more-haus-${event.id}.ics`}
      >
        Apple / Outlook
      </a>
    </div>
  );
}
