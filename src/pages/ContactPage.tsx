import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/reveal/Reveal";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { siteConfig } from "@/data/siteConfig";

const inputClasses =
  "w-full px-3.5 py-3 border border-hairline rounded font-body text-[0.92rem] text-charcoal bg-bg-panel focus:outline-none focus:border-jxr-blue";
const labelClasses = "block text-[0.8rem] font-semibold text-charcoal mb-1.5";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        image="_X5A2799.jpg"
        imageAlt="JXR Constructors finished medical facility renovation"
        eyebrow="Get In Touch"
        heading="Contact Us"
        sub="For estimates, inquiries about U.S. Certified Contractors and our services, or information on job opportunities, please contact us by phone or submit our online form. We look forward to connecting with you."
      />

      <section className="py-[88px]">
        <div className="max-w-container mx-auto px-6">
          <Reveal as="div" className="grid grid-cols-[0.85fr_1.15fr] max-[900px]:grid-cols-1 gap-14 max-[900px]:gap-10">
            <div>
              <h2 className="mb-2.5">{siteConfig.name}</h2>
              <dl className="mt-6">
                <div className="py-3.5 border-t border-hairline first:border-t-0">
                  <dt className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-1">Address</dt>
                  <dd className="m-0 text-[0.95rem] text-charcoal">
                    {siteConfig.address.street}, {siteConfig.address.cityStateZip}
                  </dd>
                </div>
                <div className="py-3.5 border-t border-hairline">
                  <dt className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-1">Office Hours</dt>
                  <dd className="m-0 text-[0.95rem] text-charcoal">{siteConfig.officeHours}</dd>
                </div>
                <div className="py-3.5 border-t border-hairline">
                  <dt className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-1">
                    Federal Contract Support
                  </dt>
                  <dd className="m-0 text-[0.95rem] text-charcoal">{siteConfig.federalContractSupport}</dd>
                </div>
                <div className="py-3.5 border-t border-hairline">
                  <dt className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-1">Phone</dt>
                  <dd className="m-0 text-[0.95rem] text-charcoal">
                    <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                  </dd>
                </div>
                <div className="py-3.5 border-t border-hairline">
                  <dt className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-1">Email</dt>
                  <dd className="m-0 text-[0.95rem] text-charcoal">
                    <a href={siteConfig.emailHref}>{siteConfig.email}</a>
                  </dd>
                </div>
                <div className="py-3.5 border-t border-hairline">
                  <dt className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-1">Fax</dt>
                  <dd className="m-0 text-[0.95rem] text-charcoal">{siteConfig.fax}</dd>
                </div>
                <div className="py-3.5 border-t border-hairline">
                  <dt className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-1">License #</dt>
                  <dd className="m-0 text-[0.95rem] text-charcoal">{siteConfig.licenseNumber}</dd>
                </div>
                <div className="py-3.5 border-t border-hairline">
                  <dt className="text-[0.72rem] font-bold tracking-[0.06em] uppercase text-jxr-blue mb-1">
                    Certifications
                  </dt>
                  <dd className="m-0 text-[0.95rem] text-charcoal">{siteConfig.certificationsShort}</dd>
                </div>
              </dl>
              <div className="flex items-center gap-2.5 mt-6">
                <img src="/assets/projects_flat/CVE-Certified-Logo-thumbx.jpg" alt="CVE-Certified SDVOSB" className="h-10 w-10 rounded-full" />
                <a href={siteConfig.bbb.profileUrl} target="_blank" rel="nofollow" className="inline-flex items-center bg-white px-2 py-1 rounded">
                  <img src={siteConfig.bbb.sealImageUrl} alt="JXR Constructors Inc BBB Business Review" />
                </a>
              </div>
            </div>

            {/* Matches the original site exactly: no submit handler here
                either — plain form, no backend wired up on the static
                site this was ported from. */}
            <form className="[&_*]:box-border">
              <h2 className="mb-2.5">Send Us a Message</h2>
              <p className="mb-6">Fill out the form and we will contact you as soon as possible.</p>
              <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-4">
                <div className="mb-4.5">
                  <label htmlFor="first-name" className={labelClasses}>
                    First Name
                  </label>
                  <input type="text" id="first-name" name="first-name" required className={inputClasses} />
                </div>
                <div className="mb-4.5">
                  <label htmlFor="last-name" className={labelClasses}>
                    Last Name
                  </label>
                  <input type="text" id="last-name" name="last-name" required className={inputClasses} />
                </div>
              </div>
              <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-4">
                <div className="mb-4.5">
                  <label htmlFor="company" className={labelClasses}>
                    Company
                  </label>
                  <input type="text" id="company" name="company" className={inputClasses} />
                </div>
                <div className="mb-4.5">
                  <label htmlFor="phone" className={labelClasses}>
                    Phone
                  </label>
                  <input type="tel" id="phone" name="phone" className={inputClasses} />
                </div>
              </div>
              <div className="mb-4.5">
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <input type="email" id="email" name="email" required className={inputClasses} />
              </div>
              <div className="mb-4.5">
                <label htmlFor="purpose" className={labelClasses}>
                  Purpose
                </label>
                <select id="purpose" name="purpose" className={inputClasses}>
                  <option value="estimate">Estimate</option>
                  <option value="inquiries">Inquiries</option>
                  <option value="employment">Employment</option>
                </select>
              </div>
              <div className="mb-4.5">
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
                <textarea id="message" name="message" rows={5} className={`${inputClasses} resize-y`} />
              </div>
              <button
                type="submit"
                className="inline-block px-[26px] py-3 rounded bg-jxr-black text-white font-semibold text-[0.88rem] tracking-[0.03em] uppercase border border-transparent cursor-pointer hover:bg-jxr-blue transition-colors duration-150"
              >
                Submit
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="py-14 bg-bg-panel border-y border-hairline">
        <Reveal as="div" className="max-w-container mx-auto px-6">
          <div className="text-center mb-8">
            <SectionLabel>Visit Us</SectionLabel>
            <h2>{siteConfig.address.street}, {siteConfig.address.cityStateZip}</h2>
          </div>
          <div className="aspect-[16/6] bg-[repeating-linear-gradient(45deg,#fff,#fff_10px,#f7f4ee_10px,#f7f4ee_20px)] border border-hairline rounded flex items-center justify-center">
            <span className="text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-charcoal-soft bg-bg-panel px-4 py-2 rounded border border-hairline">
              Map
            </span>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
