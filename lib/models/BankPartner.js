import mongoose from "mongoose";

const bankPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String },
  address: { type: String },
  tel: { type: String },
  fax: { type: String },
  swift: { type: String },
  logo: { type: String },
  image: { type: String },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, strict: false });

bankPartnerSchema.index({ isActive: 1, displayOrder: 1, createdAt: 1 });

const BankPartner = mongoose.models.BankPartner || mongoose.model("BankPartner", bankPartnerSchema);

export default BankPartner;
