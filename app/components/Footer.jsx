import Link from "next/link";
import { SITE_CONFIG } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-6">
        {/* Copyright */}
        <div className="flex flex-row items-center justify-between gap-4">
          <p className="text-[8px] md:text-[14px] text-gray-600 font-medium">
            © {new Date().getFullYear()} {SITE_CONFIG.copyright}.
          </p>

          <div className="flex flex-row gap-5">
            {/* Developer Credit */}
          <a
            href="https://www.facebook.com/CLICK2ITBD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] md:text-[14px] text-gray-500 hover:text-primary transition-colors"
          >
            Developed by <span className="font-semibold text-primary">Click2IT</span>
          </a>

          {/* Legal Links (hidden on mobile, visible on md+) */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            {SITE_CONFIG.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[8px] md:text-[14px] text-gray-500 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
