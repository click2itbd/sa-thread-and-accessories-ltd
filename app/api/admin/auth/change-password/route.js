import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import connectToDatabase from "@/lib/mongoose";

export async function POST(request) {
  try {
    const admin = await requireAdmin();
    const { currentPassword, newPassword, confirmPassword } = await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "New passwords do not match" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters long" }, { status: 400 });
    }

    const isPasswordValid = await admin.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    admin.password = newPassword; // Mongoose pre-save hook will hash it
    admin.passwordChangedAt = new Date();
    await admin.save();

    return NextResponse.json({ 
      success: true, 
      message: "Password changed successfully." 
    });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
