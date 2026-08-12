import { NextResponse } from "next/server";
import Client from "@/lib/models/Client";
import connectToDatabase from "@/lib/mongoose";

export async function GET() {
  try {
    await connectToDatabase();
    const clients = await Client.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ clients });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
