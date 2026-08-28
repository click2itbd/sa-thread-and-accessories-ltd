import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = "force-dynamic";

const PRODUCT_DESCRIPTIONS = {
  "Elastic": "100% polyester",
  "Drawstring": "100% polyester and cotton",
  "Sewing Thread": "100% spun polyester",
  "Tips": "Metal/Plastic/Silica Gel",
  "Twill Tape": "100% Cotton/ Nylon/ 100% Polyester",
};

export async function GET() {
  try {
    await connectToDatabase();

    // Auto-sync product descriptions
    for (const [name, desc] of Object.entries(PRODUCT_DESCRIPTIONS)) {
      await Product.updateMany(
        { name: { $regex: new RegExp(`^${name}$`, "i") } },
        { $set: { shortDescription: desc, fullDescription: desc } }
      );
    }

    const products = await Product.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
