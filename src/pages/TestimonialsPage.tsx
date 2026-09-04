import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/reveal/Reveal";
import { RevealGroup } from "@/components/reveal/RevealGroup";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { QuoteCard } from "@/components/sections/QuoteCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { siteConfig } from "@/data/siteConfig";
import { assetPath } from "@/lib/utils";

const quotes = [
  {
    quote:
      "The team kept the facility clean and fully operational during renovation. Your SSHO and QCM were superb. The hallway remained open and safe, and the final project finish was of high quality.",
    name: "NAVFAC Inspector",
    attribution: "MCAS Miramar, Renovate Restrooms Building 7515",
    projectLink: "/projects#rrmcas",
  },
  {
    quote:
      "Contractor's project manager was exceptional. Commendable actions integrating and coordinating all activity to complete the contract. JXR maintained customer satisfaction, regulatory compliance, and timely management of subcontractors.",
    name: "Richard Ortega",
    attribution: "Contract Specialist, VHA — VA San Diego Medical Air Compressors Project",
    projectLink: "/projects#massu",
  },
  {
    quote:
      "JXR exceeded schedule expectations and made effective recommendations that saved time. Their professionalism was evident throughout the renovation, and their field leadership impressed both our team and hospital staff.",
    name: "Facilities Supervisor",
    attribution: "VA Loma Linda 4SW",
    projectLink: "/projects#4swbr",
  },
  {
    quote: "Performance consistently meets and exceeds government expectations. I would absolutely recommend them for future federal projects.",
    name: "Tammy Perrine",
    attribution: "Contract Specialist, VA NCO 22G",
  },
  {
    quote: "Outstanding performance in occupied space. JXR adjusted work for staff and patients daily.",
    name: "Andres Apolinar",
    attribution: "VA Contracting Specialist",
  },
  {
    quote:
      "Exceptional project management. Jesus Ramirez was instrumental in resolving issues early and kept the job moving efficiently with minimal change orders. A true partner in the field.",
    name: "Rusty Stevens",
    attribution: "Contracting Officer, VA Palo Alto Parking Lot Construction Project",
    projectLink: "/projects#parking-lot",
  },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function TestimonialsPage() {
  return (
    <main>
      <PageHero
        image="3X5A1160.jpg"
        imageAlt="Finished VA Los Angeles canteen renovation"
        eyebrow="Proven Performance"
        heading="See What Our Clients Say"
        sub="At JXR Constructors, Inc., performance is not a promise — it is a record. Our team has consistently received top-tier evaluations from contracting officers, resident engineers, and client facility teams across dozens of federal projects."
      />

      <section className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="text-center max-w-[640px] mx-auto mb-12">
            <SectionLabel>Client Reviews</SectionLabel>
            <h2>Proven Performance, Unmatched Safety</h2>
            <p>
              From infection-controlled hospital work to occupied base renovations, JXR has earned a reputation for
              reliability, integrity, and client-first coordination.
            </p>
          </Reveal>
          <RevealGroup as="div" className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-6">
            {quotes.map((q) => (
              <QuoteCard key={q.name} {...q} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-14 bg-bg-panel border-y border-hairline">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="max-w-[560px] mx-auto text-center">
            <h3 className="mb-2.5">Read More Reviews!</h3>
            <p className="mb-6">
              We invite you to explore the wonderful reviews our community has left for us on Google, Yelp, and
              Birdeye.
            </p>
            <RevealGroup as="div" className="flex justify-center gap-4 flex-wrap">
              <a
                href={siteConfig.reviews.google}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 px-[22px] py-3 rounded border border-hairline bg-bg-panel font-semibold text-[0.88rem] text-charcoal transition-shadow hover:shadow-[0_6px_16px_rgba(20,22,26,0.08)] hover:border-[#4285F4]"
              >
                <GoogleIcon />
                <span>Read Reviews on Google</span>
              </a>
              <a
                href={siteConfig.reviews.yelp}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 px-[22px] py-3 rounded border border-hairline bg-bg-panel font-semibold text-[0.88rem] text-charcoal transition-shadow hover:shadow-[0_6px_16px_rgba(20,22,26,0.08)] hover:border-[#FF1A1A]"
              >
                <img src={assetPath("YelpLogoAugust2021.jpg_copy.png")} alt="Yelp" className="h-[22px] w-auto" />
              </a>
              <a
                href={siteConfig.reviews.birdeye}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 px-[22px] py-3 rounded border border-hairline bg-bg-panel font-semibold text-[0.88rem] text-charcoal transition-shadow hover:shadow-[0_6px_16px_rgba(20,22,26,0.08)] hover:border-[#FF5A00]"
              >
                <img
                  src={assetPath("birdeye-logo.png")}
                  alt="Birdeye"
                  className="h-6 w-6 rounded"
                />
                <span>Read Reviews on Birdeye</span>
              </a>
            </RevealGroup>
          </Reveal>
        </div>
      </section>

      <section className="py-14 bg-jxr-black text-white">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="text-center max-w-[680px] mx-auto">
            <SectionLabel dark>Verified Excellence</SectionLabel>
            <h2 className="text-white">Performance Reviews That Speak for Themselves</h2>
            <p className="text-white/70">
              These are not just positive reviews — they are documented, performance-based evaluations from federal
              agencies that depend on reliability.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Ready to Start Your Project?"
        body="Schedule an appointment with our team and take the first step toward a successful build."
      />
    </main>
  );
}
