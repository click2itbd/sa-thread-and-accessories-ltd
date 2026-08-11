import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="bg-primary bg-gradient-to-r from-blue-700 to-blue-600 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 bottom-0 w-[40%] bg-blue-500/20 rounded-l-full -mr-32 blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 -ml-32 pointer-events-none" />

      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-blue-800/40 border border-blue-400/30 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="6" y="6" width="12" height="12" rx="2" />
              <path d="M6 9h12M6 15h12M9 6V3M15 6V3M9 21v-3M15 21v-3" />
            </svg>
          </div>
          <div className="text-white">
            <h3 className="text-[24px] md:text-[28px] font-bold mb-1 tracking-wide">{"Let's Work Together"}</h3>
            <p className="text-white/80 text-[13px]">Have a project in mind or want to join our team? {"We'd"} love to hear from you.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <Link href="/contact">
            <button className="px-8 py-3 bg-white text-primary font-bold text-[13px] rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
              Contact Us <span className="font-normal text-[16px] leading-none">-&gt;</span>
            </button>
          </Link>
          <Link href="/careers">
            <button className="px-8 py-3 bg-transparent border border-white/40 text-white font-bold text-[13px] rounded-md hover:bg-white/10 transition-colors flex items-center gap-2">
              View Open Positions <span className="font-normal text-[16px] leading-none">-&gt;</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
