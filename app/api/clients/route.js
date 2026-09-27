import { NextResponse } from "next/server";
import Client from "@/lib/models/Client";
import connectToDatabase from "@/lib/mongoose";
import { TRUSTED_BRANDS } from "@/data/siteContent";

export const dynamic = "force-dynamic";

function getFallbackClients() {
  return TRUSTED_BRANDS.map((brand, index) => ({
    _id: `static-client-${index}`,
    name: brand.name,
    logo: brand.src,
    isActive: true,
  }));
}

export async function GET() {
  try {
    await connectToDatabase();
    const clients = await Client.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      { clients: clients?.length ? clients : getFallbackClients() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.warn("Clients API using fallback data:", error.message);
    return NextResponse.json({ clients: getFallbackClients() });
  }
}
