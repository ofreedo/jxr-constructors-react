import { Link } from "react-router-dom";
import { siteConfig } from "@/data/siteConfig";
import { footerCompanyLinks, footerServiceLinks } from "@/data/nav";

export default function SiteFooter() {
  return (
    <footer className="bg-charcoal text-white/75 pt-14 pb-7 text-[0.88rem]">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-12 h-12 rounded-full overflow-hidden inline-block">
                <img
                  src="/assets/logo/nav-logo.png"
                  alt="JXR Constructors, Inc."
                  className="w-full h-[128%] object-cover object-top"
                />
              </span>
              <span className="font-head font-semibold text-white">{siteConfig.name}</span>
            </div>
            <p className="text-white/60 text-[0.85rem] max-w-[260px]">{siteConfig.tagline}</p>
            <div className="flex items-center gap-2.5 mt-4 flex-wrap">
              <img
                src="/assets/projects_flat/CVE-Certified-Logo-thumbx.jpg"
                alt="CVE-Certified SDVOSB"
                className="h-10 w-10 rounded-full"
              />
              <span className="border border-white/25 text-white/85 text-[0.7rem] font-bold tracking-[0.04em] px-2.5 py-1.5 rounded">
                DVBE
              </span>
              <span className="border border-white/25 text-white/85 text-[0.7rem] font-bold tracking-[0.04em] px-2.5 py-1.5 rounded">
                CA Small Business
              </span>
              <a
                href={siteConfig.bbb.profileUrl}
                target="_blank"
                rel="nofollow"
                className="inline-flex items-center bg-white px-2 py-1 rounded"
              >
                <img src={siteConfig.bbb.sealImageUrl} alt="JXR Constructors Inc BBB Business Review" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-[0.78rem] tracking-[0.08em] uppercase font-body mb-4">
              Company
            </h4>
            {footerCompanyLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block mb-2 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-white text-[0.78rem] tracking-[0.08em] uppercase font-body mb-4">
              Services
            </h4>
            {footerServiceLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block mb-2 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-white text-[0.78rem] tracking-[0.08em] uppercase font-body mb-4">
              Contact
            </h4>
            <Link to="/contact" className="block mb-2 hover:text-white">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.cityStateZip}
            </Link>
            <a href={siteConfig.phoneHref} className="block mb-2 hover:text-white">
              {siteConfig.phone}
            </a>
            <a href={siteConfig.emailHref} className="block mb-2 hover:text-white">
              {siteConfig.email}
            </a>
            <Link to="/contact" className="block mb-2 hover:text-white">
              {siteConfig.officeHours}
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex justify-between flex-wrap gap-3 text-[0.8rem] text-white/50">
          <span>
            © {siteConfig.copyrightYear} {siteConfig.name} All Rights Reserved.
          </span>
          <span>
            <a
              href={siteConfig.employeePortalUrl}
              target="_blank"
              rel="noopener"
              className="hover:text-white"
            >
              Employee Portal
            </a>{" "}
            ·{" "}
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener" className="hover:text-white">
              Facebook
            </a>{" "}
            ·{" "}
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener" className="hover:text-white">
              Instagram
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
