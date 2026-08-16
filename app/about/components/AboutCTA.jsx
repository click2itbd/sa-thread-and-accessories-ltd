import Link from "next/link";
import { ArrowRight } from "lucide-react";

function SpoolIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M6 9h12M6 15h12M9 6V3M15 6V3M9 21v-3M15 21v-3" />
    </svg>
  );
}

export default function AboutCTA() {
  return (
    <section className="bg-white pb-2">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a56d9] via-[#2563eb] to-[#3b82f6] px-6 py-10 md:px-10 md:py-12">
          {/* Decorative wavy lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]"
            viewBox="0 0 800 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 100 Q200 40 400 100 T800 100" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="6 8" />
            <path d="M0 130 Q200 70 400 130 T800 130" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="6 8" />
            <path d="M0 70 Q200 10 400 70 T800 70" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="6 8" />
          </svg>

          {/* Watermark spool */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-[0.08]" aria-hidden="true">
            <SpoolIcon className="w-48 h-48 md:w-64 md:h-64 text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
              <div className="w-16 h-16 rounded-full bg-[#0f3a9e]/60 border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
                <SpoolIcon className="w-8 h-8 text-white/90" />
              </div>
              <div className="text-white">
                <h3 className="text-[22px] md:text-[26px] font-bold mb-1.5 tracking-wide">{"Let's Work Together"}</h3>
                <p className="text-white/85 text-[13px] md:text-[14px] max-w-md">
                  Have a project in mind or want to join our team? {"We'd"} love to hear from you.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-primary font-bold text-[13px] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-transparent border border-white/50 text-white font-bold text-[13px] rounded-lg hover:bg-white/10 transition-colors"
              >
                View Open Positions
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
