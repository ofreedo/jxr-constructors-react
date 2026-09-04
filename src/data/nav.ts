import { siteConfig } from "./siteConfig";

export interface NavLinkItem {
  label: string;
  to: string;
  /** Only shown in the mobile hamburger menu, not the desktop nav row. */
  mobileOnly?: boolean;
}

export interface UtilityLink {
  label: string;
  href: string;
  external?: boolean;
}

export const utilityLinks: UtilityLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Employee Portal", href: siteConfig.employeePortalUrl, external: true },
];

export const mainNavLinks: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact Us", to: "/contact", mobileOnly: true },
];

export const footerCompanyLinks: NavLinkItem[] = [
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Shop", to: "/shop" },
  { label: "Contact Us", to: "/contact" },
];

export const footerServiceLinks: NavLinkItem[] = [
  { label: "General Contracting", to: "/services#general-contracting" },
  { label: "Design-Build", to: "/services#design-build" },
  { label: "Tenant Improvements", to: "/services#tenant-improvements" },
  { label: "Federal & Institutional Expertise", to: "/services#federal-expertise" },
];
