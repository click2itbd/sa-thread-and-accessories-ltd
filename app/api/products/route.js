import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoose";
import { PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

function getFallbackProducts() {
  return PRODUCTS.map((product) => ({
    ...product,
    _id: String(product.id),
    name: product.title,
    shortDescription: product.type,
    fullDescription: product.description,
    images: [product.image],
    displayOrder: product.id,
    isActive: true,
  }));
}

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      { products: products?.length ? products : getFallbackProducts() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.warn("Products API using fallback data:", error.message);
    return NextResponse.json({ products: getFallbackProducts() });
  }
}
