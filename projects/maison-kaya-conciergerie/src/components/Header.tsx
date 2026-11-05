"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="header__inner container">
        <Link href="/" className="header__logo" aria-label="Maison Kaya Conciergerie — accueil">
          <Logo />
        </Link>
        <nav className="header__nav" aria-label="Navigation principale">
          <ul>
            {nav.slice(1, -1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="btn btn--dark header__cta">
          Nous contacter
        </Link>
        <button
          type="button"
          className="header__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <ul>
          {nav.map((item, i) => (
            <li key={item.href} style={{ ["--i" as string]: i }}>
              <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                <span className="mobile-menu__num">0{i + 1}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__foot">
          <a href="tel:+33763901469">07 63 90 14 69</a>
          <a href="mailto:maisonkayaconciergerie@gmail.com">maisonkayaconciergerie@gmail.com</a>
        </div>
      </div>
    </header>
  );
}
