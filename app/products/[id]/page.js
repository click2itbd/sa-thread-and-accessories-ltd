import { notFound } from "next/navigation";
import Image from "next/image";
import { blurDataURL } from "@/lib/imageUtils";
import Link from "next/link";
import Button from "@/app/components/Button";
import { PRODUCT_BADGES, PRODUCT_MODAL_CONTENT } from "@/data/siteContent";
import { PRODUCTS } from "@/data/products";
import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoose";
import mongoose from "mongoose";
import {
  Award,
  Shield,
  CheckCircle,
  Leaf,
  ArrowLeft,
  FileText,
  ArrowRight,
} from "lucide-react";

const badgeIcons = {
  premium: Award,
  strength: Shield,
  performance: CheckCircle,
  eco: Leaf,
};

function getStaticProduct(id) {
  return PRODUCTS.map((product) => ({
    ...product,
    _id: String(product.id),
    name: product.title,
    shortDescription: product.type,
    fullDescription: product.description,
    images: [product.image],
    isActive: true,
    displayOrder: product.id,
  })).find((product) => String(product._id) === String(id));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let product = null;

  if (mongoose.isValidObjectId(id)) {
    try {
      await connectToDatabase();
      product = await Product.findOne({ _id: id, isActive: true }).lean();
    } catch {
      // Fallback
    }
  }

  product = product || getStaticProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Garments Accessories`,
    description: product.shortDescription || product.fullDescription || `Explore ${product.name} manufactured by SA Thread & Accessories Ltd. in Bangladesh.`,
    openGraph: {
      title: `${product.name} | SA Thread & Accessories Ltd.`,
      description: product.shortDescription || product.fullDescription,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  let product = null;

  if (mongoose.isValidObjectId(id)) {
    try {
      await connectToDatabase();
      product = await Product.findOne({ _id: id, isActive: true }).lean();
    } catch (error) {
      console.error("Failed to load product:", error);
    }
  }

  product = product || getStaticProduct(id);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 w-full py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-primary transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Main Grid */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            {/* Left: Image + Badges */}
            <div className="flex flex-col gap-6">
              <div className="relative w-full rounded-xl overflow-hidden bg-gray-50 aspect-[4/3]">
                <Image
                  src={product.images?.[0] || "/yarn.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {PRODUCT_BADGES.map((badge) => {
                  const Icon = badgeIcons[badge.key];
                  return (
                    <div
                      key={badge.key}
                      className="flex flex-col items-center text-center gap-2 p-3 bg-gray-50 rounded-xl"
                    >
                      {Icon && (
                        <Icon
                          className="w-7 h-7 text-primary"
                          strokeWidth={2}
                        />
                      )}
                      <span className="text-[11px] font-medium text-gray-600 whitespace-pre-line">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col">
              <div className="inline-block self-start bg-blue-50 text-primary px-4 py-1.5 rounded-full text-[13px] font-semibold mb-4">
                {product.category}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
                {product.fullDescription}
              </p>

              {product.keyFeatures && product.keyFeatures.length > 0 && (
                <>
                  <h4 className="text-[15px] font-semibold text-gray-800 mb-3">
                    {PRODUCT_MODAL_CONTENT.keyFeaturesTitle}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6">
                    {product.keyFeatures.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[14px] text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {product.specifications && product.specifications.length > 0 && (
                <>
                  <h4 className="text-[15px] font-semibold text-gray-800 mb-3">
                    {PRODUCT_MODAL_CONTENT.specificationsTitle}
                  </h4>
                  <div className="border border-border rounded-xl overflow-hidden mb-4">
                    <table className="w-full border-collapse">
                      <tbody>
                        {product.specifications.map((spec, i) => (
                          <tr
                            key={i}
                            className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} ${i < product.specifications.length - 1 ? "border-b border-border" : ""}`}
                          >
                            <td className="py-3 px-4 text-[13px] text-gray-500 w-[35%] font-medium">
                              {spec.label}
                            </td>
                            <td className="py-3 px-4 text-[13px] font-semibold text-gray-800">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {product.availableColors &&
                product.availableColors.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center p-4  rounded-xl mb-4">
                    <span className="text-[13px] text-gray-500 font-medium mr-2 w-full mb-2">
                      {PRODUCT_MODAL_CONTENT.availableColorsLabel}
                    </span>
                    {product.availableColors.map((color, i) => (
                      <div
                        key={i}
                        title={color}
                        className="w-7 h-7 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform shrink-0"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.extraColors > 0 && (
                      <span className="text-[12px] text-gray-500 font-medium ml-1">
                        +{product.extraColors} more
                      </span>
                    )}
                  </div>
                )}
            </div>
          </div>

          {/* Bottom: Applications, Packaging, Production */}
          {(product.applications ||
            product.packaging ||
            product.productionCapacity) && (
            <div className=" pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.applications && product.applications.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6 ">
                    <h4 className="text-[15px] font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 bg-primary rounded-full inline-block"></span>
                      {PRODUCT_MODAL_CONTENT.applicationsTitle}
                    </h4>
                    <ul className="grid grid-cols-2 gap-y-3">
                      {product.applications.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-[13px] text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.packaging && product.packaging.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-[15px] font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-1 h-4 bg-primary rounded-full inline-block"></span>
                      {PRODUCT_MODAL_CONTENT.packagingTitle}
                    </h4>
                    <ul className="grid grid-cols-2 gap-y-3">
                      {product.packaging.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-[13px] text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.productionCapacity &&
                  (product.productionCapacity.perDay ||
                    product.productionCapacity.perMonth) && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-[15px] font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-primary rounded-full inline-block"></span>
                        Production Capacity
                      </h4>
                      <ul className="grid grid-cols-2 gap-y-3">
                        {product.productionCapacity.perDay && (
                          <li className="flex items-center gap-2 text-[13px] text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                            {product.productionCapacity.perDay} / day
                          </li>
                        )}
                        {product.productionCapacity.perMonth && (
                          <li className="flex items-center gap-2 text-[13px] text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                            {product.productionCapacity.perMonth} / month
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <Link href="/products">
            <Button
              variant="outline"
              className="w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={2} />
              {PRODUCT_MODAL_CONTENT.actions.back}
            </Button>
          </Link>
          <Button variant="outline" className="w-full sm:w-auto justify-center">
            <FileText className="w-4 h-4 mr-2" strokeWidth={2} />
            {PRODUCT_MODAL_CONTENT.actions.requestSample}
          </Button>
          <Button variant="primary" className="w-full sm:w-auto justify-center">
            {PRODUCT_MODAL_CONTENT.actions.getQuotation}
            <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </main>
  );
}
