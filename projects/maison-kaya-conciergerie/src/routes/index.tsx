import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-salon.jpg";
import marne from "@/assets/marne-rives-nettes.jpg";
import { COMMUNES, CALENDLY_URL, VALUES, SERVICES, STEPS, SITE_NAME } from "@/lib/site";
import { Reviews } from "@/components/site/Reviews";
import { DelegationSculpture } from "@/components/site/DelegationSculpture";
import { HeroLogo } from "@/components/site/HeroLogo";
import { Split } from "@/components/site/Split";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conciergerie Airbnb Val-de-Marne (94) | Maison Kaya Conciergerie" },
      { name: "description", content: "Maison Kaya Conciergerie accompagne les propriétaires de locations courte durée dans le Val-de-Marne : voyageurs, ménage, annonces, décoration et interventions, avec soin et transparence." },
      { property: "og:title", content: `${SITE_NAME} — Conciergerie Airbnb dans le Val-de-Marne` },
      { property: "og:description", content: "Le soin du détail, la sérénité en plus. Un accompagnement personnalisé pour les propriétaires de logements en location courte durée." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TONES = ["sable", "creme", "taupe"];

function Index() {
  return (
    <>
      {/* ───── Parcours : la photo d'accueil, puis les trois valeurs ───── */}
      <section className="journey" data-scene="journey" data-dark aria-label="Maison Kaya">
        <div className="j-stage">
          <div className="j-scrim" />
          <div className="j-glow" />

          <div className="j-chapter">
            <div className="j-layer"><img src={hero} alt="Salon lumineux et élégant, préparé avec soin pour des voyageurs" width={1920} height={1280} fetchPriority="high" /></div>
            <div className="j-shade" />
            <div className="j-copy is-hero">
              <div>
                <p className="eyebrow animate-rise" style={{ color: "color-mix(in oklch, var(--ink-foreground) 70%, transparent)" }}>Conciergerie · Val-de-Marne</p>
                <Split as="h1" className="hero-h1">
                  Votre logement mérite <em>une attention particulière.</em>
                </Split>
                <p className="hero-text animate-rise" style={{ animationDelay: ".4s" }}>
                  Maison Kaya Conciergerie accompagne les propriétaires dans la gestion de leur location courte durée, avec un service personnalisé au cœur du Val-de-Marne.
                </p>
                <div className="hero-ctas animate-rise" style={{ animationDelay: ".55s" }}>
                  <Link to="/contact" className="pill pill-primary">Confier mon logement</Link>
                  <Link to="/services" className="pill pill-ghost-light">Découvrir nos services</Link>
                </div>
              </div>
              <HeroLogo />
            </div>
          </div>

          <div className="j-persist">
            <p className="eyebrow">Présentation</p>
            <h2 className="display-lg">Bien plus qu'une conciergerie, <em>un véritable partenaire de confiance.</em></h2>
          </div>

          {VALUES.map((v, i) => (
            <div className="j-chapter is-beige" key={v.t}>
              <div className={`j-layer j-beige j-${TONES[i]}`} aria-hidden="true">
                <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="600" cy="400" r="150" /><circle cx="600" cy="400" r="230" /><circle cx="600" cy="400" r="310" /><circle cx="600" cy="400" r="390" /></g></svg>
              </div>
              <div className="j-copy">
                <span className="j-num">Nos valeurs</span>
                <h3 className="j-title">{v.t}</h3>
                <p className="j-text">{v.d}</p>
              </div>
            </div>
          ))}

          <div className="j-rail" aria-hidden="true">{[0, 1, 2, 3].map((i) => <span className="j-dot" key={i} data-on={i === 0 ? "1" : "0"} />)}</div>
          <div className="j-hint" aria-hidden="true"><span>Défiler</span><i /></div>
        </div>
      </section>

      {/* ───── La page se pose : présentation ───── */}
      <section className="settle">
        <div className="section">
          <div className="grid gap-10 md:grid-cols-12">
            <p className="eyebrow md:col-span-3">Confiance et sérénité</p>
            <div className="md:col-span-9">
              <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                Confier son logement demande de la confiance et de la sérénité. Maison Kaya Conciergerie vous accompagne au quotidien avec une attention particulière portée à chaque détail, afin de vous offrir un accompagnement humain, organisé et transparent.
              </p>
              <Link to="/approche" className="btn-pill mt-10">Notre approche</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Nos services ───── */}
      <section className="home-services-section">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
          <p className="eyebrow">Nos services</p>
          <Split as="h2" className="display-lg mt-5 max-w-3xl">Tout ce qu'il faut, <em className="text-primary">rien de superflu.</em></Split>
          <ul className="service-grid mt-12">
            {SERVICES.map((s) => (
              <li key={s.slug} className="service-card">
                <h3 className="font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.short}</p>
                <Link to="/services" hash={s.slug} className="link-line mt-5 inline-block text-sm text-primary">En savoir plus</Link>
              </li>
            ))}
            <li className="service-card service-card-cta">
              <p className="font-display text-2xl">Une question sur une prestation ?</p>
              <Link to="/contact" className="pill pill-light mt-5 self-start">Nous contacter</Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ───── Pourquoi Maison Kaya : les clés en 3D ───── */}
      <section className="delegation-section" data-scene="delegation">
        <div className="delegation-stage">
          <DelegationSculpture />
          <div className="delegation-copy">
            <p className="eyebrow">Pourquoi Maison Kaya ?</p>
            <Split as="h2" className="display-lg">Déléguer, <em>sans rien lâcher.</em></Split>
            <div className="d-list">
              <div className="d-track"><div className="d-fill" /></div>
              <p className="d-item" data-state="on"><strong>Un accompagnement personnalisé.</strong><span>Une organisation adaptée à votre logement et à vos besoins.</span></p>
              <p className="d-item" data-state="on"><strong>Un interlocuteur de proximité.</strong><span>Une présence locale, qui connaît votre secteur et votre logement.</span></p>
              <p className="d-item" data-state="on"><strong>Une communication transparente.</strong><span>Vous êtes tenu informé, et une attention particulière est portée au logement.</span></p>
            </div>
            <Link to="/accompagnement" className="btn-pill d-cta">Pour les propriétaires</Link>
          </div>
        </div>
      </section>

      {/* ───── Comment ça fonctionne ───── */}
      <section className="section">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Comment ça fonctionne ?</p>
            <Split as="h2" className="display-lg mt-5">Quatre étapes, <em className="text-primary">en toute simplicité.</em></Split>
          </div>
          <ol className="steps md:col-span-8">
            {STEPS.map((s) => (
              <li key={s.t} className="step-row">
                <h3 className="font-display text-3xl md:text-4xl">{s.t}</h3>
                <p className="text-lg text-muted-foreground md:pt-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Reviews />

      {/* ───── Zone d'intervention ───── */}
      <section className="marne-band" data-dark data-expand>
        <div className="bg"><img src={marne} alt="La Marne entre ses rives arborées, avec des rameurs sur l'eau" loading="lazy" width={1200} height={704} className="plx" data-speed="0.25" /></div>
        <div className="shade" />
        <div className="inner">
          <p className="eyebrow" style={{ color: "color-mix(in oklch, var(--ink-foreground) 70%, transparent)" }}>Zone d'intervention</p>
          <Split as="h2" className="display-lg mt-4 max-w-2xl">Une conciergerie de proximité <em>dans le Val-de-Marne.</em></Split>
          <ul className="commune-list" aria-label="Communes desservies">
            {COMMUNES.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <Link to="/secteur" className="pill pill-light mt-10">Voir la zone d'intervention</Link>
        </div>
      </section>

      <section className="decision-section">
        <div className="decision-layout">
          <div className="decision-option">
            <p className="eyebrow">Et si nous prenions soin de votre logement ?</p>
            <Split as="h3">Échangeons sur <em>votre projet</em></Split>
            <p className="mt-6 text-muted-foreground">Découvrons ensemble comment Maison Kaya peut vous accompagner.</p>
            <Link to="/contact" className="btn-pill">Parlons de votre projet</Link>
          </div>
          <div className="decision-option decision-option-offset">
            <p className="eyebrow">Prêt à vous lancer ?</p>
            <Split as="h3">Réservez un entretien <em>personnalisé</em></Split>
            <p className="mt-6 text-muted-foreground">Un premier échange pour comprendre votre logement et vos besoins.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-pill">Prendre rendez-vous</a>
          </div>
        </div>
      </section>
    </>
  );
}
