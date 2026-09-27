import { NextResponse } from "next/server";
import TeamMember from "@/lib/models/TeamMember";
import connectToDatabase from "@/lib/mongoose";
import { teamMembers } from "@/app/about/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const members = await TeamMember.find({ isActive: { $ne: false } })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json(
      { members: members?.length ? members : teamMembers },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.warn("Team API using fallback data:", error.message);
    return NextResponse.json({ members: teamMembers });
  }
}
