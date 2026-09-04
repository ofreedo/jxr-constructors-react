import { Button } from "@/components/ui/Button";
import { HeroAnimated } from "@/components/hero/HeroAnimated";
import { Reveal } from "@/components/reveal/Reveal";
import { RevealGroup } from "@/components/reveal/RevealGroup";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { ProofBar } from "@/components/sections/ProofBar";
import { ClientRow } from "@/components/sections/ClientRow";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { QuoteCard } from "@/components/sections/QuoteCard";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { assetPath } from "@/lib/utils";

const trustedClients = [
  "Department of Veterans Affairs",
  "NAVFAC",
  "U.S. Army Corps of Engineers",
  "National Cemetery Administration",
  "San Diego International Airport",
];

const featuredProjects = [
  {
    image: "_X5A2799.jpg",
    alt: "VA San Diego Operating Room and PACU Renovation",
    tag: "Federal — Medical Facility",
    title: "VA San Diego — Operating Room & PACU Renovation",
    description:
      "5,036 SF of active surgical space renovated, including 6 ORs and 8 PACU beds, completed with zero disruption to patient care.",
    projectLink: "/projects#orpa",
  },
  {
    image: "t2wrr-mens-restroom.jpg",
    alt: "San Diego International Airport Terminal 2 restroom remodel",
    tag: "Commercial — Aviation",
    title: "San Diego International Airport — Terminal 2 Restroom Remodel",
    description: "Complete gut-and-rebuild of public restrooms with premium finishes and zero passenger impact.",
    projectLink: "/projects#t2wrr",
  },
  {
    image: "VA.01-Bldg 2 Parking Lot-1262.jpg",
    alt: "VA Palo Alto parking lot construction",
    tag: "Federal — Civil Work",
    title: "VA Palo Alto — Parking Lot Construction",
    description:
      "Full-scale parking lot construction with lighting, striping, and landscaping, delivered with minimal change orders.",
    projectLink: "/projects#parking-lot",
  },
];

const services = [
  {
    title: "General Contracting",
    description: "Labor, subcontractors, materials, and logistics managed with military efficiency.",
    link: "/services#general-contracting",
  },
  {
    title: "Design-Build",
    description: "Design, engineering, and construction under one roof — fewer change orders, faster timelines.",
    link: "/services#design-build",
  },
  {
    title: "Tenant Improvements",
    description: "Interior construction for offices and clinics, without disrupting daily operations.",
    link: "/services#tenant-improvements",
  },
  {
    title: "Federal & Institutional Expertise",
    description: "Trained in infection control, ATFP, and ICRA across sensitive, occupied environments.",
    link: "/services#federal-expertise",
  },
];

export default function HomePage() {
  return (
    <main>
      {/*
        Full blueprint-reveal intro (Phase 6): black screen -> logo/flag
        SVG trace draw-in -> logo shrinks to its real position on the
        building signage -> photo + content fade in together. See
        HeroAnimated.tsx for the ported geometry/timing detail.
        prefers-reduced-motion skips straight to the settled end state
        (photo at 0.55 opacity, gradient + content visible), matching
        the original's accessibility fallback exactly.

        Deliberate deviation from the original: the original's hero
        height is purely content+padding driven (no min-height anywhere
        in its CSS, confirmed by reading its actual stylesheet), so on
        tall viewports it doesn't fill the screen and crops the truck
        photo higher than intended. min-h-[100svh] (not 100vh, to avoid
        mobile browser-chrome overlap) + flex-centering was added in
        HeroAnimated so the hero always fills the visible viewport and
        shows the full photo — confirmed with the user this is desired
        new behavior, not a fidelity bug to avoid.
      */}
      <HeroAnimated>
        <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-jxr-blue-bright mb-4.5 before:content-[''] before:w-7 before:h-px before:bg-jxr-blue-bright">
          Service-Disabled Veteran-Owned Small Business
        </div>
        <h1 className="text-white mb-5">
          Veteran-Owned.
          <br />
          Precision-Built.
          <br />
          Excellence Delivered.
        </h1>
        <p className="text-[1.15rem] text-white/85 max-w-[560px] mb-[34px]">
          Founded by a Marine Corps combat veteran and licensed structural engineer, JXR has delivered $30M+ in
          federal and commercial construction with zero safety violations.
        </p>
        <div className="flex gap-3.5 flex-wrap">
          <Button to="/contact" variant="hero-primary">
            Schedule an Appointment
          </Button>
          <Button to="/projects" variant="outline-light">
            View Our Work
          </Button>
        </div>
        <div className="inline-flex items-center gap-3 mt-8 pt-6 border-t border-white/[0.18]">
          <img
            src={assetPath("CVE-Certified-Logo-thumbx.jpg")}
            alt="CVE-Certified Service-Disabled Veteran-Owned Small Business"
            className="h-[52px] w-[52px] rounded-full bg-white"
          />
          <span className="text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-white/75">
            CVE-Certified SDVOSB / DVBE
          </span>
          <span className="w-px h-7 bg-white/[0.18]" />
          <a
            href="https://www.bbb.org/us/ca/san-diego/profile/general-contractor/jxr-constructors-inc-1126-1000089129/#sealclick"
            target="_blank"
            rel="nofollow"
            className="inline-flex items-center bg-white px-2.5 py-1.5 rounded"
          >
            <img
              src="https://seal-central-northern-western-arizona.bbb.org/seals/blue-seal-293-61-bbb-1000089129.png"
              alt="JXR Constructors Inc BBB Business Review"
              className="h-8 w-auto"
            />
          </a>
        </div>
      </HeroAnimated>

      <ProofBar variant="hero-sync" />

      <section className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="mb-12">
            <SectionLabel>Federal & Commercial Trust</SectionLabel>
            <h2>Trusted by the Institutions That Can't Afford Mistakes</h2>
            <p>
              JXR has built a record of reliability across the agencies and facilities where compliance, security,
              and continuity of operations aren't optional.
            </p>
          </Reveal>
          <RevealGroup>
            <ClientRow clients={trustedClients} />
          </RevealGroup>
        </div>
      </section>

      <section className="py-[88px] bg-bg-panel border-y border-hairline">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="mb-12">
            <SectionLabel>Featured Work</SectionLabel>
            <h2>Delivering Excellence, One Project at a Time</h2>
            <p>
              A sample of the federal, institutional, and civil work JXR has completed — from active hospital
              renovations to airport terminals.
            </p>
          </Reveal>
          <RevealGroup as="div" className="grid grid-cols-3 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-7">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-[88px] bg-jxr-black text-white">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="mb-12 text-center max-w-[620px] mx-auto">
            <SectionLabel dark>Proven Performance</SectionLabel>
            <h2 className="text-white">See What Our Clients Say</h2>
            <p className="text-white/70">
              Performance is not a promise — it's a record. These are documented evaluations from the federal
              contracting officers who depend on reliability.
            </p>
          </Reveal>
          <RevealGroup as="div" className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-6">
            <QuoteCard
              quote="Exceptional project management. Jesus Ramirez was instrumental in resolving issues early and kept the job moving efficiently with minimal change orders. A true partner in the field."
              name="Rusty Stevens"
              attribution="Contracting Officer, VA Palo Alto Parking Lot Construction Project"
            />
            <QuoteCard
              quote="Contractor's project manager was exceptional. Commendable actions integrating and coordinating all activity to complete the contract. JXR maintained customer satisfaction, regulatory compliance, and timely management of subcontractors."
              name="Richard Ortega"
              attribution="Contract Specialist, VHA — VA San Diego Medical Air Compressors Project"
            />
          </RevealGroup>
          <div className="text-center mt-9">
            <Button to="/testimonials" variant="outline-light">
              Read All Testimonials
            </Button>
          </div>
        </div>
      </section>

      <section className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="mb-12">
            <SectionLabel>What We Do</SectionLabel>
            <h2>Built for Federal Compliance. Built for Commercial Speed.</h2>
          </Reveal>
          <RevealGroup as="div" className="grid grid-cols-4 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[22px]">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        heading="Ready to Start Your Project?"
        body="Schedule an appointment with our team and take the first step toward a successful build."
      />
    </main>
  );
}
