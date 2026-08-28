import { NextResponse } from "next/server";
import BankPartner from "@/lib/models/BankPartner";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const banks = await BankPartner.find({}).sort({ displayOrder: 1, createdAt: 1 });
    return NextResponse.json({ banks });
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

    if (!body.name || String(body.name).trim() === "") {
      return NextResponse.json({ error: "Bank name is required" }, { status: 400 });
    }

    const bank = await BankPartner.create({
      name: body.name,
      branch: body.branch || "",
      address: body.address || "",
      tel: body.tel || "",
      fax: body.fax || "",
      swift: body.swift || "",
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : 0,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    });

    return NextResponse.json({ bank }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
