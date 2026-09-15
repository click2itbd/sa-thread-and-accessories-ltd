import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  dept: { type: String, required: true },
  image: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  whatsappNumber: { type: String, default: "" },
  location: { type: String, default: "" },
  linkedinUrl: { type: String, default: "" },
  about: { type: String, default: "" },
  expertise: [{ type: String }],
  responsibilities: [{ type: String }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

teamMemberSchema.index({ isActive: 1, order: 1, createdAt: 1 });

const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
