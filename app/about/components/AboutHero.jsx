import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[320px]">
      {/* Left: text */}
      <div className="flex-1 px-6 md:px-12 lg:px-16 xl:px-24 py-14 md:py-20 flex flex-col justify-center max-w-3xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-primary text-[12px] font-bold uppercase tracking-[3px]">ABOUT SA THREAD</span>
          <div className="w-10 h-px bg-gray-400" />
        </div>
        <h1 className="text-[34px] md:text-[46px] font-bold text-gray-900 leading-[1.1] mb-6">
          A 23–year foundation in<br />garments accessories.
        </h1>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-4 max-w-[420px]">
          SA Thread & Accessories Ltd. is a renowned supplier of high-quality garments accessories in Bangladesh, serving leading garment manufacturers with internationally certified products since 2003.
        </p>
        <p className="text-[13px] text-gray-600 leading-relaxed max-w-[420px]">
          What set the company apart from the start was a simple discipline: deliver exactly what was specified, every single time.
        </p>
      </div>
      {/* Right: building image — full bleed */}
      <div className="flex-1 relative min-h-[300px] lg:min-h-0 overflow-hidden">
        <Image
          src="/elastic-section.jpg"
          alt="SA Thread & Accessories LTD. building"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          priority
        />
      </div>
    </section>
  );
}
