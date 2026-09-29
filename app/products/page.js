import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/Button";
import { ChevronRight, Award, Settings, Leaf, Globe } from "lucide-react";
import { PRODUCTS_PAGE_CONTENT } from "@/data/siteContent";
import ProductModel from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoose";
import { PRODUCTS as fallbackProducts } from "@/data/products";
import ProductCatalog from "@/app/components/products/ProductCatalog";

export const revalidate = 60;

export const metadata = {
  title: "Our Products",
  description:
    "Explore our wide range of OEKO-TEX certified garments accessories including sewing thread, elastic, twill tape, and drawstring.",
};

async function getProducts() {
  try {
    await connectToDatabase();
    const products = await ProductModel.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    if (products && products.length > 0) {
      // JSON serialization removes all ObjectId and toJSON methods from nested Mongoose subdocuments
      return JSON.parse(JSON.stringify(products));
    }
  } catch (error) {
    console.warn("Products API using fallback data:", error.message);
  }

  return fallbackProducts.map((product) => ({
    ...product,
    _id: String(product.id),
    name: product.title,
    shortDescription: product.type,
    fullDescription: product.description,
    isActive: true,
    images: [product.image],
    displayOrder: product.id,
  }));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="flex-1 w-full bg-white relative">
      <div className="container mx-auto px-6 w-full pb-2">
        {/* Page Header */}
        <section className="flex flex-col md:flex-row items-start justify-between pt-6 sm:pt-8 md:pt-10 pb-3 md:pb-5 gap-8 sm:gap-10">
          <div className="flex-1 max-w-[600px] text-center md:text-left order-2 md:order-1">
            <h4 className="text-primary text-[12px] sm:text-[14px] font-semibold uppercase tracking-wide mb-3 sm:mb-4">
              {PRODUCTS_PAGE_CONTENT.hero.eyebrow}
            </h4>
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-tight mb-4 text-gray-800">
              {PRODUCTS_PAGE_CONTENT.hero.titleLine1}
              <br />
              <span className="text-primary">
                {PRODUCTS_PAGE_CONTENT.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-[14px] sm:text-[16px] text-gray-600 max-w-[450px] mx-auto md:mx-0">
              {PRODUCTS_PAGE_CONTENT.hero.description}
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end w-full order-1 md:order-2">
            <Image
              src={PRODUCTS_PAGE_CONTENT.hero.image}
              alt="Three spools of yarn"
              width={400}
              height={300}
              priority
              style={{ width: "auto", height: "auto" }}
              className="max-w-[220px] sm:max-w-[300px] md:max-w-[400px] object-contain"
            />
          </div>
        </section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Product Catalog
            </h2>
            <p className="text-gray-500">
              Showing all premium accessories
            </p>
          </div>
        </div>

        <ProductCatalog initialProducts={products} />

        {/* Features Banner */}
        <div className="flex flex-col md:flex-row justify-between bg-gray-50 p-6 md:p-8 rounded-xl mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-primary shrink-0">
              <Award width={20} height={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-gray-800">
                {PRODUCTS_PAGE_CONTENT.features[0].title}
              </span>
              <span className="text-[12px] text-gray-500">
                {PRODUCTS_PAGE_CONTENT.features[0].subtitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-primary shrink-0">
              <Settings width={20} height={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-gray-800">
                {PRODUCTS_PAGE_CONTENT.features[1].title}
              </span>
              <span className="text-[12px] text-gray-500">
                {PRODUCTS_PAGE_CONTENT.features[1].subtitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-primary shrink-0">
              <Leaf width={20} height={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-gray-800">
                {PRODUCTS_PAGE_CONTENT.features[2].title}
              </span>
              <span className="text-[12px] text-gray-500">
                {PRODUCTS_PAGE_CONTENT.features[2].subtitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-primary shrink-0">
              <Globe width={20} height={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-gray-800">
                {PRODUCTS_PAGE_CONTENT.features[3].title}
              </span>
              <span className="text-[12px] text-gray-500">
                {PRODUCTS_PAGE_CONTENT.features[3].subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-primary rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-white gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-semibold mb-2">
              {PRODUCTS_PAGE_CONTENT.cta.title}
            </h3>
            <p className="text-[15px] opacity-90">
              {PRODUCTS_PAGE_CONTENT.cta.description}
            </p>
          </div>
          <Link href="/contact">
            <Button variant="secondary" icon={<ChevronRight strokeWidth={2} />}>
              {PRODUCTS_PAGE_CONTENT.cta.button}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
