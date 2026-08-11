"use client";

import { NAV_LINKS, SITE_CONFIG } from "@/data/siteContent";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = NAV_LINKS;

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 w-full">
        <nav className="flex items-center justify-between h-16 md:h-[72px]">
          {/* ── Logo ────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {/* Logo Image */}
            <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-lg overflow-hidden shrink-0">
              <Image
                src="/logo.jpg"
                alt="SA Thread & Accessories Ltd. Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Company Text */}
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-extrabold text-primary tracking-tight leading-tight">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[8px] md:text-[9px] font-semibold text-gray-400 tracking-widest uppercase">
                {SITE_CONFIG.nameSuffix}
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ───────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`relative px-3 py-2 text-[12px] font-semibold tracking-wider transition-colors duration-200 rounded-md ${
                    pathname === link.path
                      ? "text-primary "
                      : "text-gray-500 hover:text-primary "
                  }`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 text-[12px] font-semibold text-gray-600 hover:text-primary transition-colors border-2 border-primary p-2 rounded-lg"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              {SITE_CONFIG.phone}
            </a>
          </div>

          {/* ── Hamburger ───────────────────────────────────────────── */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "rotate-45 translate-y-[0px] w-5" : "w-5"
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-200 ${
                  isMobileMenuOpen ? "opacity-0 w-0" : "opacity-100 w-4"
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "-rotate-45 w-5" : "w-5"
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100 ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white px-4 py-3">
          {/* Nav Links */}
          <ul className="flex flex-col gap-1 mb-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[13px] font-bold tracking-wide transition-all duration-200 ${
                    pathname === link.path
                      ? "text-primary bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {pathname === link.path && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              {SITE_CONFIG.phone}
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors"
            >
              Get a Quote →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
