import { NextResponse } from "next/server";
import JobPost from "@/lib/models/JobPost";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await JobPost.find({ status: "Open", isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ jobs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
