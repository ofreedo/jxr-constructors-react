import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/reveal/Reveal";
import { RevealGroup } from "@/components/reveal/RevealGroup";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { CtaBand } from "@/components/sections/CtaBand";

const capabilities = [
  "New Construction",
  "Renovations",
  "Turnkey Construction",
  "Civil Work / Landscaping",
  "Project Management",
  "Scheduling (P6 CPM)",
  "Estimating",
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        image="_X5A2799.jpg"
        imageAlt="Finished clinical facility renovation, VA San Diego"
        eyebrow="Our Services"
        heading="Built for Federal Compliance. Built for Commercial Speed."
        sub="End-to-end construction services with particular strength in occupied facility renovations, design-build execution, and high-compliance public contracts."
      />

      {/* Track A: Federal & Institutional */}
      <section id="federal-expertise" className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="max-w-[720px] mb-10">
            <SectionLabel>For Federal & Institutional Clients</SectionLabel>
            <h2>Compliance-First Construction, in Environments That Can't Afford Mistakes</h2>
            <p>
              We specialize in VA medical centers, military installations, and government-owned campuses —
              occupied, secure, and highly regulated environments where the standard for compliance is absolute.
            </p>
          </Reveal>
          <RevealGroup as="div" className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-7">
            <div id="federal-institutional-expertise" className="bg-bg-panel border border-hairline border-t-[3px] border-t-jxr-blue rounded p-8 pt-8">
              <h3 className="mb-3.5">Federal & Institutional Expertise</h3>
              <p className="text-[0.95rem]">
                We are specialists in VA medical centers, military installations, and government-owned campuses. Our
                team is trained in:
              </p>
              <ul className="list-none mt-4 p-0">
                <li className="text-[0.9rem] text-charcoal-soft py-2.5 border-t border-hairline">
                  <strong className="text-jxr-black">ICRA</strong> (Infection Control Risk Assessment) — protocols
                  that keep occupied hospitals and clinics safe during active renovation.
                </li>
                <li className="text-[0.9rem] text-charcoal-soft py-2.5 border-t border-hairline">
                  <strong className="text-jxr-black">ATFP</strong> (Anti-Terrorism/Force Protection) —
                  security-conscious construction practices required on military and government installations.
                </li>
                <li className="text-[0.9rem] text-charcoal-soft py-2.5 border-t border-hairline">
                  <strong className="text-jxr-black">Phased Construction</strong> — sequencing work so secure or
                  occupied facilities never fully shut down.
                </li>
              </ul>
            </div>
            <div id="general-contracting" className="bg-bg-panel border border-hairline border-t-[3px] border-t-jxr-blue rounded p-8 pt-8">
              <h3 className="mb-3.5">General Contracting</h3>
              <p className="text-[0.95rem]">
                We manage labor, subcontractors, materials, and logistics with military efficiency. Our GC delivery
                method ensures accurate estimates, tight scheduling, and full code compliance — especially in
                secure and active environments.
              </p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Track B: Commercial & Tenant Improvement */}
      <section className="py-[88px] bg-bg-panel border-y border-hairline">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="max-w-[720px] mb-10">
            <SectionLabel>For Commercial & Tenant Improvement Clients</SectionLabel>
            <h2>Minimal Disruption, Faster Timelines</h2>
            <p>
              For offices, clinics, and commercial spaces, the priority shifts — speed, cost control, and staying
              open for business while the work gets done.
            </p>
          </Reveal>
          <RevealGroup as="div" className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-7">
            <div id="tenant-improvements" className="bg-bg-panel border border-hairline border-t-[3px] border-t-jxr-blue rounded p-8 pt-8">
              <h3 className="mb-3.5">Tenant Improvements</h3>
              <p className="text-[0.95rem]">
                From government offices to outpatient clinics and VA research centers, we handle all interior
                construction needs — ADA compliance, mechanical upgrades, finishes, and furniture installs —
                without disrupting day-to-day operations.
              </p>
            </div>
            <div id="design-build" className="bg-bg-panel border border-hairline border-t-[3px] border-t-jxr-blue rounded p-8 pt-8">
              <h3 className="mb-3.5">Design-Build</h3>
              <p className="text-[0.95rem]">
                JXR brings design, engineering, and construction together under one roof. This method allows us to
                reduce change orders, accelerate timelines, and maintain quality control from concept through
                closeout.
              </p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Capabilities strip */}
      <section className="py-14 bg-jxr-black text-white">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="text-center mb-12">
            <SectionLabel dark>Full Capabilities</SectionLabel>
            <h2 className="text-white">Every Phase of Construction, Under One Team</h2>
          </Reveal>
          <RevealGroup as="div" className="flex flex-wrap justify-center gap-3">
            {capabilities.map((cap) => (
              <span key={cap} className="border border-white/25 text-white text-[0.85rem] font-medium px-5 py-2.5 rounded">
                {cap}
              </span>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Closing CTA copy */}
      <section className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="max-w-[720px] mx-auto text-center">
            <h2>Trusted Construction Experts: Seamless Renovations, Smart Designs & High-Compliance Execution</h2>
            <p className="mb-7">
              Whether you're tackling occupied facility renovations, infrastructure upgrades, or medical
              installations, we bring confidence, precision, and expertise to every project. Our end-to-end services
              ensure smooth execution from demolition to design-build completion, minimizing disruption and
              maximizing efficiency.
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
