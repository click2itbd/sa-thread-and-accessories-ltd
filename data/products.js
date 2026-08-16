/**
 * Product Data File
 * =================
 * All product information for SA Thread & Accessories Ltd.
 * Add, remove, or edit products here. Changes will reflect
 * automatically across the Products Page and Product Modal.
 *
 * Each product has:
 *  - id            : Unique identifier
 *  - title         : Short product name (shown on card)
 *  - category      : Must match one of the CATEGORIES list below
 *  - type          : One-liner subtitle shown on the product card
 *  - image         : Path relative to /public folder
 *  - pill          : Label shown inside the modal header badge
 *  - description   : Full paragraph description (shown in modal)
 *  - keyFeatures   : Array of bullet points
 *  - specifications: Array of { label, value } rows for the specs table
 *  - availableColors: Array of hex color strings
 *  - extraColors   : Number to show as "+N" after the swatches
 *  - applications  : Array of strings for the Applications section
 *  - packaging     : Array of strings for the Packaging section
 *  - packagingDetails: { type, netWeight, packing } – structured packaging info
 */

// ─── Categories ────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  "All Yarns",
  "Drawstring & Draw Code",
  "Elastic",
  "Sewing Thread",
  "Twill Tape",
  "Tips",
];

// ─── Products ──────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 1,
    title: "Drawstring",
    category: "Drawstring & Draw Code",
    type: "High tenacity Drawstring yarn",
    image: "/Products/Drawstring.jpg",
    pill: "Drawstring & Draw Code",
    description:
      "Our Drawstring & Drawcord collection is engineered to deliver the perfect balance of functionality, durability, and refined finishing for modern apparel and lifestyle products. Manufactured using high-quality cotton, polyester, and synthetic yarns, our drawcords are designed to provide reliable performance with a clean, premium appearance. All raw materials are sourced from China, India, Malaysia, Taiwan, and Thailand, and every product is 100% Oeko-Tex certified.",
    keyFeatures: [
      "Premium Quality",
      "Durable Construction",
      "Custom Colors",
      "Multiple Sizes",
      "Flexible & Strong",
      "Custom Tipping",
      "Consistent Finish",
    ],
    specifications: [
      { label: "Material", value: "Cotton" },
      { label: "Width", value: "Customizable" },
      { label: "Color", value: "Custom Color / Pantone Matching" },
      { label: "Length", value: "Customizable" },
      { label: "Finish", value: "Standard / Premium" },
      { label: "Packaging", value: "Customized Packaging Available" },
    ],
    availableColors: [
      "#ffffff",
      "#ccd5e0",
      "#9ca9b8",
      "#1b2d56",
      "#1a1a1a",
      "#c9b8ad",
      "#0f5257",
    ],
    extraColors: 5,
    applications: [
      "Knitting",
      "Home Textile",
      "Weaving",
      "Industrial Fabrics",
      "Sewing threads",
      "Garments",
    ],
    packaging: [
      "Cone Type",
      "Cylindrical",
      "Net Weight",
      "1.55 kg/ cone",
      "Packing",
      "15 cones / bag",
    ],
    packagingDetails: {
      type: "Cone Type / Cylindrical",
      netWeight: "1.55 kg / cone",
      packing: "15 cones / bag",
    },
    productionCapacity: {
      perDay: "80,400 Yd",
      perMonth: "20,90,400 Yd",
    },
  },

  {
    id: 2,
    title: "Elastic",
    category: "Elastic",
    type: "100% Combed Elastic yarn",
    image: "/Products/Elastic.jpg",
    pill: "Elastic",
    description:
      "Our Elastic collection is crafted for maximum stretch retention and comfort. Ideal for waistbands, cuffs, and activewear, each yarn ensures consistent tension and long-lasting performance across all garment types. All raw materials are sourced from China, India, Malaysia, Taiwan, and Thailand, and every product is 100% Oeko-Tex certified.",
    keyFeatures: [
      "High Stretch Recovery",
      "Soft & Comfortable",
      "Multiple Widths Available",
      "Chlorine Resistant",
      "Lightweight",
      "Custom Colors",
    ],
    specifications: [
      { label: "Material", value: "100% Combed Cotton" },
      { label: "Width", value: "5mm – 80mm" },
      { label: "Color", value: "Custom / Pantone Matching" },
      { label: "Stretch", value: "Up to 200%" },
      { label: "Finish", value: "Woven / Knitted" },
      { label: "Packaging", value: "Roll / Bag" },
    ],
    availableColors: ["#ffffff", "#000000", "#e63946", "#457b9d", "#a8dadc"],
    extraColors: 3,
    applications: [
      "Waistbands",
      "Cuffs",
      "Activewear",
      "Swimwear",
      "Undergarments",
      "Home Textile",
    ],
    packaging: [
      "Roll Type",
      "Card Type",
      "Net Weight",
      "1 kg / roll",
      "Packing",
      "10 rolls / bag",
    ],
    packagingDetails: {
      type: "Roll / Card Type",
      netWeight: "1 kg / roll",
      packing: "10 rolls / bag",
    },
    productionCapacity: {
      perDay: "146,900 Yd",
      perMonth: "38,19,400 Yd",
    },
  },

  {
    id: 3,
    title: "Sewing Thread",
    category: "Sewing Thread",
    type: "Blend of quality fibers",
    image: "/Products/Sewing.png",
    pill: "Sewing Thread",
    description:
      "Our Sewing Thread is a premium blend of carefully selected quality fibers, engineered to deliver smooth stitching, excellent seam strength, and outstanding consistency. Suitable for high-speed industrial sewing machines and hand sewing alike. All raw materials are sourced from China, India, Malaysia, Taiwan, and Thailand, and every product is 100% Oeko-Tex certified.",
    keyFeatures: [
      "Even Tension",
      "Low Lint",
      "High Seam Strength",
      "Excellent Knot Strength",
      "Consistent Twist",
      "Wide Color Range",
      "UV & Heat Resistant",
    ],
    specifications: [
      { label: "Material", value: "Polyester / Cotton Blend" },
      { label: "Count", value: "10s – 120s" },
      { label: "Color", value: "Over 500+ shades" },
      { label: "Twist", value: "S / Z Twist" },
      { label: "Finish", value: "Soft / Mercerized" },
      { label: "Packaging", value: "Cone / Spool" },
    ],
    availableColors: [
      "#ffffff",
      "#ffb703",
      "#fb8500",
      "#023047",
      "#219ebc",
      "#8ecae6",
    ],
    extraColors: 10,
    applications: [
      "Garment Stitching",
      "Footwear",
      "Bags & Accessories",
      "Automotive Textiles",
      "Home Furnishing",
      "Industrial Sewing",
    ],
    packaging: [
      "Cone Type",
      "Spool Type",
      "Net Weight",
      "2 kg / cone",
      "Packing",
      "12 cones / carton",
    ],
    packagingDetails: {
      type: "Cone / Spool",
      netWeight: "2 kg / cone",
      packing: "12 cones / carton",
    },
    productionCapacity: {
      perDay: "18,000 Cone",
      perMonth: "4,68,000 Cone",
    },
  },

  {
    id: 4,
    title: "Twill Tape",
    category: "Twill Tape",
    type: "Vibrant colors, lasting quality",
    image: "/Products/Twil-Tape.jpg",
    pill: "Twill Tape",
    description:
      "Our Twill Tape is woven to deliver a firm, durable structure with smooth edges, making it ideal for garment binding, labelling, straps, and decorative applications. Available in an extensive range of widths and vibrant custom colors. All raw materials are sourced from China, India, Malaysia, Taiwan, and Thailand, and every product is 100% Oeko-Tex certified.",
    keyFeatures: [
      "Firm Weave Construction",
      "Smooth Finished Edges",
      "Vibrant Dye Retention",
      "Pre-shrunk",
      "Multiple Widths",
      "Customizable Patterns",
    ],
    specifications: [
      { label: "Material", value: "100% Cotton / Poly-Cotton" },
      { label: "Width", value: "6mm – 50mm" },
      { label: "Color", value: "Custom / Pantone Matching" },
      { label: "Weave", value: "2×2 Twill / Plain" },
      { label: "Finish", value: "Soft / Stiff" },
      { label: "Packaging", value: "Roll / Reel" },
    ],
    availableColors: [
      "#ffffff",
      "#264653",
      "#2a9d8f",
      "#e9c46a",
      "#f4a261",
      "#e76f51",
    ],
    extraColors: 7,
    applications: [
      "Garment Binding",
      "Waist Labels",
      "Bag Straps",
      "Shoe Laces",
      "Decorative Trim",
      "Craft & DIY",
    ],
    packaging: [
      "Roll Type",
      "Reel Type",
      "Net Weight",
      "0.5 kg / roll",
      "Packing",
      "20 rolls / carton",
    ],
    packagingDetails: {
      type: "Roll / Reel",
      netWeight: "0.5 kg / roll",
      packing: "20 rolls / carton",
    },
    productionCapacity: {
      perDay: "108,000 Yd",
      perMonth: "28,08,000 Yd",
    },
  },

  {
    id: 5,
    title: "Tips",
    category: "Tips",
    type: "All kinds of drawcord & lace tips",
    image: "/Products/Tips.png",
    pill: "Tips",
    description:
      "Our Tips collection covers all kinds of aglets and end-caps used on drawstrings, drawcords, and laces, engineered for a secure fit and a clean, finished look. Manufactured to match a wide range of cord thicknesses and finishes, all raw materials are sourced from China, India, Malaysia, Taiwan, and Thailand, and every product is 100% Oeko-Tex certified.",
    keyFeatures: [
      "Secure Crimp Fit",
      "Multiple Finishes",
      "Custom Colors",
      "Various Lengths",
      "Metal & Plastic Options",
      "Consistent Quality",
    ],
    specifications: [
      { label: "Material", value: "Metal / Plastic" },
      { label: "Length", value: "Customizable" },
      { label: "Color", value: "Custom / Pantone Matching" },
      { label: "Finish", value: "Matte / Glossy" },
      { label: "Fit", value: "Crimped / Molded" },
      { label: "Packaging", value: "Customized Packaging Available" },
    ],
    availableColors: ["#ffffff", "#1a1a1a", "#8c8c8c", "#b08d57", "#7b241c"],
    extraColors: 4,
    applications: [
      "Drawstrings",
      "Shoe Laces",
      "Hoodies & Jackets",
      "Bags & Accessories",
      "Sportswear",
      "Home Textile",
    ],
    packaging: [
      "Box Type",
      "Bag Type",
      "Net Weight",
      "As per order",
      "Packing",
      "As per order",
    ],
    packagingDetails: {
      type: "Box / Bag",
      netWeight: "As per order",
      packing: "As per order",
    },
  },
];
