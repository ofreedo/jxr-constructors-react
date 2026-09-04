import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/reveal/Reveal";
import { RevealGroup } from "@/components/reveal/RevealGroup";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { ClientRow } from "@/components/sections/ClientRow";
import { CtaBand } from "@/components/sections/CtaBand";
import { Timeline } from "@/components/sections/Timeline";
import { CountUp } from "@/components/reveal/CountUp";
import { assetPath } from "@/lib/utils";

const timelineItems = [
  { year: "2012", text: "Jesus Ramirez founds JXR Constructors, Inc. in San Diego." },
  { year: "Est. 2013", text: "JXR earns SDVOSB and DVBE certification, opening the door to federal contracting." },
  {
    year: "2012–Today",
    text: "Federal partnerships expand to the VA, NAVFAC, U.S. Army Corps of Engineers, and the Federal Bureau of Prisons.",
  },
  { year: "Today", text: "$30M+ in completed construction, zero safety violations, zero terminated or delayed contracts." },
];

const values = [
  {
    title: "Honesty",
    text: "Our mission is to professionally educate every employee and customer on the construction process, and build trust through transparent communication — not surprises at closeout.",
  },
  {
    title: "Professionalism",
    text: "From FAR compliance to infection control protocols, we hold ourselves to the standards required to work in the most sensitive, high-compliance environments — occupied hospitals, secure military installations, and active public facilities.",
  },
  {
    title: "Pride in Our Work",
    text: "Zero safety violations across every federal and public-sector job. That record isn't an accident — it's the standard we hold every project to.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        image="3X5A0600.jpg"
        imageAlt="JXR Constructors finished medical facility renovation"
        eyebrow="About JXR Constructors"
        heading="Veteran-Owned. Mission-Driven."
        sub="Built on the same discipline, accountability, and attention to detail our founder learned in the Marine Corps — applied to every project we deliver."
      />

      {/* Founder narrative */}
      <section className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <Reveal
            as="div"
            className="grid grid-cols-[0.85fr_1.15fr] max-[900px]:grid-cols-1 gap-14 max-[900px]:gap-8 items-center"
          >
            <div>
              <img src={assetPath("Screenshot-team-crew.jpg")} alt="JXR Constructors team on-site at a jobsite briefing" className="w-full rounded" />
              <div className="text-[0.8rem] text-charcoal-soft mt-3 italic">
                The JXR team on-site — the same discipline and accountability on every job.
              </div>
            </div>
            <div>
              <SectionLabel>Our Founder</SectionLabel>
              <h2>A Marine Corps Veteran, Building With the Same Discipline He Served With</h2>
              <p className="text-[1.15rem] text-charcoal font-medium">
                In 2012, U.S. Marine Corps combat veteran Jesus Ramirez founded JXR Constructors, Inc. with a clear
                mission: deliver construction services with unmatched precision, integrity, and personal
                accountability.
              </p>
              <p>
                Jesus holds structural engineering credentials from UC San Diego, a technical foundation that shapes
                how JXR approaches every project — from occupied hospital renovations to secure federal
                installations. That combination of military discipline and engineering rigor is what has allowed
                JXR to take on some of the most demanding, compliance-heavy construction work in the region, without
                a single terminated or delayed federal contract to date.
              </p>
              <p>
                Under his leadership, JXR has grown into a team with 70+ years of combined construction experience,
                while never losing the personal accountability the company was founded on.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-[88px] bg-bg-panel border-y border-hairline">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="text-center mb-12">
            <SectionLabel>Our Story</SectionLabel>
            <h2>
              From First Contract to <CountUp to={30} prefix="$" suffix="M+" /> Delivered
            </h2>
          </Reveal>
          <RevealGroup>
            <Timeline items={timelineItems} />
          </RevealGroup>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-14">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="text-center mb-12">
            <SectionLabel>Certifications</SectionLabel>
            <h2>Certified to Do the Work Others Can't Bid On</h2>
          </Reveal>
          <RevealGroup as="div" className="flex justify-center items-stretch gap-5 flex-wrap">
            <div className="flex items-center gap-3 bg-bg-panel border border-hairline rounded px-[22px] py-4">
              <img src={assetPath("CVE-Certified-Logo-thumbx.jpg")} alt="CVE-Certified SDVOSB" className="h-11 w-11 rounded-full object-cover" />
              <span className="text-[0.85rem] font-semibold text-charcoal max-w-[140px]">CVE-Certified SDVOSB</span>
            </div>
            <div className="flex items-center gap-3 bg-bg-panel border border-hairline rounded px-[22px] py-4">
              <span className="font-head text-[1.4rem] font-bold text-jxr-blue">DVBE</span>
              <span className="text-[0.85rem] font-semibold text-charcoal">Disabled Veteran Business Enterprise</span>
            </div>
            <div className="flex items-center gap-3 bg-bg-panel border border-hairline rounded px-[22px] py-4">
              <span className="font-head text-[1.4rem] font-bold text-jxr-blue">CA</span>
              <span className="text-[0.85rem] font-semibold text-charcoal">Certified California Small Business</span>
            </div>
            <div className="flex items-center gap-3 bg-bg-panel border border-hairline rounded px-[22px] py-4">
              <a
                href="https://www.bbb.org/us/ca/san-diego/profile/general-contractor/jxr-constructors-inc-1126-1000089129/#sealclick"
                target="_blank"
                rel="nofollow"
              >
                <img
                  src="https://seal-central-northern-western-arizona.bbb.org/seals/blue-seal-293-61-bbb-1000089129.png"
                  alt="JXR Constructors Inc BBB Business Review"
                />
              </a>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Team */}
      <section className="py-[88px] bg-bg-panel border-y border-hairline">
        <div className="max-w-container mx-auto px-6">
          <Reveal as="div" className="grid grid-cols-[1.4fr_1fr] max-[900px]:grid-cols-1 gap-12 items-center">
            <div>
              <SectionLabel>Our Team</SectionLabel>
              <h2>70+ Years of Combined Construction Experience</h2>
              <p>
                JXR's field leadership and project management team bring decades of hands-on experience across
                federal, institutional, and commercial construction — from hospital renovations completed without
                disrupting patient care, to military base improvements executed under strict security and
                compliance protocols.
              </p>
              <p>
                Every project is staffed with experienced personnel trained in FAR compliance and infection control
                protocols, so clients get the same discipline and attention to detail on every job, regardless of
                size.
              </p>
            </div>
            <div className="bg-jxr-black text-white p-10 pt-10 rounded text-center">
              <span className="block font-head text-[2.6rem] text-white leading-none">
                <CountUp to={70} suffix="+" />
              </span>
              <span className="block text-[0.78rem] tracking-[0.05em] uppercase text-white/65 mt-2">
                Years Combined Experience
              </span>
              <div className="h-px my-6 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.2)_0,rgba(255,255,255,0.2)_6px,transparent_6px,transparent_12px)]" />
              <span className="block font-head text-[2.6rem] text-white leading-none">0</span>
              <span className="block text-[0.78rem] tracking-[0.05em] uppercase text-white/65 mt-2">
                Terminated or Delayed Contracts
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="text-center mb-12">
            <SectionLabel>What We Stand For</SectionLabel>
            <h2>Honesty. Professionalism. Pride in Our Work.</h2>
          </Reveal>
          <RevealGroup as="div" className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-7">
            {values.map((value) => (
              <div key={value.title} className="bg-bg-panel border border-hairline rounded p-8 pt-8">
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-[0.92rem]">{value.text}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Federal expertise */}
      <section className="py-[88px] bg-jxr-black text-white">
        <div className="max-w-container mx-auto px-6">
          <Reveal className="text-center mb-12 max-w-[640px] mx-auto">
            <SectionLabel dark>Federal Expertise</SectionLabel>
            <h2 className="text-white">Trusted With the Work That Can't Afford Mistakes</h2>
            <p className="text-white/70">
              JXR specializes in federal government contracting, with direct experience serving some of the most
              demanding institutional clients in the country.
            </p>
          </Reveal>
          <RevealGroup>
            <ClientRow
              center
              clients={[
                "Department of Veterans Affairs",
                "NAVFAC",
                "U.S. Army Corps of Engineers",
                "Federal Bureau of Prisons",
              ]}
            />
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        heading="Veteran-Owned. Mission-Driven."
        body="Schedule an appointment with our team and see the difference discipline makes."
      />
    </main>
  );
}
