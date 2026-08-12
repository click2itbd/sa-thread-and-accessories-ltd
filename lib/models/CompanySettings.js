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
}, { timestamps: true });

const CompanySettings = mongoose.models.CompanySettings || mongoose.model("CompanySettings", companySettingsSchema);

export default CompanySettings;
