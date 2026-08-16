import React from "react";

export const stats = [
  {
    value: "23+",
    label: "Years Experience",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </>
    ),
  },
  {
    value: "20+",
    label: "Clients",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M8 14s-4 2-4 6h16c0-4-4-6-4-6" />
      </>
    ),
  },
  {
    value: "150+",
    label: "Workers",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  },
  {
    value: "24,514",
    label: "Sq Ft Factory",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

export const productCategories = [
  "Sewing Thread",
  "Elastic",
  "Twill Tape",
  "Drawstring/ Elastic Cord",
  "All Kinds of Tips",
];

export const directors = [
  {
    name: "Mohammed Shahidul Islam",
    role: "Managing Director",
    image:
      "/Employee Photograph/Mohammed Shahidul Islam- Managing Director.jpg",
  },
  {
    name: "Sultana Parvin",
    role: "Chairman",
    image: "/Employee Photograph/Sultana Parvin - Chairman.jpg",
  },
  {
    name: "Asif Abdullah",
    role: "Executive Director",
    image: "/Employee Photograph/Asif Abdullah- Executive Director.jpg",
  },
];

export const timeline = [
  {
    year: "2003",
    event: "Company\nEstablished",
    icon: (
      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0H3m2 0H3m5-4h8M9 12h6M9 8h6" />
    ),
  },
  {
    year: "2017",
    event: "Moved to Permanent\nGacha Road Factory",
    icon: (
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    ),
  },
];

export const achievements = [
  {
    title: "100% OEKO-TEX Certified Products",
    meta: "STANDARD 100 — all product lines",
  },
  {
    title: "BGAPMEA Member",
    meta: "Membership #593",
  },
  {
    title: "Own 24,514 Sq Ft Factory",
    meta: "Gacha Road, Gazipur — since 2017",
  },
  {
    title: "$4.5 Million Annual Turnover",
    meta: "Grew 14.2% in 2023, 12.5% in 2024",
    showGrowth: true,
  },
];

export const certifications = [
  {
    abbr: "OEKO-TEX",
    sub: "STANDARD\n100",
    image: "/Certificates/Oeko_Tex.webp",
  },
  {
    abbr: "BGAPMEA",
    sub: "Membership\n#593",
    image: "/Certificates/BGAPMEA-logo-.webp",
    scale: 1.5,
  },
];

export const teamTabs = [
  "Management",
  "Marketing & Factory",
  "Sales & Marketing",
  "Production",
];

export const teamMembers = [
  {
    name: "Sultana Parvin",
    role: "Chairman",
    dept: "Management",
    image: "/Employee Photograph/Sultana Parvin - Chairman.jpg",
    location: "Gazipur, Bangladesh",
    about:
      "As Chairman of SA Thread & Accessories Ltd., Sultana Parvin provides strategic oversight and guidance, helping steer the company's long-term vision since its founding in 2003.",
    expertise: [
      "Corporate Governance",
      "Strategic Oversight",
      "Business Ethics",
      "Stakeholder Relations",
    ],
    responsibilities: [
      "Board-level strategic direction",
      "Corporate governance and compliance",
      "Long-term vision setting",
      "Stakeholder representation",
    ],
  },
  {
    name: "Mohammed Shahidul Islam",
    role: "Managing Director",
    dept: "Management",
    image:
      "/Employee Photograph/Mohammed Shahidul Islam- Managing Director.jpg",
    email: "shahidul@sathread.com",
    phone: "+880 1971 170 962",
    location: "Gazipur, Bangladesh",
    whatsappNumber: "8801971170962",
    about:
      "With over two decades of experience in the garments accessories industry, Mohammed Shahidul Islam leads SA Thread & Accessories Ltd. with a vision for quality, innovation, and sustainable growth.",
    expertise: [
      "Strategic Planning",
      "Business Development",
      "Operations Management",
      "Team Leadership",
    ],
    responsibilities: [
      "Overall business strategy and leadership",
      "Client relations and partnerships",
      "New opportunities and market expansion",
      "Operational excellence and growth",
    ],
  },
  {
    name: "Asif Abdullah",
    role: "Executive Director",
    dept: "Management",
    image: "/Employee Photograph/Asif Abdullah- Executive Director.jpg",
    email: "asif@sathread.com",
    phone: "+880 1971 170 963",
    location: "Gazipur, Bangladesh",
    facebookUrl: "https://facebook.com/asifabdullah",
    linkedinUrl: "https://linkedin.com/in/asifabdullah",
    whatsappNumber: "8801971170963",
    about:
      "Asif Abdullah works closely with the Managing Director to drive day-to-day executive decisions, ensuring the company's operations align with its strategic goals.",
    expertise: [
      "Executive Management",
      "Operational Strategy",
      "Financial Oversight",
      "Cross-functional Leadership",
    ],
    responsibilities: [
      "Executive decision-making",
      "Cross-department coordination",
      "Business performance monitoring",
      "Policy implementation",
    ],
  },
  {
    name: "Md. Shafiqul Islam",
    role: "General Manager",
    dept: "Management",
    image: "/Employee Photograph/Md. Shafiqul Islam- General Manager.jpg",
    email: "shafiqul@sathread.com",
    phone: "+8801819430668",
    location: "Gazipur, Bangladesh",
    whatsappNumber: "+8801819430668",
    about:
      "Md. Shafiqul Islam oversees the general management of the company's daily operations, coordinating between departments to keep production and business running smoothly.",
    expertise: [
      "General Administration",
      "Operations Coordination",
      "Resource Planning",
      "Process Management",
    ],
    responsibilities: [
      "Day-to-day operations management",
      "Inter-departmental coordination",
      "Administrative oversight",
      "Reporting to Managing Director",
    ],
  },
  {
    name: "Md. Rafiqul Islam",
    role: "Assistant General Manager (Marketing/Factory)",
    dept: "Marketing & Factory",
    image:
      "/Employee Photograph/Md. Rafiqul Islam-  Assisstant General Manager  (Marketing&Factory).jpg",
    email: "rafiqul@sathread.com",
    phone: "+8801718716451",
    location: "Gazipur, Bangladesh",
    whatsappNumber: "+8801718716451",
    about:
      "Md. Rafiqul Islam bridges marketing and factory operations, supporting both client-facing initiatives and on-ground production coordination.",
    expertise: [
      "Marketing Coordination",
      "Factory Liaison",
      "Client Communication",
      "Production Support",
    ],
    responsibilities: [
      "Support marketing and sales efforts",
      "Coordinate with factory floor",
      "Assist client communications",
      "Track order fulfilment",
    ],
  },
  {
    name: "Md. Parvez Bhatty",
    role: "Marketing Manager",
    dept: "Sales & Marketing",
    image: "/Employee Photograph/Md. Parveg Bhatty- Marketing Manager.jpg",
    email: "parvez@sathread.com",
    phone: "+8801679506304",
    location: "Dhaka, Bangladesh",
    whatsappNumber: "+8801679506304",
    about:
      "Md. Parvez Bhatty drives client acquisition and relationship management, helping SA Thread & Accessories Ltd. expand its footprint among garments manufacturers.",
    expertise: [
      "B2B Sales",
      "Client Relationship Management",
      "Market Research",
      "Negotiation",
    ],
    responsibilities: [
      "Manage key client accounts",
      "Identify new business opportunities",
      "Market research and analysis",
      "Coordinate sales pipeline",
    ],
  },
  {
    name: "Md. Wahid Miah",
    role: "Marketing Manager",
    dept: "Sales & Marketing",
    image: "/Employee Photograph/Md. Wahid Miah- Marketing Manager.jpg",
    phone: "+8801971170961",
    location: "Dhaka, Bangladesh",
    whatsappNumber: "+8801971170961",
    about:
      "Md. Wahid Miah focuses on client outreach and order management, ensuring smooth communication between customers and internal teams.",
    expertise: [
      "Client Outreach",
      "Order Management",
      "Sales Coordination",
      "Customer Retention",
    ],
    responsibilities: [
      "Handle client inquiries and orders",
      "Support sales growth targets",
      "Coordinate deliveries with factory",
      "Maintain customer relationships",
    ],
  },
  {
    name: "Md. Tafsir Alom",
    role: "Factory Manager",
    dept: "Production",
    image: "/Employee Photograph/Md. Tafsir Alom- Factory Manager.jpg",
    phone: "+880 1971 170 968",
    location: "Gazipur, Bangladesh",
    about:
      "Md. Tafsir Alom manages the factory floor at the Gacha Road facility, overseeing production across sewing thread, elastic, twill tape, and drawstring sections.",
    expertise: [
      "Production Planning",
      "Factory Operations",
      "Quality Control",
      "Workforce Management",
    ],
    responsibilities: [
      "Oversee daily factory production",
      "Manage 150+ factory workers",
      "Ensure machine uptime and maintenance",
      "Maintain production quality standards",
    ],
  },
];

export const contactInfo = {
  phone: "+8801971170961",
  email: "sathread@gmail.com",
  website: "www.sathread.com.bd",
  address: "271/1 Gacha Road, Gacha, Gazipur-1704",
};

export const partnerBanks = [
  {
    name: "Exim Bank PLC",
    branch: "Uttara Branch",
    address: "House# 61/A, Road# 7, Sector# 4, Uttara Model Town, Dhaka 1230",
    tel: "16246, +880 96040 16246",
    swift: "EXBKBDDH",
  },
  {
    name: "Mercantile Bank Ltd.",
    branch: "Uttara Branch",
    address: "House# 10A, Road# 7D, Sector# 09, Uttara Model Town, Dhaka-1230",
    tel: "48958177, 48955879, 8931725",
    fax: "88-02-48955881",
    swift: "MBLBBDH017",
  },
  {
    name: "Pubali Bank Ltd.",
    branch: "Board Bazar Branch",
    address: "Chaina Town Bangladesh, 71 Kalameswar Road, Ward No. 35, Gazipur",
    tel: "01701-225530, 8809612824741",
    swift: "PUBABDDH",
  },
];

export const workforceBySection = [
  { section: "Sewing Thread", workers: 60 },
  { section: "Elastic", workers: 30 },
  { section: "Drawstring/ Elastic Cord", workers: 18 },
  { section: "Twill Tape/ Non-Elastic Tape", workers: 12 },
  { section: "Others", workers: 12 },
  { section: "Loader", workers: 10 },
  { section: "Security", workers: 9 },
];

export const machinery = [
  {
    name: "High Speed Automatic Thread Winding Machine (China)",
    qty: "36 Set",
  },
  {
    name: "High Speed Braiding Machine — Drawstring/Drawcord (China)",
    qty: "15 Set",
  },
  { name: "Lace & Band Crochet Machine (Taiwan)", qty: "12 Set" },
  { name: "High Speed Automatic Needle Loom Machine (China)", qty: "5 Set" },
  { name: "Tipping Machine (China)", qty: "2 Set" },
  { name: "Finishing & Starching Machine (China)", qty: "2 Set" },
  { name: "Warping Machine (China)", qty: "1 Set" },
  { name: "Automatic Wefting Braiding Machine (China)", qty: "1 Set" },
];

export const productionCapacity = [
  { product: "Elastic", perDay: "146,900 Yd", perMonth: "3,819,400 Yd" },
  { product: "Sewing Thread", perDay: "18,000 Cone", perMonth: "468,000 Cone" },
  {
    product: "Twill Tape / Non-Elastic Tape",
    perDay: "108,000 Yd",
    perMonth: "2,808,000 Yd",
  },
  {
    product: "Drawstring / Elastic Cord",
    perDay: "80,400 Yd",
    perMonth: "2,090,400 Yd",
  },
];

export const yearlyGrowth = [
  { year: "2022", value: 3.5, note: "Post-covid period; grew to $3.5 million" },
  { year: "2023", value: 4.0, note: "Grew 14.2%" },
  { year: "2024", value: 4.5, note: "Grew a further 12.5%" },
  { year: "2025", value: 4.5, note: "Flat — remained at $4.5 million" },
];

export const futurePlan =
  "Currently expanding to add an in-house dyeing section within the existing factory premises to meet demand for dyed yarn — third-party dyeing was found too costly, slow, and inconsistent on quality.";

export const csr = [
  "100% Oeko-Tex certified products; careful waste management to avoid pollution.",
  "Ongoing charity activities year-round: donations to religious institutions, funds for treatment, etc.",
  "Backyard and rooftop gardens with fruit and vegetable trees, for a healthier environment on-site and around it.",
];
