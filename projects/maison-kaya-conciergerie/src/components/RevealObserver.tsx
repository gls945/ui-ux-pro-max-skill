"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fait apparaître en douceur les éléments [data-reveal] lorsqu'ils entrent à l'écran. */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));

    // Parallaxe de défilement légère
    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        par.forEach((el) => {
          const r = el.getBoundingClientRect();
          const speed = Number(el.dataset.parallax) || 0.1;
          const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
          el.style.setProperty("--parallax", `${offset.toFixed(1)}px`);
        });
      });
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && par.length) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);
  return null;
}
