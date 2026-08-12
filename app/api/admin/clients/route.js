import { NextResponse } from "next/server";
import Client from "@/lib/models/Client";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export async function GET(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const clients = await Client.find({}).sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ clients });
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

    if (!body.name || !body.logo) {
      return NextResponse.json({ error: "Name and logo are required" }, { status: 400 });
    }

    const client = await Client.create(body);
    return NextResponse.json({ client }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
