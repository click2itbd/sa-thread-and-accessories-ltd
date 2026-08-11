import Image from "next/image";
import AboutNav from "./AboutNav";

export default function AboutHero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-[420px] lg:min-h-[460px] scroll-mt-24"
    >
      {/* Background image — full bleed across the whole section */}
      <div className="absolute inset-0">
        <Image
          src="/elastic-section.jpg"
          alt="S A Thread & Accessories Ltd. building"
          fill
          priority
          className="object-cover object-right"
        />
        {/* Soft white-to-transparent veil so the photo shows through more on the right, like the reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/5" />
        {/* Faint blue haze across the whole photo to match the reference's glassy tone */}
        <div className="absolute inset-0 bg-blue-50/20 mix-blend-overlay" />
      </div>

      {/* Floating pill navbar */}
      <AboutNav />

      {/* Text content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 pt-14 md:pt-16 pb-16 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary text-[12px] font-bold uppercase tracking-[3px]">
            About SA Thread
          </span>
          <div className="w-10 h-px bg-gray-400" />
        </div>

        <h1 className="text-[32px] md:text-[36px] font-bold text-gray-900 leading-[1.15] mb-6">
          A 23-year foundation in
          <br />
          garments accessories.
        </h1>

        <p className="text-[14px] text-gray-700 leading-relaxed mb-4 max-w-[480px]">
          Founded in 2003, S.A. Thread &amp; Accessories Ltd. has grown from a
          local Uttara supplier into a trusted accessories manufacturer serving
          20+ garment factories across Bangladesh.
        </p>

        <p className="text-[14px] text-gray-700 leading-relaxed max-w-[480px]">
          S.A. Thread &amp; Accessories Ltd. began operations in 2003 in Uttara,
          Azampur Dewanbari, supplying sewing thread and narrow-fabric
          accessories to nearby garment factories. What set the company apart
          from the start was a simple discipline: deliver exactly what was
          specified, every single time.
        </p>
      </div>
    </section>
  );
}
