import { NextResponse } from "next/server";
import BankPartner from "@/lib/models/BankPartner";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const bank = await BankPartner.findById(id);
    if (!bank) {
      return NextResponse.json({ error: "Bank not found" }, { status: 404 });
    }

    return NextResponse.json({ bank });
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

    const { id } = await params;
    await connectToDatabase();
    const body = await request.json();

    const bank = await BankPartner.findByIdAndUpdate(id, body, { new: true });
    if (!bank) {
      return NextResponse.json({ error: "Bank not found" }, { status: 404 });
    }

    return NextResponse.json({ bank });
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

    const { id } = await params;
    await connectToDatabase();
    const bank = await BankPartner.findByIdAndDelete(id);
    if (!bank) {
      return NextResponse.json({ error: "Bank not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Bank deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
