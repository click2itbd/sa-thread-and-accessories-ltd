import mongoose from "mongoose";

const companySettingsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  tagline: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  googleMapsUrl: { type: String },
  facebookUrl: { type: String },
  linkedinUrl: { type: String },
  youtubeUrl: { type: String },
  websiteLogo: { type: String },
  favicon: { type: String },

  // Downloadable PDFs (About Us More / Documentation)
  companyProfilePdf: { type: String, default: "/Certificates/Company Profile SA THREAD & ACCESSORIES LTD..pdf" },
  companyProfileTitle: { type: String, default: "Company Profile" },
  companyProfileSubtitle: { type: String, default: "SA Thread & Accessories Ltd. (PDF)" },

  oekotexCertificatePdf: { type: String, default: "/Certificates/Oekotex certificate-2025.pdf" },
  oekotexCertificateTitle: { type: String, default: "OEKO-TEX Certificate" },
  oekotexCertificateSubtitle: { type: String, default: "STANDARD 100 — 2025 (PDF)" },
}, { timestamps: true, strict: false });

const CompanySettings = mongoose.models.CompanySettings || mongoose.model("CompanySettings", companySettingsSchema);

export default CompanySettings;
