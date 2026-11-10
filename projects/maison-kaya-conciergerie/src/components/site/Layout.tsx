import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Instagram } from "lucide-react";
import { whatsappLink, PHONE_DISPLAY, INSTAGRAM_URL, CALENDLY_URL } from "@/lib/site";
import { Split } from "@/components/site/Split";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/accompagnement", label: "Accompagnement" },
  { to: "/approche", label: "Notre approche" },
  { to: "/secteur", label: "Secteur" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-bar">
        <Link to="/" className="header-logo" onClick={() => setOpen(false)}>
          Maison <em>Kaya</em>
        </Link>
        <nav aria-label="Navigation principale">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeProps={{ "aria-current": "page" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="pill header-cta">Prendre rendez-vous</a>
          <button type="button" className="menu-toggle lg:hidden" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div id="site-menu" className="site-menu lg:hidden">
          <div className="flex flex-col gap-4 font-display text-2xl">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>
            ))}
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="text-primary">Prendre rendez-vous</a>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="grain overflow-hidden bg-ink text-ink-foreground" data-dark>
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-24">
        <Split as="p" className="display-lg max-w-4xl">
          Votre logement mérite <em className="text-sand">qu'on en prenne soin.</em>
        </Split>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/estimation" className="pill pill-primary">Estimer mes revenus</Link>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="pill pill-ghost-light">Prendre rendez-vous</a>
        </div>
        <div className="mt-24 grid gap-10 border-t border-ink-foreground/15 pt-10 text-sm text-ink-foreground/70 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-ink-foreground">Maison Kaya</p>
            <p className="mt-2">Conciergerie pour propriétaires · Val-de-Marne (94)</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">WhatsApp · {PHONE_DISPLAY}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">Instagram · @kaya.conciergerie</a>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Link to="/mentions-legales" className="hover:text-ink-foreground">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-ink-foreground">Confidentialité & cookies</Link>
          </div>
        </div>
        <p aria-hidden="true" className="plx mt-16 select-none font-display text-[22vw] leading-none text-ink-foreground/5" data-speed="0.6">Kaya</p>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Écrire sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-olive px-4 py-3 text-ink-foreground shadow-2xl transition-colors hover:bg-primary"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm sm:inline">WhatsApp</span>
    </a>
  );
}

export function PageHero({ eyebrow, title, intro, image, imageAlt = "Intérieur préparé par Maison Kaya" }: { eyebrow: string; title: React.ReactNode; intro?: string; image?: string; imageAlt?: string }) {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <Split as="h1" className="display-xl mt-6 max-w-5xl">{title}</Split>
        {intro && <p className="mt-8 max-w-xl text-lg text-muted-foreground">{intro}</p>}
      </div>
      {image && (
        <div className="mx-auto mt-16 max-w-7xl px-6">
          <div className="page-hero-media" data-expand data-no-reveal>
            <img src={image} alt={imageAlt} width={1600} height={900} className="plx" data-speed="0.18" style={{ scale: "1.14" }} />
          </div>
        </div>
      )}
    </section>
  );
}

export { Instagram };
