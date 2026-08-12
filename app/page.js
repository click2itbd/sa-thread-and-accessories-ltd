"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_HERO_SLIDES, HOME_CTA } from "@/data/siteContent";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const AUTO_SLIDE_INTERVAL = 4000;

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products?.slice(0, 4) || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HOME_HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HOME_HERO_SLIDES.length) % HOME_HERO_SLIDES.length,
    );
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  return (
    <main>
      {/* Hero Slider */}
      <div className="container mx-auto px-6 w-full">
        <section
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full" style={{ minHeight: "600px" }}>
            {HOME_HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              const isPrev = idx < currentSlide;

              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10 md:py-16 transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : isPrev
                        ? "opacity-0 -translate-x-16 pointer-events-none"
                        : "opacity-0 translate-x-16 pointer-events-none"
                  }`}
                >
                  <div className="w-full md:w-[52%] shrink-0 text-center md:text-left">
                    <h1 className="text-4xl md:text-[46px] xl:text-[52px] font-extrabold leading-[1.1] mb-5 text-black tracking-tight">
                      {slide.title1}
                      <br />
                      <span className="text-primary">{slide.title2}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-black/70 leading-relaxed mb-10 max-w-[500px] mx-auto md:mx-0">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 bg-[#1F4D2C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#163d24] transition-colors"
                      >
                        {HOME_CTA.products}
                        <ChevronRight className="w-4 h-4 ml-2" strokeWidth={3} />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 border border-[#1F4D2C] text-[#1F4D2C] px-6 py-3 rounded-lg font-semibold hover:bg-[#1F4D2C]/10 transition-colors"
                      >
                        {HOME_CTA.contact}
                        <ChevronRight className="w-4 h-4 ml-2 text-[#1F4D2C]" strokeWidth={3} />
                      </Link>
                    </div>
                  </div>

                  <div className="w-full md:flex-1 shrink-0">
                    <div
                      className="img-protected relative w-full overflow-hidden rounded-2xl"
                      style={{ height: "500px" }}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <div className="img-overlay" />
                      <Image
                        src={slide.image}
                        alt={slide.title1}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 768px) 100vw, 48vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slide Controls */}
          <div className="flex items-center justify-between pb-10">
            <button
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hidden sm:flex items-center justify-center hover:bg-gray-50 transition-colors"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-primary" strokeWidth={2} />
            </button>

            <div className="flex gap-3 mx-auto">
              {HOME_HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`rounded-full border-[1.5px] border-primary transition-all duration-300 ${
                    currentSlide === idx ? "bg-primary w-6 h-2.5" : "bg-transparent w-2.5 h-2.5"
                  }`}
                />
              ))}
            </div>

            <div className="flex sm:hidden gap-3">
              <button className="p-2 text-primary" onClick={prevSlide} aria-label="Previous slide">
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button className="p-2 text-primary" onClick={nextSlide} aria-label="Next slide">
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            <button
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hidden sm:flex items-center justify-center hover:bg-gray-50 transition-colors"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 text-primary" strokeWidth={2} />
            </button>
          </div>
        </section>
      </div>

      {/* Clients Section */}
      {clients.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Trusted by Leading Brands</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                We proudly supply to 20+ renowned garment factories and brands across Bangladesh.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {clients.map((client) => (
                <Link
                  key={client._id}
                  href="/about#clients"
                  className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md hover:border-[#1F4D2C]/30 transition-all"
                >
                  <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden bg-white border border-gray-200">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center group-hover:text-[#1F4D2C] transition-colors">
                    {client.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Preview Section */}
      {products.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Products</h2>
                <p className="text-gray-500 max-w-xl">
                  Explore our wide range of garments accessories manufactured with premium quality and OEKO-TEX certified standards.
                </p>
              </div>
              <Link
                href="/products"
                className="hidden md:inline-flex items-center gap-2 text-[#1F4D2C] font-semibold hover:underline"
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
                      src={product.images?.[0] || "/yarn.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-[#1F4D2C] transition-colors">
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
                className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-6 py-3 rounded-lg font-semibold"
              >
                View All Products
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
