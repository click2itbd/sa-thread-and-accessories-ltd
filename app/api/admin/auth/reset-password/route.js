import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/lib/models/Admin";
import PasswordResetOTP from "@/lib/models/PasswordResetOTP";
import connectToDatabase from "@/lib/mongoose";
import { getJwtSecret } from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const { resetToken, newPassword, confirmPassword } = await request.json();

    if (!resetToken || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    let decoded;
    try {
      const secret = getJwtSecret();
      decoded = jwt.verify(resetToken, secret);
    } catch {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    if (decoded.type !== "password-reset") {
      return NextResponse.json({ error: "Invalid token type" }, { status: 400 });
    }

    await connectToDatabase();
    
    const admin = await Admin.findById(decoded.adminId);
    
    if (!admin || !admin.isActive) {
      return NextResponse.json({ error: "Account not found or inactive" }, { status: 400 });
    }

    // Update password
    admin.password = newPassword; // Mongoose pre-save hook will hash it
    admin.passwordChangedAt = new Date();
    await admin.save();

    // Invalidate any OTP records for this user
    await PasswordResetOTP.deleteMany({ email: admin.email });

    return NextResponse.json({ 
      success: true, 
      message: "Password reset successfully. Please login with your new password." 
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
