import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  websiteUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

clientSchema.index({ isActive: 1, displayOrder: 1, createdAt: -1 });

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
