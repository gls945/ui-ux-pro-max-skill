import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import logo from "@/assets/logo-mk-encre.png";
import hero from "@/assets/hero-salon.jpg";
import { COMMISSION_TERMS } from "@/lib/site";
import { Split } from "@/components/site/Split";

const STEPS = [
  { t: "On se rencontre", d: "Un premier échange pour comprendre votre logement, vos attentes et votre calendrier." },
  { t: "On visite", d: "Nous découvrons le bien sur place et vous conseillons sur sa mise en valeur." },
  { t: "On prépare", d: "Création et optimisation des annonces, consignes, linge, organisation du ménage." },
  { t: "On accueille", d: "Communication avec les voyageurs, arrivées, départs, vérifications après chaque séjour." },
  { t: "On vous tient informé", d: "Un suivi régulier de l'activité, des tarifs ajustés et un signalement de tout imprévu." },
];

export const Route = createFileRoute("/accompagnement")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Notre accompagnement propriétaires — Maison Kaya" },
      { name: "description", content: "Comment se déroule la prise en charge de votre logement et comment fonctionne la commission de 20 %." },
      { property: "og:title", content: "Accompagnement propriétaires — Maison Kaya" },
      { property: "og:description", content: "De la première rencontre au suivi régulier : notre collaboration." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Pour les propriétaires" title={<>Une collaboration <em className="text-primary">simple et claire.</em></>} image={hero} />
      <section className="mx-auto max-w-5xl px-6 py-28">
        <div className="timeline">
          <svg className="timeline-svg" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true"><path className="draw-line" d="M1 0 V100" data-draw /></svg>
          {STEPS.map((s, i) => (
            <div key={s.t} className="step-row">
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <Split as="h2" className="font-display text-4xl md:text-5xl">{s.t}</Split>
              <p className="text-lg text-muted-foreground md:pt-3">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-28 md:grid-cols-2">
        <div className="frame photo-reveal logo-panel" data-no-reveal><img src={logo} alt="Logo Maison Kaya Conciergerie" width={900} height={900} loading="lazy" /></div>
        <div>
          <p className="eyebrow">La commission</p>
          <Split as="h2" className="display-lg mt-5"><span className="whitespace-nowrap">20 %</span> des revenus locatifs nets, <em className="text-primary">en toute transparence.</em></Split>
          <p className="mt-8 text-lg text-muted-foreground">
            Notre rémunération est une commission unique de {COMMISSION_TERMS.rate} % sur les {COMMISSION_TERMS.basis}. Pas de réservation, pas de commission. {COMMISSION_TERMS.separateFees.join(", ")} sont facturés séparément. Les frais distincts sont précisés dès le départ et les prestations complémentaires font l’objet d’un {COMMISSION_TERMS.pricing}.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/services" className="pill pill-ghost">Voir le détail</Link>
            <Link to="/estimation" className="pill pill-primary">Estimer mes revenus</Link>
          </div>
        </div>
      </section>
    </>
  ),
});
