import Image from "next/image";

const NAV_LINKS = [
  { label: "About", active: true },
  { label: "Board of Director", active: false },
  { label: "Achievement", active: false },
  { label: "Team", active: false },
  { label: "Client", active: false },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden min-h-[420px] lg:min-h-[460px]">
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
      <nav className="relative z-10 flex justify-center pt-6">
        <ul className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md shadow-sm px-2 py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href="#"
                className={`block rounded-full px-5 py-2 text-[13px] font-medium border transition-colors ${
                  link.active
                    ? "border-primary text-primary bg-white"
                    : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary bg-white/60"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

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
