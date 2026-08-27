import { NextResponse } from "next/server";
import Blog from "@/lib/models/Blog";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ isPublished: true, isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
