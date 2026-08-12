import { NextResponse } from "next/server";
import Application from "@/lib/models/Application";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export async function GET(request, { params }) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;
    const application = await Application.findById(id);
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ application });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    if (!body.applicationStatus || !["Pending", "Shortlisted", "Rejected", "Hired"].includes(body.applicationStatus)) {
      return NextResponse.json({ error: "Invalid application status" }, { status: 400 });
    }

    const application = await Application.findByIdAndUpdate(id, body, { new: true });
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ application });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
