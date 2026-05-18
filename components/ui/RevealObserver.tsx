"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");

            // Counter animation
            const counters = entry.target.querySelectorAll<HTMLElement>("[data-count]");
            counters.forEach((el) => {
              const target = parseInt(el.dataset.count || "0");
              animateCounter(el, target);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Smooth scroll
    const onClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const id = target.getAttribute("href");
      if (id && id.length > 1) {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", onClick));

    return () => {
      observer.disconnect();
      anchors.forEach((a) => a.removeEventListener("click", onClick));
    };
  }, []);

  return null;
}

function animateCounter(el: HTMLElement, target: number, duration = 2000) {
  const start = performance.now();
  const startVal = parseInt(el.textContent || "0") || 0;
  function tick(now: number) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(startVal + (target - startVal) * eased);
    el.textContent = String(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
