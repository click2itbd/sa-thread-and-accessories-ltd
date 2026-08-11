import Image from "next/image";
import { directors } from "../data";

export default function AboutDirectors() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Title Column */}
          <div className="lg:w-48 shrink-0">
            <p className="text-primary text-[12px] font-bold uppercase tracking-[2px] mt-2">Board of Directors</p>
          </div>
          {/* Cards Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            {directors.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full h-[300px] md:h-[260px] lg:h-[320px] bg-gray-100">
                  <Image src={d.image} alt={d.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-[16px] mb-1">{d.name}</h3>
                  <p className="text-[14px] text-gray-500">{d.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
