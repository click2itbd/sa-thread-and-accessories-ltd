import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import CompanySettings from "@/lib/models/CompanySettings";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  companyProfilePdf: "/Certificates/Company Profile SA THREAD & ACCESSORIES LTD..pdf",
  companyProfileTitle: "Company Profile",
  companyProfileSubtitle: "SA Thread & Accessories Ltd. (PDF)",
  oekotexCertificatePdf: "/Certificates/Oekotex certificate-2025.pdf",
  oekotexCertificateTitle: "OEKO-TEX Certificate",
  oekotexCertificateSubtitle: "STANDARD 100 — 2025 (PDF)",
};

export async function GET(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    let settings = await CompanySettings.findOne({}).lean();
    if (!settings) {
      const created = await CompanySettings.create({
        companyName: "SA THREAD & ACCESSORIES LTD.",
        tagline: "Garments Accessories Manufacturer & Supplier.",
        email: "sathread@gmail.com",
        phoneNumber: "+8801971170961",
        address: "271/1, Gacha Road, Gacha, Gazipur-1704, Bangladesh",
        ...DEFAULTS,
      });
      settings = created.toObject();
    } else {
      let needsUpdate = false;
      const updateFields = {};
      for (const [key, val] of Object.entries(DEFAULTS)) {
        if (!settings[key]) {
          settings[key] = val;
          updateFields[key] = val;
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        await CompanySettings.updateOne({ _id: settings._id }, { $set: updateFields });
      }
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

    const { _id, createdAt, updatedAt, __v, ...updateData } = body;

    let settings = await CompanySettings.findOne({});
    if (!settings) {
      settings = await CompanySettings.create(updateData);
    } else {
      settings = await CompanySettings.findByIdAndUpdate(
        settings._id,
        { $set: updateData },
        { new: true }
      );
    }

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
