import { Reveal } from "@/components/reveal/Reveal";
import { RevealGroup } from "@/components/reveal/RevealGroup";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { ShopifyBuyButton } from "@/components/sections/ShopifyBuyButton";
import { assetPath } from "@/lib/utils";

const features = [
  { title: "Heavy-Duty Build", text: "Designed for daily wear on and off the job site." },
  { title: "Official Branding", text: "High-stitch embroidery featuring the company logo." },
  { title: "Fast Shipping", text: "Delivered straight to your door or office." },
];

export default function ShopPage() {
  return (
    <main>
      <section className="bg-jxr-black py-20">
        <div className="max-w-container mx-auto px-6">
          <Reveal as="div" className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-jxr-blue-bright mb-4.5 before:content-[''] before:w-7 before:h-px before:bg-jxr-blue-bright">
                Official Company Merchandise
              </div>
              <h1 className="text-white mb-5">Built Tough: Official JXR Constructors, Inc. Gear</h1>
              <p className="text-[1.1rem] text-white/80 mb-[30px]">
                Represent the crew on and off the job site with our premium branded caps.
              </p>
              <Button href="#caps-grid" variant="primary">
                Get Yours
              </Button>
            </div>
            <div>
              <img
                src={assetPath("110d4812-f896-486e-bf9b-f84ddaa46676_550x825.png.webp")}
                alt="JXR Constructors branded caps in black, navy, white, and charcoal"
                className="w-full rounded"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-container mx-auto px-6">
          <RevealGroup as="div" className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-7">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <h3 className="text-[1.05rem] mb-2">{feature.title}</h3>
                <p className="text-[0.9rem]">{feature.text}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-[88px] bg-bg-panel border-y border-hairline">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="text-center mb-12">
            <SectionLabel>Shop</SectionLabel>
            <h2>Official Company Merchandise</h2>
            <p>Durable, high-quality caps built for the job site and beyond.</p>
          </Reveal>
          <ShopifyBuyButton />
        </div>
      </section>

      <CtaBand
        heading="Need Construction Done Right?"
        body="Schedule an appointment with our team and take the first step toward a successful build."
      />
    </main>
  );
}
