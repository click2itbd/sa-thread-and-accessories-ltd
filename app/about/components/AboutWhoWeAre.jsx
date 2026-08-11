import Image from "next/image";
import { stats } from "../data";

export default function AboutWhoWeAre() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[420px]">
      {/* Left: factory photo — full bleed */}
      <div className="flex-1 relative min-h-[300px] lg:min-h-0 overflow-hidden">
        <Image
          src="/sewing-section2.jpg"
          alt="SA Thread Factory Interior"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      {/* Right: white panel with text + stats */}
      <div className="flex-1 bg-white px-8 md:px-12 py-12 flex flex-col justify-center">
        <p className="text-primary text-[12px] font-bold uppercase tracking-[3px] mb-3">WHO WE ARE</p>
        <h2 className="text-[28px] md:text-[34px] font-bold text-gray-900 leading-tight mb-5">
          A Commitment to Quality<br />Since Day One
        </h2>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-8 max-w-[440px]">
          In 2017 the company relocated to its current 24,514 sqft facility on Gacha Road, Gazipur — a building permitted for eight floors, with room to grow well beyond {"today's"} two operating floors. That headroom is deliberate. As demand grows, so does the floor.
        </p>
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 border border-gray-100 rounded-xl bg-gray-50 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {stat.icon}
                </svg>
              </div>
              <div className="text-[24px] font-bold text-primary leading-none mb-1">{stat.value}</div>
              <div className="text-[11px] text-gray-500 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
