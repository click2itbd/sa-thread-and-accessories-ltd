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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

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
      <div className="container mx-auto px-6 w-full pb-20">
        {/* Page Header */}
        <section className="flex flex-col md:flex-row items-center justify-between py-6 md:py-10 gap-10">
          <div className="flex-1 max-w-[600px] text-center md:text-left">
            <h4 className="text-primary text-[14px] font-semibold uppercase tracking-wide mb-4">
              {PRODUCTS_PAGE_CONTENT.hero.eyebrow}
            </h4>
            <h1 className="text-4xl md:text-[42px] font-bold leading-tight mb-4 text-gray-800">
              {PRODUCTS_PAGE_CONTENT.hero.titleLine1}
              <br />
              <span className="text-primary">
                {PRODUCTS_PAGE_CONTENT.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-[16px] text-gray-600 max-w-[450px] mx-auto md:mx-0">
              {PRODUCTS_PAGE_CONTENT.hero.description}
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end w-full">
            <Image
              src={PRODUCTS_PAGE_CONTENT.hero.image}
              alt="Three spools of yarn"
              width={400}
              height={300}
              priority
              className="max-w-[400px] w-full h-auto object-contain"
            />
          </div>
        </section>

        {/* Categories */}
        <div className="inline-flex gap-4 mb-10 overflow-x-auto p-2 border-2 border-gray-400 rounded-[40px] items-center hide-scrollbar max-w-full">
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

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-[14px]">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map((product) => (
              <div
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_45px_-18px_rgba(26,86,217,0.35)]"
                key={product._id}
              >
                <div className="relative h-[200px] overflow-hidden bg-gray-50">
                  <Image
                    src={product.images?.[0] || "/yarn.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL={blurDataURL()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {product.category && (
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur-sm">
                      {product.category}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-[18px] font-semibold leading-snug text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mb-6 line-clamp-2 flex-1 text-[13px] leading-relaxed text-gray-500">
                    {product.shortDescription}
                  </p>

                  <div className="mb-4 border-t border-dashed border-gray-200" />

                  <Link
                    href={`/products/${product._id}`}
                    className="flex items-center justify-between text-[14px] font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-md"
                  >
                    View Details
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
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
