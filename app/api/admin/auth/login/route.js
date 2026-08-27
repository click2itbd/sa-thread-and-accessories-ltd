import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/lib/models/Admin";
import connectToDatabase from "@/lib/mongoose";
import { getJwtSecret } from "@/lib/adminAuth";
import { loginLimiter, getClientIp } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimitResult = loginLimiter.check(ip);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
    }

    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !admin.isActive) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Reset rate limiter on successful login
    loginLimiter.reset(ip);

    const secret = getJwtSecret();
    const token = jwt.sign({ adminId: admin._id, email: admin.email, type: "access" }, secret, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
