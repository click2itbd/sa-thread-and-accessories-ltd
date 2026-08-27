import mongoose from "mongoose";

const passwordResetOTPSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  email: { type: String, required: true, lowercase: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// TTL index to automatically remove expired OTPs after 5 minutes
// Using 300 seconds (5 mins) as the TTL. Documents will be deleted some time after this passes.
passwordResetOTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound index for fast lookup during verification
passwordResetOTPSchema.index({ email: 1, verified: 1 });

const PasswordResetOTP = mongoose.models.PasswordResetOTP || mongoose.model("PasswordResetOTP", passwordResetOTPSchema);

export default PasswordResetOTP;
