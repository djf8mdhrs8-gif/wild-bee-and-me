import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { journal } from "@/lib/content";
import { site } from "@/content/site";

/**
 * Interiors, finds, sourcing and studio life, in a grid with the air left in.
 *
 * Column spans, aspect ratios and vertical offsets are assigned per position
 * rather than uniformly, so it reads as a pinned wall instead of an embedded
 * social feed.
 */

const LAYOUT = [
  { span: "md:col-span-4", aspect: "aspect-[3/4]", offset: "" },
  { span: "md:col-span-3", aspect: "aspect-square", offset: "md:mt-[5vw]" },
  { span: "md:col-span-5", aspect: "aspect-[4/3]", offset: "md:mt-[2vw]" },
  { span: "md:col-span-3", aspect: "aspect-square", offset: "md:mt-[3vw]" },
  { span: "md:col-span-4", aspect: "aspect-[3/4]", offset: "" },
  { span: "md:col-span-5", aspect: "aspect-[4/3]", offset: "md:mt-[6vw]" },
  { span: "md:col-span-4", aspect: "aspect-[3/4]", offset: "md:mt-[1vw]" },
  { span: "md:col-span-3", aspect: "aspect-square", offset: "md:mt-[4vw]" },
];

export function JournalGallery() {
  const images = journal.slice(0, LAYOUT.length);
  const instagram = site.social.find((channel) => channel.label === "Instagram");

  if (images.length === 0) return null;

  return (
    <section
      className="bg-parchment py-[clamp(5rem,12vw,10rem)]"
      aria-labelledby="journal"
    >
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>From the Studio</Eyebrow>
              <h2 id="journal" className="display-md mt-6 max-w-[16ch]">
                Rooms, finds and the road in between.
              </h2>
            </div>
            {instagram ? (
              <a
                href={instagram.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-rule label"
              >
                Follow along
              </a>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-[clamp(3rem,7vw,5rem)] grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          {images.map((media, index) => {
            const layout = LAYOUT[index];
            return (
              <Reveal
                key={`${media.note ?? media.alt}-${index}`}
                className={`${layout.span} ${layout.offset}`}
                delay={(index % 3) * 0.06}
                distance={24}
              >
                <figure className="group">
                  <div className={`frame ${layout.aspect}`}>
                    <EditorialImage
                      media={media}
                      zoom
                      sizes="(min-width: 768px) 30vw, 45vw"
                      showCaption={false}
                    />
                  </div>
                  <figcaption className="label-sm mt-3 text-smoke/75">
                    {media.note ?? media.alt}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
