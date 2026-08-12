import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  appliedPosition: { type: String, required: true },
  cvFile: { type: String, required: true },
  coverLetter: { type: String },
  applicationStatus: { type: String, enum: ["Pending", "Shortlisted", "Rejected", "Hired"], default: "Pending" },
}, { timestamps: true });

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);

export default Application;
