import { NextResponse } from "next/server";
import Certificate from "@/lib/models/Certificate";
import connectToDatabase from "@/lib/mongoose";
import { certifications } from "@/app/about/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const dbCerts = await Certificate.find({
      isActive: true,
      title: { $not: /Company Profile/i },
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      { certificates: dbCerts?.length ? dbCerts : certifications },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.warn("Certificates API using fallback data:", error.message);
    return NextResponse.json({ certificates: certifications });
  }
}
