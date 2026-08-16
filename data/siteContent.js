// ─── VERIFIED AGAINST: Company_Profile_SA_THREAD_updated.pdf ──────────────────
// Corrections made in this pass (previously fabricated / unsupported by the PDF):
//   1. PRODUCT_COLLECTIONS — was "Premium Cotton / Polyester Core / Sustainable Eco"
//      (not in the profile at all). Replaced with the company's actual 4 product
//      lines from the "Our Products" slide: Sewing Thread, Elastic, Twill Tape,
//      Drawstring/Elastic Cord.
//   2. All "custom yarn" manufacturing claims (count/strength/twist/color) removed —
//      the profile never states this. The only yarn-related plan is the FUTURE
//      in-house dyeing section (see futurePlan), which is an internal cost-saving
//      move, not a customer-facing custom-order service.
//   3. Wording that called the products "yarns" changed to "accessories/products",
//      since the company is a garments accessories supplier (thread, elastic,
//      twill tape, drawstring, tips) — not a yarn manufacturer.
// Everything else (banks, workforce, machinery, production capacity, yearly
// growth, future plan, CSR, contact info, management team, vision/values) was
// checked line-by-line against the PDF and matches — left unchanged.
// ────────────────────────────────────────────────────────────────────────────

export const HOME_HERO_SLIDES = [
  {
    id: 1,
    title1: "Trusted Garments Accessories",
    title2: "Partner Since 2003",
    description:
      "Supplying premium sewing thread, elastic, twill tape and drawstring solutions to Bangladesh's leading garment manufacturers since 2003.",
    image: "/yarn.png", // Premium product showcase
  },
  {
    id: 2,
    title1: "From Thread To Trim.",
    title2: "We've Got It Covered.",
    description:
      "Specialized in Sewing Thread, Elastic, Twill Tape, Drawstring and Elastic Cord with consistent quality and reliable supply.",
    image: "/drawsting.png", // All product categories displayed together
  },
  {
    id: 3,
    title1: "Built for Large Scale",
    title2: "Manufacturing",
    description:
      "Monthly production capacity of 468,000 sewing thread cones, 3.8 million yards of elastic, and millions of yards of garment accessories.",
    image: "/sathread.webp", // Factory + machinery + production line
  },
  {
    id: 4,
    title1: "100% OEKO-TEX",
    title2: "Certified Quality",
    description:
      "Serving 20+ renowned garment factories with internationally certified products and sustainable manufacturing practices.",
    image: "/Certificates/Oeko_Tex.webp", // OEKO-TEX certificate, quality inspection, client trust imagery
  },
];

// Real clients as listed in the Company Profile (About Us section)
export const TRUSTED_BRANDS = [
  { name: "TRZ Group", src: "/Clients/trz-group.jpg" },
  { name: "Eurozone Group", src: "/Clients/Eurozone.jpg" },
  {
    name: "Sinha Knit & Denims Ltd.",
    src: "/Clients/Sinha-knit-&-Denims-ltd.png",
  },
  { name: "M.M Knitwear", src: "/Clients/m_m_knitwear_ltd_logo.jpg" },
  { name: "AZ Composite Ltd.", src: "/Clients/AZ-Composite.png" },
  // Other confirmed clients from the profile you can rotate in:
  // "Alfa Patterns Bd Ltd", "Day Apparels Ltd", "Iris Design Ltd", "Saturn Textiles Ltd"
];

// Replaces the old fabricated "Premium Cotton / Polyester Core / Sustainable Eco"
// categories with the company's real product lines (see "Our Products" slide in PDF).
export const PRODUCT_COLLECTIONS = [
  {
    title: "Sewing Thread",
    description:
      "High-strength, consistent sewing thread for garment production.",
    image: "/yarn.png",
    gradient: "from-blue-900/50",
  },
  {
    title: "Elastic",
    description:
      "Reliable elastic supplied at large-scale production capacity.",
    image: "/yarn.png",
    gradient: "from-indigo-900/50",
  },
  {
    title: "Twill Tape",
    description: "Durable twill tape / non-elastic tape for garment finishing.",
    image: "/yarn.png",
    gradient: "from-teal-900/50",
  },
  {
    title: "Drawstring / Elastic Cord",
    description:
      "Drawstring, draw cord and elastic cord solutions for apparel.",
    image: "/yarn.png",
    gradient: "from-emerald-900/50",
  },
];

export const CERTIFICATION_ITEMS = [
  { key: "oekotex", title: "OEKO-TEX Certified" },
  { key: "bgapmea", title: "BGAPMEA Member (Membership 593)" },
];

export const CONTACT_PAGE_CONTENT = {
  hero: {
    eyebrow: "GET IN TOUCH",
    title: "We'd Love to\nHear From You",
    description:
      "Have questions about our products? Our team is ready to help you.",
    image: "/yarn.png",
  },
  cards: [
    {
      key: "phone",
      title: "Call Us",
      value: "+880 1971-170961",
      meta: "Sat - Thu 9AM - 5PM", // TODO: confirm exact office hours with client — not stated in the company profile
    },
    {
      key: "email",
      title: "Email Us",
      value: "sathread@gmail.com",
      meta: "We reply within 24 hours",
    },
    {
      key: "location",
      title: "Visit Us",
      meta: "271/1 Gacha Road, Gacha, \nGazipur-1704, Bangladesh",
      link: "Get Direction",
    },
    {
      key: "support",
      title: "Office / Fax",
      value: "+880-2-8963821, 8932067",
      meta: "Fax: 88-02-8932067",
    },
  ],
  mapCard: {
    title: "SA THREAD & ACCESSORIES LTD.",
    address: "271/1, Gacha Road, Gacha,\nGazipur-1704, Bangladesh",
  },
  form: {
    title: "Send Us a Message",
    description: "Fill out the form and our team will get back to you shortly.",
  },
  highlights: [
    {
      title: "Business Hours",
      // TODO: confirm exact office hours with client — not stated in the company profile
      details: ["Saturday - Thursday", "Office Hours", "Friday: Closed"],
    },
    {
      title: "Large-Scale Production",
      details: [
        "468,000 sewing thread cones",
        "and millions of yards of",
        "accessories produced monthly.",
      ],
    },
    {
      title: "Quality Assurance",
      details: [
        "Committed to providing",
        "premium quality accessories",
        "with consistent excellence.",
      ],
    },
    {
      // Replaces the old fabricated "Need Custom Yarn?" claim (count/strength/
      // twist/color customization is not mentioned anywhere in the profile).
      title: "OEKO-TEX Certified",
      details: [
        "100% OEKO-TEX certified",
        "products, backed by an active",
        "BGAPMEA membership (593).",
      ],
    },
  ],
  banner: {
    // Replaces the old fabricated "custom yarn solutions" banner.
    title: "Looking for a reliable accessories supply partner?",
    description: "Let's talk about how we can support your production.",
    cta: "Contact Us",
  },
};

// ─── Site Configuration ────────────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "SA THREAD",
  nameSuffix: "& ACCESSORIES LTD.",
  tagline: "Garments Accessories Manufacturer & Supplier.",
  description:
    "SA Thread & Accessories Ltd. is a renowned supplier of high-quality garments accessories in Bangladesh, serving leading garment manufacturers with internationally certified products since 2003.",
  phone: "+8801971170961",
  email: "sathread@gmail.com",
  address: "271/1, Gacha Road, Gacha,\nGazipur-1704, Bangladesh",
  // TODO: confirm exact office hours with client — not stated in the company profile
  hours: "Sat – Thu (Office Hours)",
  hoursExpanded: ["Saturday - Thursday", "Office Hours", "Friday: Closed"],
  copyright: "SA THREAD & ACCESSORIES LTD. All rights reserved.",
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ],
};

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { name: "HOME", path: "/" },
  { name: "ABOUT US", path: "/about" },
  { name: "PRODUCTS", path: "/products" },
  { name: "CSR", path: "/csr" },
  //   { name: "CAPABILITIES", path: "#" },
  { name: "CONTACT US", path: "/contact" },
];

// ─── Footer Links ─────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  "Quick Links": [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "CSR", href: "/csr" },
    // { name: "Capabilities", href: "#" },
    { name: "Contact Us", href: "/contact" },
  ],
  Products: [
    { name: "Sewing Thread", href: "/products" },
    { name: "Elastic", href: "/products" },
    { name: "Twill Tape", href: "/products" },
    { name: "Drawstring", href: "/products" },
    { name: "Elastic Cord", href: "/products" },
    { name: "Tips", href: "/products" },
  ],
};

// ─── Social Links (icon: name of icon to render) ──────────────────────────────
// NOTE: The company profile PDF does not list any social media handles.
// Keeping placeholder hrefs — replace with real profile URLs when available.
export const SOCIAL_LINKS = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "WhatsApp", href: "#", icon: "whatsapp" },
];

// ─── Section Headings ─────────────────────────────────────────────────────────
export const SECTION_HEADINGS = {
  productCategories: {
    eyebrow: "",
    title: "Discover Our Collections",
    description:
      "Engineered for excellence. Explore our specialized garments accessories categories built for modern textile manufacturing.",
  },
  trustedBrands: {
    title: "Trusted by Global Brands",
  },
  certifications: {
    title: "Certified Excellence",
    description:
      "We adhere to the highest international standards of quality, safety, and environmental sustainability.",
  },
};

// ─── Home Hero CTAs ────────────────────────────────────────────────────────────
export const HOME_CTA = {
  products: "OUR PRODUCTS",
  contact: "CONTACT US",
};

// ─── Products Page Content ────────────────────────────────────────────────────
export const PRODUCTS_PAGE_CONTENT = {
  hero: {
    eyebrow: "OUR PRODUCTS",
    titleLine1: "High Quality Accessories For",
    titleHighlight: "Every Textile Need",
    description:
      "Premium quality garments accessories crafted for strength, consistency and performance in every stitch.",
    image: "/yarn.png",
  },
  features: [
    {
      title: "Premium Quality",
      subtitle: "Superior Product Quality",
    },
    {
      title: "Advanced Technology",
      subtitle: "Modern Manufacturing",
    },
    {
      title: "Large-Scale Capacity",
      subtitle: "Reliable High-Volume Supply",
    },
    {
      title: "Reliable Supply",
      subtitle: "On-Time, Every Time",
    },
  ],
  cta: {
    // Replaces the old fabricated "custom yarn solution / manufacture as per
    // your specification" claim — not supported by the profile.
    title: "Looking For A Reliable Accessories Supplier?",
    description: "Get in touch to discuss your requirements.",
    button: "Contact Us",
  },
};

// ─── Product Badges (icons rendered by component) ─────────────────────────────
export const PRODUCT_BADGES = [
  { key: "premium", label: "Premium\nQuality" },
  { key: "strength", label: "High\nStrength" },
  { key: "performance", label: "Consistent\nPerformance" },
  { key: "eco", label: "Eco\nFriendly" },
];

// ─── Product Modal / Detail Content ───────────────────────────────────────────
export const PRODUCT_MODAL_CONTENT = {
  keyFeaturesTitle: "Key Feature",
  specificationsTitle: "Specifications",
  availableColorsLabel: "Available Colors",
  applicationsTitle: "Applications",
  packagingTitle: "Packaging",
  // NOTE: the previous "customYarn" block (claiming yarn made to custom count,
  // strength, twist and color) was removed — this capability is not stated
  // anywhere in the company profile.
  actions: {
    back: "Back to Products",
    requestSample: "REQUEST SAMPLE",
    getQuotation: "GET QUOTATION",
  },
};

// ─── Contact Form Content ─────────────────────────────────────────────────────
export const CONTACT_FORM_CONTENT = {
  cardTitles: {
    phone: "Call Us",
    email: "Email Us",
    location: "Visit Us",
    support: "Office / Fax",
  },
  form: {
    name: "Your Name *",
    email: "Email Address *",
    phone: "Phone Number",
    subject: "Subject *",
    message: "Your Message *",
    privacyPolicy: "I agree to the",
    privacyPolicyLink: "privacy policy",
    sendButton: "Send Message",
    subjects: [
      "General Inquiry",
      "Product Inquiry",
      "Quotation / Pricing",
      "Order & Shipping",
      "Technical Support",
    ],
  },
  map: {
    src: "https://www.openstreetmap.org/export/embed.html?bbox=90.3581%2C23.9376%2C90.3981%2C23.9576&layer=mapnik&marker=23.9476%2C90.3781",
    title: "SA Thread & Accessories Ltd. - Gacha Road, Gazipur, Bangladesh",
    directionHref:
      "https://maps.google.com/?q=271/1+Gacha+Road,+Gacha,+Gazipur-1704,+Bangladesh",
  },
};

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
  {
    title: "Product Safety & Waste Management",
    description:
      "We, as a company always ensure that our products are free of harmful substances. Our company is 100% Oeko-Tex certified. We also manage our wastes carefully so that we don't litter our surrounding and contribute to pollution.",
  },
  {
    title: "Charity & Community Support",
    description:
      "We actively take part in charity activities throughout the year. The charity activities include donations to religious institutions, funds for treatment, etc.",
  },
  {
    title: "Green Environment Initiatives",
    description:
      "We always believe in green environment. We have a garden at our backyard and also at our rooftop. There are trees of various fruits and vegetables planted and are also taken care of with utmost priority. This eventually helps us create a healthy environment for the company and also the surroundings.",
  },
];

export const PRIVACY_POLICY_CONTENT = {
  title: "Privacy Policy",
  lastUpdated: "January 2025",
  sections: [
    {
      title: "1. Information We Collect",
      content:
        "We may collect personal information such as your name, email address, phone number, and any other details you provide when you fill out our contact form or request a quotation.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your information is used strictly to respond to your inquiries, provide requested services, send updates regarding your orders, and improve our website's user experience.",
    },
    {
      title: "3. Data Security",
      content:
        "We implement a variety of security measures to maintain the safety of your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.",
    },
    {
      title: "4. Third-Party Disclosure",
      content:
        "We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice, except for website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users.",
    },
    {
      title: "5. Your Consent",
      content:
        "By using our site, you consent to our website's privacy policy.",
    },
    {
      title: "6. Changes to our Privacy Policy",
      content:
        "If we decide to change our privacy policy, we will post those changes on this page.",
    },
  ],
};

export const TERMS_OF_SERVICE_CONTENT = {
  title: "Terms of Service",
  lastUpdated: "January 2025",
  sections: [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using the SA Thread & Accessories Ltd. website, you accept and agree to be bound by the terms and provisions of this agreement.",
    },
    {
      title: "2. Use of Site",
      content:
        "You may use our site for lawful purposes only. You must not use our site in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.",
    },
    {
      title: "3. Intellectual Property",
      content:
        "All content included on this site, such as text, graphics, logos, images, and software, is the property of SA Thread & Accessories Ltd. or its content suppliers and protected by copyright laws.",
    },
    {
      title: "4. Products and Specifications",
      content:
        "We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on our site. However, we do not guarantee that the colors, features, specifications, and details will be accurate, complete, reliable, current, or free of other errors.",
    },
    {
      title: "5. Limitation of Liability",
      content:
        "In no event shall SA Thread & Accessories Ltd., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
    },
    {
      title: "6. Governing Law",
      content:
        "These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.",
    },
  ],
};
