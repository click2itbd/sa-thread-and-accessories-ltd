import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, required: true },
  workplace: { type: String, default: "On-site" },
  experience: { type: String, required: true },
  education: { type: String, default: "" },
  salary: { type: String, default: "Negotiable" },
  vacancy: { type: Number, default: 1 },
  deadline: { type: Date },
  description: { type: String, required: true },
  responsibilities: { type: String, default: "" },
  requirements: { type: String, default: "" },
  benefits: { type: String, default: "" },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Ensure updated schema fields are registered in dev mode hot-reload
if (mongoose.models.JobPost) {
  delete mongoose.models.JobPost;
}

const JobPost = mongoose.model("JobPost", jobPostSchema);

export default JobPost;
