"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/Button";
import { ChevronRight, Award, Settings, Leaf, Globe } from "lucide-react";
import { PRODUCTS_PAGE_CONTENT } from "@/data/siteContent";
import { blurDataURL } from "@/lib/imageUtils";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        const activeProducts = data.products || [];
        setProducts(activeProducts);
        const uniqueCategories = [
          "All",
          ...new Set(activeProducts.map((p) => p.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0 && activeCategory === "All") {
          setActiveCategory(uniqueCategories[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

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
                className="shadow-2xl rounded-xl overflow-hidden bg-white flex flex-col group hover:shadow-md transition-shadow"
                key={product._id}
              >
                <div className="h-[200px] relative bg-gray-50 overflow-hidden">
                  <Image
                    src={product.images?.[0] || "/yarn.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={blurDataURL()}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[20px] font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[13px] text-gray-500 mb-5 flex-1">
                    {product.shortDescription}
                  </p>
                  <Link
                    href={`/products/${product._id}`}
                    className="text-primary font-semibold text-[14px] flex items-center gap-1.5 hover:underline"
                  >
                    View Details
                    <ChevronRight className="w-3 h-3" strokeWidth={2} />
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
