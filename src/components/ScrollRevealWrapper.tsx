"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function ScrollRevealWrapper({
  children,
  className = "",
  delay = 0,
  fade = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${fade ? "reveal-fade" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}
