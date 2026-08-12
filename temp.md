"use client";

import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Board of Director", href: "#board-of-directors" },
  { label: "Message", href: "#message" },
  { label: "Achievement", href: "#achievement" },
  { label: "Team", href: "#team" },
];

export default function AboutNav() {
  const [activeHref, setActiveHref] = useState("#about");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveHref(href);
    setMenuOpen(false);
  };

  return (
    <nav ref={navRef} className="sticky top-[80px] z-40">
      {/* Desktop pill-style menu — wrapper handles centering, ul shrinks to its content */}
      <div className="hidden sm:flex justify-center py-4">
        <ul className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md shadow-md px-4 py-2">
          {NAV_LINKS.map((link) => {
            const active = activeHref === link.href;
            return (
              <li key={link.label}>
                
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`block rounded-full px-5 py-2 text-sm font-medium border transition-colors ${
                    active
                      ? "border-primary text-primary bg-white"
                      : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary bg-white/60"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile hamburger */}
      <div className="sm:hidden bg-white border-b flex justify-between items-center px-4 py-2">
        <span className="font-semibold text-gray-700">About Menu</span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md border bg-white"
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col bg-white border-t">
          {NAV_LINKS.map((link) => {
            const active = activeHref === link.href;
            return (
              <li key={link.label}>
                
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`block px-4 py-3 text-sm font-medium ${
                    active
                      ? "text-primary bg-gray-50 border-l-4 border-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}