import Image from "next/image";

const FOUNDED_YEAR = 2003;

export default function AboutHero() {
  const yearsExperience = new Date().getFullYear() - FOUNDED_YEAR;
  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-[420px] lg:min-h-[460px] scroll-mt-24"
    >
      <div className="absolute inset-0">
        <Image
          src="/elastic-section.jpg"
          alt="S A Thread & Accessories Ltd. building"
          fill
          sizes="100vw"
          priority
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/65 to-white/5" />
        <div className="absolute inset-0 bg-blue-50/20 mix-blend-overlay" />
      </div>

      <div
        className="relative z-10 px-6 pb-16 max-w-3xl"
        style={{ paddingTop: "calc(var(--about-nav-offset, 60px) + 1.5rem)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary text-[12px] font-bold uppercase tracking-[3px]">
            About SA Thread
          </span>
          <div className="w-10 h-px bg-gray-400" />
        </div>

        <h1 className="text-[32px] md:text-[36px] font-bold text-gray-900 leading-[1.15] mb-6">
          A {yearsExperience}-year foundation in
          <br />
          garments accessories.
        </h1>

        <p className="text-[14px] text-gray-700 leading-relaxed mb-4 max-w-[480px]">
          Founded in 2003, SA Thread &amp; Accessories Ltd. has grown from a
          local Uttara supplier into a trusted accessories manufacturer serving
          20+ garment factories across Bangladesh.
        </p>

        <p className="text-[14px] text-gray-700 leading-relaxed max-w-[480px]">
          SA Thread &amp; Accessories Ltd. began operations in 2003 in Uttara,
          Azampur Dewanbari, supplying sewing thread and narrow-fabric
          accessories to nearby garment factories. What set the company apart
          from the start was a simple discipline: deliver exactly what was
          specified, every single time.
        </p>
      </div>
    </section>
  );
}
