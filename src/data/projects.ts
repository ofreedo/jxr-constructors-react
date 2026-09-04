export interface PortfolioProject {
  id: string;
  image: string;
  imageAlt: string;
  tag: string;
  title: string;
  code?: string;
  description: string;
  quote?: { text: string; attribution: string };
  isTechnical?: boolean;
  /**
   * Verified real filenames in assets/projects_flat/ for this project's
   * photo gallery — cross-referenced against the actual filesystem
   * earlier in this project's history (content/photo-catalog.md is a
   * research doc, not a verified manifest, and contains some filenames
   * that don't exist on disk — don't source gallery data from it).
   * Undefined for the 3 projects without a confirmed photo cluster.
   */
  gallery?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "orpa",
    image: "orpa-operating-room.jpg",
    imageAlt: "VA San Diego Operating Room and PACU Renovation",
    tag: "Federal — Medical Facility",
    title: "VA San Diego — Operating Room & PACU Renovation",
    code: "ORPA",
    description:
      "Renovated 5,036 SF of active surgical space, including 6 ORs and 8 PACU beds, with epoxy-coated walls, AMICO medical booms, and nurse call systems — completed with zero disruption to patient care.",
    gallery: [
      "_X5A2799.jpg",
      "_X5A2830.jpg",
      "_X5A2850.jpg",
      "3X5A0600.jpg",
      "3X5A0650.jpg",
      "3X5A0700.jpg",
      "IMG_0806.JPG",
      "IMG_0820.JPG",
      "IMG_3580.JPG",
      "orpa-operating-room.jpg",
      "Waiting Room Bldg 161.JPG",
    ],
  },
  {
    id: "t2wrr",
    image: "t2wrr-mens-restroom.jpg",
    imageAlt: "San Diego International Airport Terminal 2 restroom remodel",
    tag: "Commercial — Aviation",
    title: "San Diego International Airport — Terminal 2 Restroom Remodel",
    code: "T2WRR",
    description: "Complete gut-and-rebuild of public restrooms with premium finishes and zero passenger impact.",
    gallery: [
      "t2wrr-mens-restroom.jpg",
      "t2wrr-mens-2.jpg",
      "t2wrr-womens-2.jpg",
      "t2wrr-womens-5.jpg",
      "t2wrr-womens-10.jpg",
      "IMG_1767.JPG",
    ],
  },
  {
    id: "r1fc",
    image: "3X5A1160.jpg",
    imageAlt: "VA Los Angeles Canteen Renovation dining hall",
    tag: "Federal — Institutional",
    title: "VA Los Angeles — Canteen Renovation",
    code: "R1FC · $2.5M",
    description:
      "Full canteen and dining hall renovation including custom millwork, serving line casework, and mechanical kitchen upgrades.",
    gallery: [
      "3X5A1160.jpg",
      "3X5A1199.jpg",
      "IMG_4906.JPG",
      "IMG_4907.JPG",
      "IMG_4909.JPG",
      "IMG_4910.JPG",
      "IMG_4939.JPG",
      "Cart Waher.JPG",
      "CWAS-1.jpg",
      "CWAS-2.jpg",
    ],
  },
  {
    id: "rffvb",
    image: "IMG_1075.JPG",
    imageAlt: "VA Long Beach Radiation and Spinal Clinic renovation",
    tag: "Federal — Medical Facility",
    title: "VA Long Beach — Radiation & Spinal Clinic Flooring & Finishes",
    code: "RFFVB",
    description:
      "Phased renovation of over 18,000 SF across two active VA clinics, completed without interrupting patient care.",
  },
  {
    id: "massu",
    image: "IMG_7276.jpg",
    imageAlt: "VA San Diego medical air compressor and boiler infrastructure",
    tag: "Federal — Infrastructure",
    title: "VA San Diego — Medical Air Compressor & Suction System Upgrade",
    code: "MASSU · $2.1M",
    description: "Infrastructure modernization of medical air and suction systems supporting active hospital operations.",
    quote: {
      text: "Contractor's project manager was exceptional. JXR maintained customer satisfaction, regulatory compliance, and timely management of subcontractors.",
      attribution: "— Richard Ortega, Contract Specialist, VHA",
    },
    isTechnical: true,
    gallery: ["3X5A2855.jpg", "3X5A2920.jpg", "IMG_7276.jpg", "IMG_3181.JPG", "IMG_3182.JPG", "IMG_3183.JPG"],
  },
  {
    id: "4swbr",
    image: "4SWBR-1.JPG",
    imageAlt: "VA Loma Linda bathroom renovation",
    tag: "Federal — Medical Facility",
    title: "VA Loma Linda — Bathroom Upgrades",
    code: "4SWBR",
    description: "18 bathrooms redesigned with epoxy floors and dual linear drains, built to ADA and infection-control standards.",
    gallery: ["4SWBR-1.JPG", "4SWBR-2.JPG"],
  },
  {
    id: "rrmcas",
    image: "CWAS-1.jpg",
    imageAlt: "NAVFAC MCAS Miramar restroom remodel support equipment",
    tag: "Federal — Military Installation",
    title: "NAVFAC at MCAS Miramar — Restroom Remodel",
    code: "RRMCAS",
    description:
      "Public restroom remodel at Marine Corps Air Station Miramar, completed while keeping the facility clean and fully operational throughout construction.",
    quote: {
      text: "The team kept the facility clean and fully operational during renovation. Your SSHO and QCM were superb.",
      attribution: "— NAVFAC Inspector, MCAS Miramar",
    },
  },
  {
    id: "parking-lot",
    image: "VA.01-Bldg 2 Parking Lot-1262.jpg",
    imageAlt: "VA Palo Alto parking lot construction",
    tag: "Federal — Civil Work",
    title: "VA Palo Alto — Parking Lot Construction",
    description:
      "Full-scale parking lot construction with lighting, striping, and landscaping, delivered with minimal change orders.",
    quote: {
      text: "Exceptional project management. Jesus Ramirez was instrumental in resolving issues early and kept the job moving efficiently with minimal change orders. A true partner in the field.",
      attribution: "— Rusty Stevens, Contracting Officer",
    },
    gallery: [
      "VA.01-Bldg 2 Parking Lot-1262.jpg",
      "VA.01-Bldg 2 Parking Lot-1263.jpg",
      "VA.01-Bldg 2 Parking Lot-1264.jpg",
      "VA.01-Bldg 2 Parking Lot-1265.jpg",
      "VA.01-Bldg 2 Parking Lot-1273.jpg",
      "VA.01-Bldg 2 Parking Lot-1274.jpg",
      "VA.01-Bldg 2 Parking Lot-1275.jpg",
      "VA.01-Bldg 2 Parking Lot-1282.jpg",
      "VA.01-Bldg 2 Parking Lot-1292.jpg",
      "VA.01-Bldg 2 Parking Lot-1306.jpg",
      "VA.01-Bldg 2 Parking Lot-1318.jpg",
      "VA.01-Bldg 2 Parking Lot-1335.jpg",
      "VA.01-Bldg 2 Parking Lot-1343.jpg",
    ],
  },
  {
    id: "gate-canopy",
    image: "GATE 6A.JPG",
    imageAlt: "Military installation entry gate shade canopy",
    tag: "Federal — Site Improvements",
    title: "Military Installation — Entry Gate Shade Canopy",
    description:
      "Shade canopy structure installed at a secure military base entry point, built to withstand daily vehicle and pedestrian traffic.",
    gallery: ["GATE 43.JPG", "GATE 6A.JPG"],
  },
  {
    id: "locker-room",
    image: "LUPR Photo 1.JPG",
    imageAlt: "Locker room and shower facility renovation",
    tag: "Federal — Facility Renovation",
    title: "Locker Room & Shower Facility Renovation",
    description:
      "Full renovation of a locker room and shower facility, including new shower stalls, vanities, and ADA-compliant fixtures.",
  },
];
