import { Trophy, TrendingUp } from "lucide-react";
import { achievements, certifications, yearlyGrowth } from "../data";

// the 2025 entry is flat at the 2024 figure, so it adds nothing to the strip
const growthYears = yearlyGrowth.slice(0, 3);

export default function AboutCertifications() {
  return (
    <section
      id="achievements"
      className="py-20 bg-gradient-to-b from-white via-[#FAF9F6] to-white relative overflow-hidden scroll-mt-24"
    >
      {/* subtle decorative background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B8863B]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <p className="text-primary text-[12px] font-bold uppercase tracking-[3px] mb-10">
          Achievements &amp; Milestones
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── Achievements ─────────────────────────────────────────── */}
          <div>
            <h3 className="text-[28px] md:text-[34px] font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              Recognized for Our Excellence
            </h3>
            <p className="text-gray-500 text-[14px] mb-8 leading-relaxed max-w-md">
              Two decades of certified quality, steady growth and long-term
              partnerships with the country&apos;s leading garment factories.
            </p>

            <ul className="space-y-3">
              {achievements.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-4 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/[0.07]">
                      <Trophy className="w-5 h-5 text-primary" />
                    </span>
                    <span>
                      <span className="block text-[14px] font-bold text-gray-900 leading-tight">
                        {item.title}
                      </span>
                      <span className="block text-[12px] text-gray-500 mt-0.5">
                        {item.meta}
                      </span>
                    </span>
                  </div>

                  {item.showGrowth && (
                    <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-x-2 gap-y-2">
                      <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                      {growthYears.map((g, i) => (
                        <span key={g.year} className="flex items-center gap-2">
                          {i > 0 && (
                            <span className="text-gray-300 text-[12px]">→</span>
                          )}
                          <span className="text-[12px] text-gray-500">
                            <span className="font-bold text-gray-900">
                              ${g.value.toFixed(1)}M
                            </span>{" "}
                            {g.year}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Certifications ───────────────────────────────────────── */}
          <div>
            <h3 className="text-[28px] md:text-[34px] font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              Certified Quality You Can Trust
            </h3>
            <p className="text-gray-500 text-[14px] mb-10 leading-relaxed max-w-md">
              We comply with international standards to ensure premium quality
              and customer satisfaction.
            </p>

            <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
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
