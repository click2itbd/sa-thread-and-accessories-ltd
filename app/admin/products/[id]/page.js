import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongoose";
import Product from "@/lib/models/Product";
import AdminProductsClient from "../../products/ProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminEditProductPage({ params }) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const product = await Product.findById(id).lean();
    if (!product) return notFound();

    return (
      <div className="p-8">
        <AdminProductsClient initialEdit={JSON.parse(JSON.stringify(product))} />
      </div>
    );
  } catch {
    return notFound();
  }
}
