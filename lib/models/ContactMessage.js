import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

const ContactMessage = mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
