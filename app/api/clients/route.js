import { NextResponse } from "next/server";
import Client from "@/lib/models/Client";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = "force-dynamic";

const LOGO_MAP = {
  "Aba Group": "/Clients/ABA-Fashion.png",
  "Day Group": "/Clients/Day-Group.jpg",
  "Saturn Textile Ltd": "/Clients/Saturn.png",
  "Alfa Patterns ltd": "/Clients/alpha_dies_and_pattern_logo.jpg",
  "Alfa Patterns Ltd": "/Clients/alpha_dies_and_pattern_logo.jpg",
};

export async function GET() {
  try {
    await connectToDatabase();

    // Auto-sync client logos if missing in database
    for (const [name, logo] of Object.entries(LOGO_MAP)) {
      await Client.updateMany(
        { name: { $regex: new RegExp(`^${name}$`, "i") }, $or: [{ logo: "" }, { logo: { $exists: false } }, { logo: null }] },
        { $set: { logo } }
      );
    }

    const clients = await Client.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ clients });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
