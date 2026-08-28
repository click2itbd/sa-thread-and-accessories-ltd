import { NextResponse } from "next/server";
import CompanySettings from "@/lib/models/CompanySettings";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  companyProfilePdf: "/Certificates/Company Profile SA THREAD & ACCESSORIES LTD..pdf",
  companyProfileTitle: "Company Profile",
  companyProfileSubtitle: "SA Thread & Accessories Ltd. (PDF)",
  oekotexCertificatePdf: "/Certificates/Oekotex certificate-2025.pdf",
  oekotexCertificateTitle: "OEKO-TEX Certificate",
  oekotexCertificateSubtitle: "STANDARD 100 — 2025 (PDF)",
};

export async function GET() {
  try {
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
