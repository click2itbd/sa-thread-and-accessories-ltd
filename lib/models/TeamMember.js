import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  dept: { type: String, required: true },
  image: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  facebookUrl: { type: String },
  linkedinUrl: { type: String },
  whatsappNumber: { type: String },
  about: { type: String },
  expertise: [{ type: String }],
  responsibilities: [{ type: String }],
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
