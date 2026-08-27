import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  ShieldCheck,
  Users,
  TreePine,
  Droplets,
  Sun,
  ArrowRight,
  FileText,
  SpoolIcon,
} from "lucide-react";
import { csr } from "@/data/siteContent";

export const metadata = {
  title: "Corporate Social Responsibility",
  description:
    "Learn about SA Thread's commitment to environmental sustainability, worker welfare, community development, and ethical business practices.",
};

const pillars = [
  {
    title: "Product Safety",
    description:
      "We, as a company always ensure that our products are free of harmful substances. Our company is 100% Oeko Tex certified. We also manage our wastes carefully so that we don’t litter our surrounding and contribute to pollution.",
    icon: ShieldCheck,
  },
  {
    title: "Charity & Welfare",
    description:
      "We actively take part in charity activities throughout the year. The charity activities includes donations to religious institutions, funds for treatment, etc.",
    icon: Users,
  },
  {
    title: "Green Factory",
    description:
      "We always believe in green environment. We have a garden at our backyard and also at our rooftop. There are trees of various fruits and vegetables planted and are also taken care of with utmost priority. This eventually helps us to create an healthy environment for the company and also the surroundings.",
    icon: Leaf,
  },
];

const stats = [
  { value: "100%", label: "Eco-Certified" },
  { value: "40%", label: "Solar Powered" },
  { value: "10k+", label: "Trees Planted" },
  { value: "2.5M", label: "Liters Water Saved" },
];

async function getBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      return data.blogs || [];
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
  return [];
}

export default async function CSRPage() {
  const blogs = await getBlogs();

  return (
    <main className="overflow-x-hidden bg-white">
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="pt-10 md:pt-14 pb-8 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[2px] py-2 rounded-full mb-6">
                Sustainability &amp; Responsibility
              </span>
              <h1 className="text-[34px] md:text-[48px] font-bold text-gray-900 leading-[1.15] mb-6">
                Woven with Purpose.
              </h1>
              <p className="text-gray-500 text-[15px] leading-relaxed max-w-lg">
                At SA Thread &amp; Accessories, we believe in a circular future.
                Our commitments extend beyond the factory floor, embracing
                environmental stewardship and social empowerment.
              </p>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-4 border-primary/20 shadow-xl relative">
                <Image
                  src="/CSR.jpeg"
                  alt="Woven with purpose - sustainable thread manufacturing"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 right-6 md:right-12 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CORE PILLARS ─────────────────────────────────── */}
      <section className="py-8 md:py-10 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-[26px] md:text-[32px] font-bold text-gray-900 mb-4">
              Our Core Pillars
            </h2>
            <p className="text-gray-500 text-[14px]">
              We align our industrial operations with global standards to ensure
              a positive footprint on our environment and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col"
                >
                  <div className="h-1.5 bg-primary" />
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-900 mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-[13.5px] sm:text-[14px] leading-relaxed flex-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. STATS BAR ─────────────────────────────────────── */}
      {/* <section className="bg-gray-900 py-14">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-primary text-[30px] md:text-[38px] font-bold mb-1 font-mono">
                  {s.value}
                </div>
                <div className="text-gray-400 text-[11px] uppercase tracking-[1.5px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {blogs.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50/60">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <h2 className="text-[26px] md:text-[32px] font-bold text-gray-900 mb-4">
                Latest from CSR
              </h2>
              <p className="text-gray-500 text-[14px]">
                Stories, updates, and insights from our sustainability journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  {blog.image && (
                    <div className="relative h-48 w-full bg-gray-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[1px] px-3 py-1 rounded-full mb-3">
                      {blog.category}
                    </span>
                    <h3 className="text-[16px] font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-xs text-gray-400">
                        By {blog.author}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. CTA ────────────────────────────────────────────── */}
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
              <path
                d="M0 100 Q200 40 400 100 T800 100"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <path
                d="M0 130 Q200 70 400 130 T800 130"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <path
                d="M0 70 Q200 10 400 70 T800 70"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
            </svg>

            {/* Watermark decorative icon */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-[0.08]"
              aria-hidden="true"
            >
              <SpoolIcon className="w-48 h-48 md:w-64 md:h-64 text-white" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              {/* Text block */}
              <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
                <div className="w-16 h-16 rounded-full bg-[#0f3a9e]/60 border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
                  <SpoolIcon className="w-8 h-8 text-white/90" />
                </div>
                <div className="text-white">
                  <h3 className="text-[22px] md:text-[26px] font-bold mb-1.5 tracking-wide">
                    Partner for a Greener Tomorrow
                  </h3>
                  <p className="text-white/85 text-[13px] md:text-[14px] max-w-md">
                    Join hands with an industry leader that prioritizes people
                    and the planet just as much as quality products.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-primary font-bold text-[13px] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Inquire about CSR Partnerships
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
