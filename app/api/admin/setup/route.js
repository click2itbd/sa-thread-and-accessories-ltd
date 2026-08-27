import { NextResponse } from "next/server";
import Admin from "@/lib/models/Admin";
import connectToDatabase from "@/lib/mongoose";

export async function POST(request) {
  try {
    // 1. Check if setup is disabled
    if (process.env.ADMIN_SETUP_DISABLED === "true") {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    // 2. Check setup secret if not in development
    if (process.env.NODE_ENV !== "development") {
      const setupSecret = process.env.SETUP_SECRET;
      const providedSecret = request.headers.get("x-setup-secret");
      
      if (!setupSecret || providedSecret !== setupSecret) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }
    }

    await connectToDatabase();
    
    // 3. Prevent if any admin already exists (only 1 admin allowed currently)
    const adminCount = await Admin.countDocuments({});
    if (adminCount > 0) {
      return NextResponse.json({ error: "Admin already exists. Setup is locked." }, { status: 400 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
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
