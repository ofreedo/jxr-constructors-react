import { Reveal } from "@/components/reveal/Reveal";
import { assetPath } from "@/lib/utils";

interface PageHeroProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  sub: string;
}

/**
 * The non-animated interior-page hero used on About, Services, Projects,
 * Testimonials, and Contact — shorter than the homepage hero, no CTAs,
 * no blueprint-trace animation (that's homepage-only).
 */
export function PageHero({ image, imageAlt, eyebrow, heading, sub }: PageHeroProps) {
  return (
    <section className="relative text-white bg-jxr-black overflow-hidden">
      <div className="absolute inset-0">
        <img src={assetPath(image)} alt={imageAlt} className="w-full h-full object-cover opacity-[0.55]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,22,26,0.94)_20%,rgba(20,22,26,0.55)_65%,rgba(20,22,26,0.35)_100%)]" />
      </div>
      <div className="relative z-[2] max-w-container mx-auto px-6">
        <Reveal className="py-[90px] pb-[70px] max-w-[640px]">
          <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-jxr-blue-bright mb-4.5 before:content-[''] before:w-7 before:h-px before:bg-jxr-blue-bright">
            {eyebrow}
          </div>
          <h1 className="text-white mb-5">{heading}</h1>
          <p className="text-[1.15rem] text-white/85 max-w-[560px]">{sub}</p>
        </Reveal>
      </div>
    </section>
  );
}
