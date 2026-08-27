import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import Admin from "@/lib/models/Admin";
import PasswordResetOTP from "@/lib/models/PasswordResetOTP";
import connectToDatabase from "@/lib/mongoose";
import { forgotPasswordLimiter, getClientIp } from "@/lib/rateLimit";
import { sendPasswordResetOtp } from "@/lib/emailService";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimitResult = forgotPasswordLimiter.check(ip);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    
    // We always return success to prevent email enumeration,
    // but we only actually generate and send the OTP if the admin exists and is active.
    if (admin && admin.isActive) {
      // Generate 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpHash = await bcrypt.hash(otp, 12);
      
      // Expire in 5 minutes
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await PasswordResetOTP.create({
        adminId: admin._id,
        email: admin.email,
        otpHash,
        expiresAt
      });

      // Send email (awaiting this could delay response, but ensures it works before saying success)
      await sendPasswordResetOtp({
        toEmail: admin.email,
        otp,
        expiryMinutes: 5
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "If an account exists with this email, a reset OTP has been sent." 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
