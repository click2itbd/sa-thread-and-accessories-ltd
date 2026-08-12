import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  websiteUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
