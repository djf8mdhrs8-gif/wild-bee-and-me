import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import type { Media } from "@/content/types";

/**
 * Lays a project's photographs out as a magazine feature rather than a grid:
 * a full-bleed opener, a pair, a large plate, a small detail dropped out of
 * alignment, and round again. The pattern repeats for as many photographs as a
 * project has, so galleries of four and of twenty both read deliberately.
 */
const LAYOUT = [
  { kind: "bleed", aspect: "aspect-[16/10] md:aspect-[21/9]", sizes: "100vw" },
  {
    kind: "grid",
    span: "md:col-span-5",
    aspect: "aspect-[3/4]",
    offset: "",
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
  {
    kind: "grid",
    span: "md:col-span-6 md:col-start-7",
    aspect: "aspect-[4/5]",
    offset: "md:mt-[5vw] lg:mt-[6vw]",
    sizes: "(min-width: 768px) 46vw, 100vw",
  },
  {
    kind: "grid",
    span: "md:col-span-10 md:col-start-2",
    aspect: "aspect-[16/9]",
    offset: "",
    sizes: "(min-width: 768px) 80vw, 100vw",
  },
  {
    kind: "grid",
    span: "md:col-span-4 md:col-start-8",
    aspect: "aspect-square",
    offset: "",
    sizes: "(min-width: 768px) 32vw, 100vw",
  },
] as const;

export function ProjectGallery({ gallery }: { gallery: Media[] }) {
  if (gallery.length === 0) return null;

  return (
    <div className="wrap">
      <div className="grid items-start gap-x-8 gap-y-[clamp(2.5rem,6vw,5rem)] md:grid-cols-12">
        {gallery.map((media, index) => {
          const layout = LAYOUT[index % LAYOUT.length];

          if (layout.kind === "bleed") {
            return (
              <Reveal
                key={`${media.note ?? media.alt}-${index}`}
                className="md:col-span-12"
                distance={32}
              >
                <figure className="bleed">
                  <div className={`frame ${layout.aspect}`}>
                    <EditorialImage media={media} sizes={layout.sizes} />
                  </div>
                </figure>
              </Reveal>
            );
          }

          return (
            <Reveal
              key={`${media.note ?? media.alt}-${index}`}
              className={`${layout.span} ${layout.offset}`}
              distance={32}
            >
              <figure>
                <div className={`frame ${layout.aspect}`}>
                  <EditorialImage media={media} sizes={layout.sizes} />
                </div>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
