"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_HERO_SLIDES, HOME_CTA } from "@/data/siteContent";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_SLIDE_INTERVAL = 4000;

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    <div className="container mx-auto px-6 w-full">
      <section
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full grid">
          {HOME_HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            const isPrev = idx < currentSlide;

            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`[grid-area:1/1] flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 pt-6 md:pt-10 pb-10 md:pb-16 transition-all duration-700 ease-out ${
                  isActive
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : isPrev
                      ? "opacity-0 -translate-x-16 pointer-events-none"
                      : "opacity-0 translate-x-16 pointer-events-none"
                }`}
              >
                <div className="w-full md:w-[52%] shrink-0 text-center md:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-[46px] xl:text-[52px] font-extrabold leading-[1.15] mb-4 md:mb-5 text-black tracking-tight">
                    {slide.title1}
                    <br />
                    <span className="text-primary">{slide.title2}</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-black/70 leading-relaxed mb-6 md:mb-10 max-w-[500px] mx-auto md:mx-0">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-colors"
                    >
                      {HOME_CTA.products}
                      <ChevronRight className="w-4 h-4 ml-2" strokeWidth={3} />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/30 transition-colors"
                    >
                      {HOME_CTA.contact}
                      <ChevronRight className="w-4 h-4 ml-2 text-primary" strokeWidth={3} />
                    </Link>
                  </div>
                </div>

                <div className="w-full md:flex-1 shrink-0">
                  <div
                    className="img-protected relative w-full overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:h-[420px] lg:h-[500px]"
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
        <div className="flex items-center justify-between pb-4">
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
                  currentSlide === idx
                    ? "bg-primary w-6 h-2.5"
                    : "bg-transparent w-2.5 h-2.5"
                }`}
              />
            ))}
          </div>

          <div className="flex sm:hidden gap-3">
            <button
              className="p-2 text-primary"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              className="p-2 text-primary"
              onClick={nextSlide}
              aria-label="Next slide"
            >
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
  );
}
