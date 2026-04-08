"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <a
          href="#"
          className={`font-[family-name:var(--font-serif)] text-xl tracking-widest transition-colors duration-500 ${
            scrolled ? "text-fg" : "text-white"
          }`}
        >
          Ren Takahashi
        </a>
        <div className="flex gap-8">
          {["Works", "Essay", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-500 hover:text-accent ${
                scrolled ? "text-fg-muted" : "text-white/70"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
