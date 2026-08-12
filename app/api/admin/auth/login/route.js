import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/lib/models/Admin";
import connectToDatabase from "@/lib/mongoose";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-change-in-production";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ adminId: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
