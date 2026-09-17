"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/Button";
import { ChevronRight, Award, Settings, Leaf, Globe } from "lucide-react";
import { PRODUCTS_PAGE_CONTENT } from "@/data/siteContent";
import { PRODUCTS } from "@/data/products";
import { blurDataURL } from "@/lib/imageUtils";

function getFallbackProducts() {
  return PRODUCTS.map((product) => ({
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

export default function ProductsPage() {
  const [products, setProducts] = useState(getFallbackProducts);
  const [categories, setCategories] = useState(() => [
    "All",
    ...new Set(getFallbackProducts().map((p) => p.category).filter(Boolean)),
  ]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        const activeProducts = data.products?.length
          ? data.products
          : getFallbackProducts();
        setProducts(activeProducts);
        const uniqueCategories = [
          "All",
          ...new Set(activeProducts.map((p) => p.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0 && activeCategory === "All") {
          setActiveCategory(uniqueCategories[0]);
        }
      } else {
        const staticProducts = getFallbackProducts();
        setProducts(staticProducts);
        const uniqueCategories = [
          "All",
          ...new Set(staticProducts.map((p) => p.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0 && activeCategory === "All") {
          setActiveCategory(uniqueCategories[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      const staticProducts = getFallbackProducts();
      setProducts(staticProducts);
      const uniqueCategories = [
        "All",
        ...new Set(staticProducts.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
      if (uniqueCategories.length > 0 && activeCategory === "All") {
        setActiveCategory(uniqueCategories[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const chevronRight = <ChevronRight strokeWidth={2} />;

  if (loading) {
    return (
      <main>
        <div className="container mx-auto px-6 w-full pb-20">
          <div className="text-center py-20 text-gray-500">
            Loading products...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
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
          <Button variant="secondary" icon={chevronRight}>
            {PRODUCTS_PAGE_CONTENT.cta.button}
          </Button>
        </div>
      </div>
    </main>
  );
}
