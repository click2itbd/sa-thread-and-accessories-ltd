import { NextResponse } from "next/server";
import BankPartner from "@/lib/models/BankPartner";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = "force-dynamic";

const INITIAL_BANKS = [
  {
    name: "Exim Bank PLC",
    branch: "Uttara Branch",
    address: "House# 61/A, Road# 7, Sector# 4, Uttara Model Town, Dhaka 1230",
    tel: "16246, +880 96040 16246",
    swift: "EXBKBDDH",
    displayOrder: 1,
    isActive: true,
  },
  {
    name: "Mercantile Bank Ltd.",
    branch: "Uttara Branch",
    address: "House# 10A, Road# 7D, Sector# 09, Uttara Model Town, Dhaka-1230",
    tel: "48958177, 48955879, 8931725",
    fax: "88-02-48955881",
    swift: "MBLBBDH017",
    displayOrder: 2,
    isActive: true,
  },
  {
    name: "Pubali Bank Ltd.",
    branch: "Board Bazar Branch",
    address: "Chaina Town Bangladesh, 71 Kalameswar Road, Ward No. 35, Gazipur",
    tel: "01701-225530, 8809612824741",
    swift: "PUBABDDH",
    displayOrder: 3,
    isActive: true,
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    let banks = await BankPartner.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 });

    if (!banks || banks.length === 0) {
      // Auto seed initial banks
      await BankPartner.insertMany(INITIAL_BANKS);
      banks = await BankPartner.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 });
    }

    return NextResponse.json({ banks });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
