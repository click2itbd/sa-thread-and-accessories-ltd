import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  pdfFile: { type: String },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);

export default Certificate;
