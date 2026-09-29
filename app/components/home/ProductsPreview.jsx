import Image from "next/image";
import Link from "next/link";
import ProductModel from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoose";
import { PRODUCTS } from "@/data/products";
import { ChevronRight } from "lucide-react";

async function getProducts() {
  try {
    await connectToDatabase();
    const products = await ProductModel.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(4)
      .lean();

    if (products && products.length > 0) {
      return JSON.parse(JSON.stringify(products));
    }
  } catch (error) {
    console.warn("Products preview using fallback data:", error.message);
  }

  // Fallback
  return PRODUCTS.slice(0, 4).map((product) => ({
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

export default async function ProductsPreview() {
  const products = await getProducts();

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Products
            </h2>
            <p className="text-gray-500 max-w-xl">
              Explore our wide range of garments accessories manufactured
              with premium quality and OEKO-TEX certified standards.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View All
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="h-[200px] relative bg-gray-50 overflow-hidden">
                <Image
                  src={product.images?.[0] || "/yarn.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold"
          >
            View All Products
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
