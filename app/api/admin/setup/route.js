import { NextResponse } from "next/server";
import Admin from "@/lib/models/Admin";
import connectToDatabase from "@/lib/mongoose";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    const admin = await Admin.create({ email: email.toLowerCase(), password });
    return NextResponse.json({ success: true, message: "Admin created successfully", adminId: admin._id });
  } catch (error) {
    console.error("Admin setup error:", error);
    return NextResponse.json({ 
      error: "Failed to create admin", 
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST to create admin." }, { status: 405 });
}
