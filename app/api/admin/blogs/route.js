import { NextResponse } from "next/server";
import Blog from "@/lib/models/Blog";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export async function GET(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const blog = await Blog.create(body);
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
