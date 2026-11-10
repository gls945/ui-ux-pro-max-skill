import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-salon.jpg";
import marneSoir from "@/assets/marne.jpg";
import linge from "@/assets/linge.jpg";
import accueil from "@/assets/accueil.jpg";
import marne from "@/assets/marne-rives-nettes.jpg";
import { COMMUNES, CALENDLY_URL, COMMISSION_TERMS } from "@/lib/site";
import { Reviews } from "@/components/site/Reviews";
import { DelegationSculpture } from "@/components/site/DelegationSculpture";
import { HeroLogo } from "@/components/site/HeroLogo";
import { Split } from "@/components/site/Split";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Kaya — Conciergerie Airbnb dans le Val-de-Marne" },
      { name: "description", content: "Confiez votre location courte durée à Maison Kaya : du temps retrouvé, un logement suivi avec soin et un accompagnement local dans le Val-de-Marne." },
      { property: "og:title", content: "Maison Kaya — Conciergerie pour propriétaires" },
      { property: "og:description", content: "Du temps retrouvé, des tarifs ajustés et un logement suivi avec soin : votre conciergerie de proximité dans le Val-de-Marne." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CHAPTERS = [
  { img: marneSoir, alt: "Les bords de Marne au coucher du soleil, péniches amarrées devant une guinguette", pos: "50% 55%", n: "01", t: "Une présence locale", d: "Implantés dans le Val-de-Marne, nous connaissons votre secteur et coordonnons les besoins de votre logement sur place." },
  { img: linge, alt: "Serviettes préparées avec soin sur un lit", pos: "50% 58%", n: "02", t: "Un suivi attentif", d: "Échanges avec les voyageurs, vérification après chaque départ et signalement des imprévus : votre logement reste suivi." },
  { img: accueil, alt: "Accueil des voyageurs : remise des clés à la porte du logement", pos: "50% 28%", n: "03", t: "Une relation transparente", d: "Vous êtes tenu informé de l’activité. Les frais sont annoncés et les prestations complémentaires sont définies avec vous." },
];

function Index() {
  return (
    <>
      {/* ───── Parcours : la caméra entre dans le logement, puis dans la relation ───── */}
      <section className="journey" data-scene="journey" data-dark aria-label="Maison Kaya">
        <div className="j-stage">
          <div className="j-scrim" />
          <div className="j-glow" />

          <div className="j-chapter">
            <div className="j-layer"><img src={hero} alt="Salon lumineux préparé pour des voyageurs" width={1920} height={1280} fetchPriority="high" /></div>
            <div className="j-shade" />
            <div className="j-copy is-hero">
              <div>
                <p className="eyebrow animate-rise" style={{ color: "color-mix(in oklch, var(--ink-foreground) 70%, transparent)" }}>Conciergerie · Val-de-Marne</p>
                <Split as="h1" className="hero-h1">
                  Louez sereinement.<br /><em>On s'occupe du reste.</em>
                </Split>
                <p className="hero-text animate-rise" style={{ animationDelay: ".5s" }}>
                  Retrouvez votre temps, valorisez votre location et confiez votre logement à une conciergerie de proximité qui en prend soin.
                </p>
                <div className="hero-ctas animate-rise" style={{ animationDelay: ".65s" }}>
                  <Link to="/estimation" className="pill pill-primary">Estimer mes revenus</Link>
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="pill pill-ghost-light">Prendre rendez-vous</a>
                </div>
              </div>
              <HeroLogo />
            </div>
          </div>

          <div className="j-persist">
            <p className="eyebrow">Pourquoi Maison Kaya ?</p>
            <h2 className="display-lg">Votre tranquillité, <em>notre engagement.</em></h2>
          </div>

          {CHAPTERS.map((c) => (
            <div className="j-chapter" key={c.n}>
              <div className="j-layer"><img src={c.img} alt={c.alt} loading="lazy" decoding="async" style={{ objectPosition: c.pos }} /></div>
              <div className="j-shade" />
              <div className="j-copy">
                <span className="j-num">{c.n} / 03</span>
                <h3 className="j-title">{c.t}</h3>
                <p className="j-text">{c.d}</p>
              </div>
            </div>
          ))}

          <div className="j-rail" aria-hidden="true">{[0, 1, 2, 3].map((i) => <span className="j-dot" key={i} data-on={i === 0 ? "1" : "0"} />)}</div>
          <div className="j-hint" aria-hidden="true"><span>Défiler</span><i /></div>
        </div>
      </section>

      {/* ───── La page se pose : commission ───── */}
      <section className="settle">
        <div className="section">
          <div className="grid gap-12 md:grid-cols-12">
            <p className="eyebrow md:col-span-3">La commission</p>
            <div className="md:col-span-9">
              <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                Une commission unique de <span className="whitespace-nowrap font-display text-primary"><span data-count={COMMISSION_TERMS.rate}>{COMMISSION_TERMS.rate}</span> %</span> sur les {COMMISSION_TERMS.basis}. {COMMISSION_TERMS.separateFees.join(", ")} sont facturés séparément, sur {COMMISSION_TERMS.pricing}.
              </p>
              <Link to="/services" className="btn-pill mt-10">Ce qui est inclus</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Déléguer, sans rien lâcher : les clés en 3D ───── */}
      <section className="delegation-section" data-scene="delegation">
        <div className="delegation-stage">
          <DelegationSculpture />
          <div className="delegation-copy">
            <Split as="h2" className="display-lg">Déléguer, <em>sans rien lâcher.</em></Split>
            <div className="d-list">
              <div className="d-track"><div className="d-fill" /></div>
              <p className="d-item" data-state="on"><strong>Du temps retrouvé.</strong><span>Plus de messages à 23 h ni de clés à remettre : nous gérons le quotidien.</span></p>
              <p className="d-item" data-state="on"><strong>Des revenus optimisés.</strong><span>Tarifs ajustés aux saisons, à la demande et aux événements locaux.</span></p>
              <p className="d-item" data-state="on"><strong>Un logement préservé.</strong><span>Vérifié après chaque départ, et vous êtes tenu informé.</span></p>
            </div>
            <Link to="/accompagnement" className="btn-pill d-cta">Comment ça marche</Link>
          </div>
        </div>
      </section>

      {/* ───── Prestations ───── */}
      <section className="home-services-section">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-5">
            <div className="frame towels-frame photo-reveal" data-no-reveal>
              <img src={hero} alt="Détail d'un salon préparé avec soin : bibliothèque, miroir doré et bouquet" loading="lazy" width={1920} height={1280} className="plx" data-speed="0.14" style={{ objectPosition: "82% 50%", height: "112%", marginTop: "-6%" }} />
            </div>
          </div>
          <div className="md:col-span-7 md:pl-10">
            <p className="eyebrow">Nos prestations</p>
            <Split as="h2" className="display-lg mt-5">Tout ce qu'il faut, <em className="text-primary">rien de superflu.</em></Split>
            <ul className="mt-10 border-t border-border">
              {["Annonces et réservations", "Calendriers et disponibilités", "Ajustement des tarifs", "Échanges voyageurs", "Suivi du logement"].map((s) => (
                <li key={s} className="list-line">{s}</li>
              ))}
            </ul>
            <Link to="/services" className="btn-pill mt-10">Voir le détail des services</Link>
          </div>
        </div>
      </section>

      <Reviews />

      {/* ───── Secteur ───── */}
      <section className="marne-band" data-dark data-expand>
        <div className="bg"><img src={marne} alt="La Marne entre ses rives arborées, avec des rameurs sur l’eau" loading="lazy" width={1200} height={704} className="plx" data-speed="0.25" /></div>
        <div className="shade" />
        <div className="inner">
          <p className="eyebrow" style={{ color: "color-mix(in oklch, var(--ink-foreground) 70%, transparent)" }}>Secteur d'intervention</p>
          <Split as="h2" className="display-lg mt-4 max-w-2xl">Les bords de Marne, <em>aux portes de&nbsp;Paris.</em></Split>
          <ul className="commune-list" aria-label="Communes d'intervention">
            {COMMUNES.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <Link to="/secteur" className="pill pill-light mt-10">Découvrir le secteur</Link>
        </div>
      </section>

      <section className="decision-section">
        <div className="decision-layout">
          <div className="decision-option">
            <p className="eyebrow">Pas encore décidé ?</p>
            <Split as="h3">Estimez le potentiel <em>de votre logement</em></Split>
            <Link to="/estimation" className="btn-pill">Estimer mes revenus</Link>
          </div>
          <div className="decision-option decision-option-offset">
            <p className="eyebrow">Prêt à vous lancer ?</p>
            <Split as="h3">Réservez un entretien <em>personnalisé</em></Split>
            <p className="mt-6 text-muted-foreground">Étude de votre projet locatif.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-pill">Prendre rendez-vous</a>
          </div>
        </div>
      </section>
    </>
  );
}
