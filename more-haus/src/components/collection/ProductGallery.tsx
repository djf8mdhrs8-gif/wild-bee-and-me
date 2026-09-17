"use client";

import { useState } from "react";

import { EditorialImage } from "@/components/media/EditorialImage";
import type { Media } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Large plate with a row of frames underneath.
 *
 * The thumbnails are real buttons, so the gallery works from the keyboard and
 * announces which photograph is showing. With a single photograph the strip
 * does not render at all.
 */
export function ProductGallery({
  images,
  title,
}: {
  images: Media[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <div className="frame aspect-[4/5] md:aspect-[4/3]">
        <EditorialImage
          media={current}
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
        />
      </div>

      {images.length > 1 ? (
        <div
          className="rail mt-4 gap-3 md:gap-4"
          role="group"
          aria-label={`${title} — photographs`}
        >
          {images.map((media, index) => (
            <button
              key={`${media.note ?? media.alt}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-current={index === active ? "true" : undefined}
              aria-label={`Show photograph ${index + 1} of ${images.length}: ${media.alt}`}
              className={cn(
                "frame aspect-square w-20 shrink-0 transition-opacity duration-500 md:w-24",
                index === active ? "opacity-100" : "opacity-50 hover:opacity-85",
              )}
            >
              <EditorialImage media={media} sizes="96px" showCaption={false} />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 border transition-colors duration-500",
                  index === active ? "border-espresso" : "border-transparent",
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
