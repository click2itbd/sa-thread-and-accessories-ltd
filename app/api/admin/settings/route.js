import { NextResponse } from "next/server";
import CompanySettings from "@/lib/models/CompanySettings";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export async function GET(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    let settings = await CompanySettings.findOne({});
    if (!settings) {
      settings = await CompanySettings.create({
        companyName: "SA THREAD & ACCESSORIES LTD.",
        tagline: "Garments Accessories Manufacturer & Supplier.",
        email: "sathread@gmail.com",
        phoneNumber: "+8801971170961",
        address: "271/1, Gacha Road, Gacha, Gazipur-1704, Bangladesh",
      });
    }
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    if (!body.companyName || String(body.companyName).trim() === "") {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    let settings = await CompanySettings.findOne({});
    if (!settings) {
      settings = await CompanySettings.create(body);
    } else {
      settings = await CompanySettings.findByIdAndUpdate(settings._id, body, { new: true });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
