import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, required: true },
  experience: { type: String, required: true },
  vacancy: { type: Number, default: 1 },
  deadline: { type: Date },
  description: { type: String, required: true },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const JobPost = mongoose.models.JobPost || mongoose.model("JobPost", jobPostSchema);

export default JobPost;
