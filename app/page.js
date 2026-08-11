"use client";

import { HOME_HERO_SLIDES, HOME_CTA } from "@/data/siteContent";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Button from "./components/Button";


const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HOME_HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + HOME_HERO_SLIDES.length) % HOME_HERO_SLIDES.length,
    );
  }, []);

  // Auto slide effect
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide, currentSlide]);

  const chevronRight = <ChevronRight strokeWidth={2}/>;

  return (
    <main>
      {/* Hero Slider */}
      <div className="container mx-auto px-6 w-full">
         <section className="relative overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>

          {/* Fixed-height stable outer shell — never changes size between slides */}

          <div className="relative w-full" style={{ minHeight: "600px"}}>
             {HOME_HERO_SLIDES.map((slide, idx) =>{
              const  isActive = idx === currentSlide;
              const isPrev = idx < currentSlide;

              return(
                <div key={slide.id} aria-hidden={!isActive} className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:map-12 py-10 md:py-16 transition-all duration-700 ease-out ${
                  isActive
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : isPrev
                      ? "opacity-0 -translate-x-16 pointer-events-none"
                      : "opacity-0  translate-x-16 pointer-events-none"
                }`}>

                  {/* Left: Text (fixed width, never reflowing)  */}
                  <div className="w-full md:w-[52%] shrink-0 text-center md:text-left">
                    <h1 className="text-4xl md:text-[46px] xl:text-[52px] font-extrabold leading-[1.1] mb-5 text-black tracking-tight">
                      {slide.title1}
                      <br/>
                      <span className="text-primary">{slide.title2}</span>
                    </h1>
                    <p className="text-lg  md:text-xl text-black/70 leading-relaxed mb-10 max-w-[500px] mx-auto md:mx-0">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Button>{HOME_CTA.products}</Button>
                      <Button>{HOME_CTA.contact}</Button>
                    </div>
                  </div>

                  {/* Right: Image (fixed height, object-cover, no shift) */}
                  <div className="w-full md:flex-1 shrink-0">
                    <div className="img-protected relative w-full overflow-hidden rounded-2xl" style={{ height: "500px"}} onContextMenu={(e) => e.preventDefault()}>
                      <div className="img-overlay"/>
                      <Image src={slide.image} alt={slide.title1} fill priority={idx === 0} sizes="(max-width: 768px) 100vw, 48vw" className="object-cover object-center"/>
                    </div>
                  </div>

                </div>
              );
             })}
          </div>

                    {/* ── Slide Controls ── */}
          <div className="flex items-center justify-between  pb-10">
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

            {/* Mobile prev/next */}
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
    </main>
    
  );
}
