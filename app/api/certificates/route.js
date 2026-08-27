import { NextResponse } from "next/server";
import Certificate from "@/lib/models/Certificate";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    // Ensure only actual certification accreditations are fetched for the website
    // (excluding any Company Profile doc)
    const certificates = await Certificate.find({
      isActive: true,
      title: { $not: /Company Profile/i },
    }).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ certificates });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
