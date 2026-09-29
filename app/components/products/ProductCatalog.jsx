"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { blurDataURL } from "@/lib/imageUtils";

export default function ProductCatalog({ initialProducts }) {
  const [products] = useState(initialProducts);
  const [categories] = useState(() => [
    "All",
    ...new Set(initialProducts.map((p) => p.category).filter(Boolean)),
  ]);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Categories */}
      <div className="mb-10">
        {/* Mobile: scrollable row */}
        <div className="flex sm:hidden gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-2 rounded-full border text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop: pill container */}
        <div className="hidden sm:inline-flex gap-3 overflow-x-auto p-2 border-2 border-gray-300 rounded-[40px] items-center hide-scrollbar max-w-full flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2.5 rounded-full border text-[14px] font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-border hover:border-gray-300"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-[14px]">No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image Section */}
              <div className="relative h-[220px] overflow-hidden bg-gray-50">
                <Image
                  src={product.images?.[0] || "/yarn.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={blurDataURL()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {product.category && (
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary shadow backdrop-blur-sm">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-[17px] font-semibold leading-snug text-gray-900 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="mb-5 line-clamp-2 flex-1 text-[13px] leading-relaxed text-gray-500">
                  {product.shortDescription}
                </p>

                {/* Divider */}
                <div className="mb-4 border-t border-dashed border-gray-200" />

                {/* CTA Button */}
                <Link
                  href={`/products/${product._id}`}
                  className="flex items-center justify-between text-[14px] font-semibold text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                >
                  <span>View Details</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
