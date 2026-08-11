"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Client", href: "#who-we-are" },
  { label: "Board of Director", href: "#directors" },
  { label: "Message", href: "#message" },
  { label: "Achievement", href: "#achievements" },
  { label: "Team", href: "#team" },
];

export default function AboutNav() {
  const [activeHref, setActiveHref] = useState("#about");

  // Highlight whichever section is currently in view as the user scrolls
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
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHref(href);
    }
  };

  return (
    <nav className="relative z-10 flex justify-center pt-6">
      <ul className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md shadow-sm px-2 py-2">
        {NAV_LINKS.map((link) => {
          const active = activeHref === link.href;
          return (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`block rounded-full px-5 py-2 text-[13px] font-medium border transition-colors ${
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
    </nav>
  );
}