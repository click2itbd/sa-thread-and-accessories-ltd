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
      "Certified to Oeko-Tex Standard 100, we guarantee that every thread is free from harmful substances, ensuring safety for workers and end-users globally.",
    image: "/csr/product-safety.jpg",
    icon: ShieldCheck,
    link: "#certifications",
    linkText: "Learn about our certifications",
  },
  {
    title: "Charity & Welfare",
    description:
      "We invest in local healthcare, education, and skill-building initiatives. Our 'SA Care' program supports the families of our 2000+ employees and local community.",
    image: "/csr/charity-welfare.jpg",
    icon: Users,
    link: "#community",
    linkText: "Our impact stories",
  },
  {
    title: "Green Factory",
    description:
      "Our rooftop garden isn't just aesthetic; it reduces building temperatures and sequesters carbon. We also implement water recycling and solar energy harvesting.",
    image: "/csr/green-factory.jpg",
    icon: Leaf,
    link: "#sustainability",
    linkText: "Sustainability report",
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
    const res = await fetch(`${baseUrl}/api/blogs`, { next: { revalidate: 60 } });
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
      <section className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[2px] px-4 py-2 rounded-full mb-6">
                Sustainability &amp; Responsibility
              </span>
              <h1 className="text-[34px] md:text-[48px] font-bold text-gray-900 leading-[1.15] mb-6">
                Woven with
                <br />
                Purpose.
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
                  src="/sewing-section.jpg"
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
      <section className="py-16 md:py-20 bg-gray-50/60">
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
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="h-1.5 bg-primary" />
                  <div className="relative h-44 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[18px] font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-[13.5px] leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-primary text-[13px] font-semibold hover:gap-2.5 transition-all"
                    >
                      {item.linkText} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. STATS BAR ─────────────────────────────────────── */}
      <section className="bg-gray-900 py-14">
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
      </section>

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
      <section className="bg-primary py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-center md:text-left">
            <h3 className="text-[24px] md:text-[28px] font-bold mb-2">
              Partner for a Greener Tomorrow
            </h3>
            <p className="text-white/80 text-[14px] max-w-lg">
              Join hands with an industry leader that prioritizes people and the
              planet just as much as quality products.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/contact">
              <button className="px-8 py-3.5 bg-white text-primary font-bold text-[14px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                Inquire about CSR Partnerships
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
