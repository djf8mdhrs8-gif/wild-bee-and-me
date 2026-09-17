import Image from "next/image";

import type { Media } from "@/content/types";
import { cn } from "@/lib/cn";
import { PlaceholderArt } from "./PlaceholderArt";

/**
 * Every photograph on the site goes through here.
 *
 * It fills its parent, so the parent owns the crop — put an aspect ratio (or a
 * fixed height) and `.frame` on the wrapper and this handles the rest. When the
 * content file has no `src` yet, it renders a captioned placeholder instead,
 * which means the layout is already final before a single photograph arrives.
 */
export function EditorialImage({
  media,
  /** Tells the browser how wide this will render, so it fetches the right file. */
  sizes = "100vw",
  /** Set on the largest above-the-fold image of a page. Only ever one. */
  priority = false,
  /** Scale the image gently when an ancestor `.group` is hovered. */
  zoom = false,
  /** Use the dark placeholder palette — for slots that sit under light type. */
  dark = false,
  showCaption = true,
  className,
}: {
  media: Media;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
  dark?: boolean;
  showCaption?: boolean;
  className?: string;
}) {
  if (!media.src) {
    return (
      <PlaceholderArt
        note={media.note}
        alt={media.alt}
        dark={dark}
        showCaption={showCaption}
        className={className}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("frame-media", zoom && "frame-zoom", className)}
    />
  );
}
