import Image from "next/image";
import { stats } from "../data";

export default function AboutWhoWeAre() {
  return (
    <section id="who-we-are" className="relative overflow-hidden scroll-mt-24">
      {/* Background photo — spans the FULL section, including behind the text */}
      <div className="absolute inset-0">
        <Image
          src="/sewing-section2.jpg"
          alt="SA Thread Factory Interior"
          fill
          sizes="100vw"
          className="object-cover object-center lg:object-left"
        />
        {/* Blue-tinted wash across the whole photo, growing stronger/whiter toward the text side */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 via-white/55 to-white/95 lg:hidden" />
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0.22) 45%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.94) 100%)",
          }}
        />
      </div>

      {/* Text + stats sit on top of the image, right-aligned on desktop */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row">
        <div className="hidden lg:block flex-1" />
        <div className="flex-1 px-6 sm:px-8 md:px-12 py-12 sm:py-16 flex flex-col justify-center">
          <p className="text-primary text-[11px] sm:text-[12px] font-bold uppercase tracking-[3px] mb-3 text-center lg:text-left">
            WHO WE ARE
          </p>
          <h2 className="text-[24px] sm:text-[28px] md:text-[34px] font-bold text-gray-900 leading-tight mb-4 sm:mb-5 text-center lg:text-left">
            A Commitment to Quality
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Since Day One
          </h2>
          <p className="text-[13px] text-gray-700 leading-relaxed mb-7 sm:mb-8 max-w-[440px] text-center lg:text-left mx-auto lg:mx-0">
            In 2017 the company relocated to its current 24,514 sqft facility on
            Gacha Road, Gazipur — a building permitted for eight floors, with
            room to grow well beyond {"today's"} two operating floors. That
            headroom is deliberate. As demand grows, so does the floor.
          </p>

          {/* Stats row: 2 per row on mobile, 4 on larger screens */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-3 sm:p-4 border border-gray-100 rounded-xl bg-white/80 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-2 sm:mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {stat.icon}
                  </svg>
                </div>
                <div className="text-[20px] sm:text-[24px] font-bold text-primary leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-[11px] text-gray-500 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}