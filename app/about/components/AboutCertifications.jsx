import { certifications } from "../data";

export default function AboutCertifications() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#FAF9F6] to-white relative overflow-hidden">
      {/* subtle decorative background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B8863B]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="flex justify-center">
          <div className="max-w-2xl text-center">
            <p className="text-primary text-[12px] font-bold uppercase tracking-[3px] mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-[1.5px] bg-primary/60" />
              Trust &amp; Compliance
              <span className="w-6 h-[1.5px] bg-primary/60" />
            </p>
            <h3 className="text-[28px] md:text-[34px] font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              Certified Quality You Can Trust
            </h3>
            <p className="text-gray-500 text-[14px] mb-14 leading-relaxed max-w-md mx-auto">
              We comply with international standards to ensure premium quality and customer satisfaction.
            </p>

            <div className="flex flex-wrap items-start justify-center gap-x-16 gap-y-12 sm:gap-x-24">
              {certifications.map((cert, i) => (
                <div key={i} className="group flex flex-col items-center w-[160px]">
                  <div className="relative w-[152px] h-[152px] mb-5">
                    {/* rotating dashed ring */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#B8863B]/40 transition-transform duration-700 ease-out group-hover:rotate-45" />

                    {/* soft glow on hover */}
                    <div className="absolute inset-[6px] rounded-full bg-[#B8863B]/0 group-hover:bg-[#B8863B]/[0.06] blur-md transition-all duration-500" />

                    {/* logo circle */}
                    <div className="absolute inset-[10px] rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_24px_-4px_rgba(184,134,59,0.25)] group-hover:border-[#B8863B]/50 group-hover:-translate-y-1">
                      <img
                        src={cert.image || "/certifications/placeholder.png"}
                        alt={cert.abbr}
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        style={{
                          width: `${(cert.scale ?? 1) * 70}%`,
                          height: `${(cert.scale ?? 1) * 70}%`,
                        }}
                      />
                    </div>
                  </div>

                  <span className="text-[14px] font-bold text-gray-900 leading-tight text-center tracking-wide">
                    {cert.abbr}
                  </span>
                  {cert.sub && (
                    <span className="text-[12px] text-gray-500 font-medium whitespace-pre-line leading-tight text-center mt-1">
                      {cert.sub}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}