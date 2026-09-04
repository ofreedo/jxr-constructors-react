/**
 * Contact info, certifications, and external links used across the
 * header, footer, and contact page. Single source of truth — the
 * original static site duplicated all of this by hand on all 7 pages.
 */
export const siteConfig = {
  name: "JXR Constructors, Inc.",
  tagline: "Veteran-owned general contractor specializing in federal, institutional, and commercial construction.",

  address: {
    street: "9750 Birch Canyon Place",
    cityStateZip: "San Diego, CA 92126",
  },
  phone: "858-874-1925",
  phoneHref: "tel:8588741925",
  fax: "858-874-1930",
  email: "info@jxrconstructors.com",
  emailHref: "mailto:info@jxrconstructors.com",
  licenseNumber: "974679",
  certificationsShort: "SDVOSB · DVBE · SB · SAM-Registered",
  officeHours: "Mon–Fri, 7:00AM–5:00PM",
  federalContractSupport: "24/7 support available for active federal contracts",

  employeePortalUrl: "https://jxrapp-web-production.up.railway.app/",

  social: {
    facebook: "https://www.facebook.com/pages/JXR%20Constructors/188337748184600/",
    instagram: "https://www.instagram.com/jxrconstructors/",
  },

  reviews: {
    google:
      "https://www.google.com/search?client=safari&rls=en&q=jxr+Constructors%2C+Inc.+reviews&ie=UTF-8&oe=UTF-8#lrd=0x80d9557f4926501b:0xfe5e86b3d3957228,1,,,,",
    yelp: "https://www.yelp.com/biz/jxr-constructors-san-diego-2",
    birdeye: "https://reviews.birdeye.com/jxr-constructors-inc-165503280113242",
  },

  bbb: {
    profileUrl:
      "https://www.bbb.org/us/ca/san-diego/profile/general-contractor/jxr-constructors-inc-1126-1000089129/#sealclick",
    sealImageUrl:
      "https://seal-central-northern-western-arizona.bbb.org/seals/blue-seal-293-61-bbb-1000089129.png",
  },

  copyrightYear: 2026,
} as const;
