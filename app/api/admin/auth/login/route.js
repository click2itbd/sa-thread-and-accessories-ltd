import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/lib/models/Admin";
import connectToDatabase from "@/lib/mongoose";
import { getJwtSecret } from "@/lib/adminAuth";
import { loginLimiter, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimitResult = loginLimiter.check(ip);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
    }

    await connectToDatabase();
    const body = await request.json().catch(() => ({}));
    const email = body?.email ? String(body.email).trim().toLowerCase() : "";
    const password = body?.password ? String(body.password) : "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    let admin = await Admin.findOne({ email });

    // Auto-seed default admin if database is empty
    if (!admin) {
      const adminCount = await Admin.countDocuments();
      const defaultEmail = (process.env.ADMIN_EMAIL || "asif.sathread@gmail.com").toLowerCase();
      const defaultPassword = process.env.ADMIN_PASSWORD || "adminsathread";

      if (adminCount === 0 && email === defaultEmail) {
        admin = await Admin.create({
          email: defaultEmail,
          password: defaultPassword,
          isActive: true,
        });
      }
    }

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

    const response = NextResponse.json({ success: true, message: "Logged in successfully" });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
