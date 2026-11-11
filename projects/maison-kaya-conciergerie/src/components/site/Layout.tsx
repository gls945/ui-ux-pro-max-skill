import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, ArrowUp, Instagram } from "lucide-react";
import { whatsappLink, PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS_DISPLAY, INSTAGRAM_URL, CALENDLY_URL, SLOGAN, COMMUNES } from "@/lib/site";
import { Split } from "@/components/site/Split";
import logoIvoire from "@/assets/logo-mk-ivoire.png";

const NAV = [
  { to: "/services", label: "Nos services" },
  { to: "/accompagnement", label: "Propriétaires" },
  { to: "/approche", label: "Notre approche" },
  { to: "/secteur", label: "Zone d'intervention" },
  { to: "/contact", label: "Contact" },
] as const;

export function SkipLink() {
  return <a href="#contenu" className="skip-link">Aller au contenu</a>;
}

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
        <Link to="/" className="header-logo" onClick={() => setOpen(false)} aria-label="Maison Kaya Conciergerie, accueil">
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
            <Link to="/contact" onClick={() => setOpen(false)} className="text-primary">Confier mon logement</Link>
          </div>
          <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5 text-sm text-muted-foreground">
            <a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp · {PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
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
          Et si nous prenions soin <em className="text-sand">de votre logement ?</em>
        </Split>
        <p className="mt-6 max-w-xl text-ink-foreground/75">Échangeons sur votre projet et découvrons ensemble comment Maison Kaya peut vous accompagner.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/contact" className="pill pill-primary">Parlons de votre projet</Link>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="pill pill-ghost-light">Prendre rendez-vous</a>
        </div>
        <div className="mt-24 grid gap-10 border-t border-ink-foreground/15 pt-10 text-sm text-ink-foreground/70 md:grid-cols-4">
          <div>
            <img src={logoIvoire} alt="" width={900} height={900} className="h-16 w-16" loading="lazy" />
            <p className="mt-4 font-display text-2xl text-ink-foreground">Maison Kaya</p>
            <p className="mt-1 font-display italic text-sand">{SLOGAN}</p>
            <p className="mt-4 max-w-xs">Conciergerie pour propriétaires de logements en location courte durée, dans le Val-de-Marne (94).</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-2 text-ink-foreground/50">Nous joindre</p>
            <a href={`tel:${PHONE_TEL}`} className="hover:text-ink-foreground">Téléphone · {PHONE_DISPLAY}</a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">WhatsApp · {PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-ink-foreground" style={{ overflowWrap: "anywhere" }}>{EMAIL}</a>
            <address className="not-italic">{ADDRESS_DISPLAY}</address>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-2 hover:text-ink-foreground"><Instagram size={16} aria-hidden="true" /> @kaya.conciergerie</a>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-2 text-ink-foreground/50">Pages</p>
            <Link to="/" className="hover:text-ink-foreground">Accueil</Link>
            {NAV.map((n) => <Link key={n.to} to={n.to} className="hover:text-ink-foreground">{n.label}</Link>)}
            <Link to="/estimation" className="hover:text-ink-foreground">Estimation</Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-2 text-ink-foreground/50">Communes desservies</p>
            <ul className="flex flex-col gap-1">{COMMUNES.map((c) => <li key={c}>{c}</li>)}</ul>
            <Link to="/mentions-legales" className="mt-3 hover:text-ink-foreground">Mentions légales</Link>
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
    <>
      <button type="button" className="to-top" aria-label="Retour en haut de page" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>
        <ArrowUp size={18} aria-hidden="true" />
      </button>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Écrire sur WhatsApp"
        className="wa-fab fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-olive px-4 py-3 text-ink-foreground shadow-2xl transition-colors hover:bg-primary"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden text-sm sm:inline">WhatsApp</span>
      </a>
    </>
  );
}

export function PageHero({ eyebrow, title, intro, image, imageAlt = "Intérieur préparé par Maison Kaya" }: { eyebrow: string; title: React.ReactNode; intro?: string; image?: string; imageAlt?: string }) {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-44">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <Split as="h1" className="display-xl mt-6 max-w-5xl">{title}</Split>
        {intro && <p className="mt-8 max-w-xl text-lg text-muted-foreground">{intro}</p>}
      </div>
      {image && (
        <div className="mx-auto mt-12 max-w-7xl px-6 md:mt-16">
          <div className="page-hero-media" data-expand data-no-reveal>
            <img src={image} alt={imageAlt} width={1600} height={900} className="plx" data-speed="0.18" style={{ scale: "1.14" }} />
          </div>
        </div>
      )}
    </section>
  );
}

export { Instagram };
