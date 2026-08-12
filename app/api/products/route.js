import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoose";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
