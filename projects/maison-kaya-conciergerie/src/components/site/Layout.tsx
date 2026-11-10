import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle, Instagram } from "lucide-react";
import { whatsappLink, PHONE_DISPLAY, INSTAGRAM_URL, CALENDLY_URL } from "@/lib/site";
import { InteriorPhoto } from "@/components/site/InteriorPhoto";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/accompagnement", label: "Accompagnement" },
  { to: "/approche", label: "Notre approche" },
  { to: "/secteur", label: "Secteur" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="header-bar mx-4 mt-4 flex max-w-7xl items-center justify-between px-5 py-3 md:mx-auto md:px-7">
        <Link to="/" className="header-logo font-display text-xl tracking-tight" onClick={() => setOpen(false)}>
          Maison <em className="text-primary">Kaya</em>
        </Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-foreground/70 transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link to="/estimation" className="rounded-full bg-ink px-5 py-2.5 text-sm text-ink-foreground transition hover:bg-primary">
            Estimer mes revenus
          </Link>
        </div>
        <button className="menu-toggle lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mx-4 mt-2 rounded-3xl border border-border bg-background p-6 lg:hidden">
          <div className="flex flex-col gap-4 font-display text-2xl">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>
            ))}
            <Link to="/estimation" onClick={() => setOpen(false)} className="text-primary">Estimer mes revenus</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="grain overflow-hidden bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-24">
        <p className="display-lg max-w-4xl">
          Votre logement mérite <em className="text-primary">qu'on en prenne soin.</em>
        </p>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/estimation" className="rounded-full bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90">Estimer mes revenus</Link>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="rounded-full border border-ink-foreground/30 px-6 py-3 transition hover:bg-ink-foreground/10">Prendre rendez-vous</a>
        </div>
        <div className="mt-24 grid gap-10 border-t border-ink-foreground/15 pt-10 text-sm text-ink-foreground/70 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-ink-foreground">Maison Kaya</p>
            <p className="mt-2">Conciergerie pour propriétaires · Val-de-Marne (94)</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">WhatsApp · {PHONE_DISPLAY}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">Instagram · @kaya.conciergerie</a>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/mentions-legales" className="hover:text-ink-foreground">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-ink-foreground">Confidentialité & cookies</Link>
          </div>
        </div>
        <p className="mt-16 select-none font-display text-[22vw] leading-none text-ink-foreground/5">Kaya</p>
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
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-olive px-4 py-3 text-ink-foreground shadow-2xl transition hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm sm:inline">WhatsApp</span>
    </a>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: React.ReactNode; intro?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="display-xl mt-6 max-w-5xl animate-rise">{title}</h1>
        {intro && <p className="mt-8 max-w-xl text-lg text-muted-foreground animate-rise">{intro}</p>}
      </div>
      {image && (
        <div className="mx-auto mt-16 max-w-7xl px-6">
          <div className="overflow-hidden rounded-[2rem]">
            <InteriorPhoto src={image} alt="Intérieur préparé par Maison Kaya" imageClassName="h-[50vh] w-full object-cover animate-slowzoom md:h-[70vh]" />
          </div>
        </div>
      )}
    </section>
  );
}

export { Instagram };
