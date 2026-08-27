import { Layers, Zap, TrendingUp, FileText, Award, Download, Sparkles } from "lucide-react";

export default function AboutFuturePlan() {
  const planItems = [
    {
      icon: Layers,
      title: "In-House Dyeing Facility Setup",
      description:
        "SA Thread & Accessories Ltd. is currently working on a significant expansion project to establish a dedicated in-house dyeing section within our existing Gazipur factory premises to fulfil increasing market demand for dyed yarn and reduce external dependency.",
    },
    {
      icon: Zap,
      title: "Enhanced Quality Control & Rapid Turnaround",
      description:
        "Transitioning from third-party dyeing eliminates processing bottlenecks, long lead times, and shade variations. Operating our own facility gives complete control over yarn preparation, precision shade consistency, and strict quality inspection.",
    },
    {
      icon: TrendingUp,
      title: "Integrated Manufacturing & Sustainable Growth",
      description:
        "This strategic investment builds a cost-competitive, integrated manufacturing ecosystem. It strengthens our capability to deliver premium accessories quickly while establishing a strong foundation for future business expansion.",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-white scroll-mt-24">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Section Header (Left Aligned) */}
        <p className="text-primary text-[11px] sm:text-[12px] font-bold uppercase tracking-[3px] mb-4 text-left">
          Future Plan
        </p>
        <h3 className="text-[24px] sm:text-[28px] md:text-[34px] font-bold text-gray-900 mb-3 sm:mb-4 leading-tight tracking-tight text-left">
          Expanding Our Capabilities
        </h3>
        <p className="text-gray-500 text-[13px] sm:text-[14px] mb-8 sm:mb-10 leading-relaxed max-w-2xl text-left">
          Our strategic roadmap for in-house dyeing facility setup, quality excellence, and long-term manufacturing expansion.
        </p>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Future Plan Rows */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {planItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[15px] sm:text-[17px] font-bold text-gray-900 mb-1.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-[12px] sm:text-[13px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: About Us More / Documents & Downloads */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-[#FAF9F6] to-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-primary text-[11px] sm:text-[12px] font-bold uppercase tracking-[2px] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Documentation</span>
              </div>
              <h4 className="text-[20px] sm:text-[22px] font-bold text-gray-900 mb-2 leading-tight">
                About Us More
              </h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
                Download our official corporate profile and international compliance certifications for your verification and records.
              </p>

              <div className="flex flex-col gap-3.5">
                {/* Button 1: Company Profile */}
                <a
                  href="/Certificates/Company Profile SA THREAD & ACCESSORIES LTD..pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-primary hover:bg-primary/[0.02] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-[14px] font-bold text-gray-900 group-hover:text-primary transition-colors">
                        Company Profile
                      </div>
                      <div className="text-[11px] text-gray-500">
                        SA Thread &amp; Accessories Ltd. (PDF)
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                </a>

                {/* Button 2: OEKO-TEX Certificate */}
                <a
                  href="/Certificates/Oekotex certificate-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-primary hover:bg-primary/[0.02] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-[14px] font-bold text-gray-900 group-hover:text-primary transition-colors">
                        OEKO-TEX Certificate
                      </div>
                      <div className="text-[11px] text-gray-500">
                        STANDARD 100 — 2025 (PDF)
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
