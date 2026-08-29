"use client";

import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Board of Director", href: "#board-of-directors" },
  { label: "Message", href: "#message" },
  { label: "Team", href: "#team" },
  { label: "Clients", href: "#clients" },
  { label: "Partner Bank", href: "#partner-bank" },
  { label: "Achievement", href: "#achievement" },
  { label: "Future Plan", href: "#future-plan" },
];

export default function AboutNav() {
  const [activeHref, setActiveHref] = useState("#about");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Intersection Observer for active link highlight
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
    <nav
      ref={navRef}
      className="sticky top-[75px] z-40 -mb-20"
    >
      {/* Desktop pill-style menu */}
      <div className="hidden sm:flex justify-center py-4">
        <ul className="inline-flex items-center gap-2 rounded-full shadow-md px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-100">
          {NAV_LINKS.map((link) => {
            const active = activeHref === link.href;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`block rounded-full px-4 lg:px-5 py-2 text-xs lg:text-sm font-medium border transition-colors ${
                    active
                      ? "border-primary text-primary bg-white shadow-xs font-semibold"
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
      <div className="sm:hidden flex justify-end items-center px-4 py-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md border bg-white shadow-sm"
          aria-label="Toggle About Sub Navigation"
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col bg-white border-y shadow-lg">
          {NAV_LINKS.map((link) => {
            const active = activeHref === link.href;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`block px-4 py-3 text-sm font-medium ${
                    active
                      ? "text-primary bg-gray-50 border-l-4 border-primary font-semibold"
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
