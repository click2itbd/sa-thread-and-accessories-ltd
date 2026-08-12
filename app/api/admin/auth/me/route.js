import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/lib/models/Admin";
import connectToDatabase from "@/lib/mongoose";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-change-in-production";

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const match = cookieHeader.match(/admin-token=([^;]+)/);
    if (!match) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const token = match[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    await connectToDatabase();
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, email: admin.email });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
