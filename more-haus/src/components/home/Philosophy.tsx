import { EditorialImage } from "@/components/media/EditorialImage";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Media } from "@/content/types";

const philosophyImage: Media = {
  src: null,
  alt: "A corner of a finished room, light falling across an antique table",
  note: "Philosophy — quiet interior detail, full bleed",
  ratio: "wide",
};

/**
 * The one section where a photograph and type occupy the same space.
 *
 * The image drifts slowly behind the statement as the section passes; the type
 * sits still. Under reduced motion the drift simply does not happen.
 */
export function Philosophy() {
  return (
    <section
      className="relative isolate overflow-hidden bg-espresso"
      aria-labelledby="philosophy"
    >
      <Parallax strength={9} className="absolute inset-0">
        <div className="relative h-full w-full opacity-45">
          <EditorialImage
            media={philosophyImage}
            sizes="100vw"
            dark
            showCaption={false}
          />
        </div>
      </Parallax>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-espresso/85 via-espresso/60 to-espresso/90"
      />

      <div className="wrap relative py-[clamp(7rem,20vw,16rem)]">
        <Reveal>
          <Eyebrow onDark>Approach</Eyebrow>
        </Reveal>

        <Reveal delay={0.08} distance={34}>
          <h2 id="philosophy" className="display-lg mt-8 max-w-[14ch] text-ivory">
            Nothing here arrived{" "}
            <span className="aside-italic text-olive">all at once</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="lede mt-10 max-w-[46ch] text-parchment/85">
            We buy across months — from estates, auctions, and the backs of
            barns — and let the mix do the work. A room that feels settled is
            almost never a room that was finished in an afternoon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
