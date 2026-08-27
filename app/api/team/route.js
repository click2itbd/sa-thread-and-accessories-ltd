import { NextResponse } from "next/server";
import TeamMember from "@/lib/models/TeamMember";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const members = await TeamMember.find({}).sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ members });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
