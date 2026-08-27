import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PasswordResetOTP from "@/lib/models/PasswordResetOTP";
import connectToDatabase from "@/lib/mongoose";
import { otpLimiter, getClientIp } from "@/lib/rateLimit";
import { getJwtSecret } from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimitResult = otpLimiter.check(ip);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }

    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    await connectToDatabase();
    
    // Find the latest unverified OTP for this email
    const otpRecord = await PasswordResetOTP.findOne({ 
      email: email.toLowerCase(),
      verified: false
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
    }

    if (otpRecord.expiresAt < new Date()) {
      return NextResponse.json({ error: "This OTP has expired. Please request a new OTP." }, { status: 400 });
    }

    if (otpRecord.attempts >= 5) {
      return NextResponse.json({ error: "Too many failed attempts. Please request a new OTP." }, { status: 400 });
    }

    otpRecord.attempts += 1;
    
    const isValid = await bcrypt.compare(otp, otpRecord.otpHash);
    
    if (!isValid) {
      await otpRecord.save(); // Save incremented attempt
      return NextResponse.json({ error: "Invalid OTP." }, { status: 400 });
    }

    // OTP is valid
    otpRecord.verified = true;
    await otpRecord.save();
    
    // Reset IP limit for OTPs
    otpLimiter.reset(ip);

    // Issue a short-lived reset token
    const secret = getJwtSecret();
    const resetToken = jwt.sign(
      { adminId: otpRecord.adminId, email: otpRecord.email, type: "password-reset" },
      secret,
      { expiresIn: "10m" }
    );

    return NextResponse.json({ 
      success: true,
      resetToken 
    });
  } catch (error) {
    console.error("OTP verify error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
