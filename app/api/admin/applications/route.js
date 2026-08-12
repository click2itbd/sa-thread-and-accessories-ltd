import { NextResponse } from "next/server";
import Application from "@/lib/models/Application";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export async function GET(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const filterPosition = searchParams.get("position") || "";

    const query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { appliedPosition: { $regex: search, $options: "i" } },
      ];
    }
    if (filterPosition) {
      query.appliedPosition = filterPosition;
    }

    const applications = await Application.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ applications });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
