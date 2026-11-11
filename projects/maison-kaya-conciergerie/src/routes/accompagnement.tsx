import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import hero from "@/assets/hero-salon.jpg";
import logo from "@/assets/logo-mk-encre.png";
import { COMMISSION_TERMS, STEPS, COMMUNES } from "@/lib/site";
import { Split } from "@/components/site/Split";

const PAINS = [
  "Le manque de temps pour suivre les séjours.",
  "La difficulté à coordonner les différentes interventions.",
  "Les échanges réguliers avec les voyageurs.",
  "La préparation du logement entre deux réservations.",
  "Le besoin d'un interlocuteur de confiance.",
];

const FAQ = [
  { q: "Comment est calculée la commission ?", a: `Une commission unique de ${COMMISSION_TERMS.rate} % sur les ${COMMISSION_TERMS.basis}, selon la base de calcul et les conditions définies dans le contrat signé avec chaque propriétaire.` },
  { q: "Qu'est-ce qui est facturé en plus ?", a: `${COMMISSION_TERMS.separateFees.join(", ")} sont facturés séparément. Les prestations complémentaires font l'objet d'un ${COMMISSION_TERMS.pricing}, validé par vous avant toute dépense.` },
  { q: "Dans quelles communes intervenez-vous ?", a: `${COMMUNES.join(", ")}. Votre commune n'est pas listée ? Écrivez-nous, nous étudions chaque demande.` },
  { q: "Comment se passe le premier contact ?", a: "Un premier échange, par téléphone, WhatsApp, formulaire ou rendez-vous en ligne, pour comprendre votre logement et vos besoins. Nous vous proposons ensuite une étude personnalisée." },
];

export const Route = createFileRoute("/accompagnement")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Pour les propriétaires — Conciergerie location courte durée 94 | Maison Kaya" },
      { name: "description", content: "Vous êtes propriétaire d'un logement en location courte durée dans le Val-de-Marne ? Maison Kaya vous accompagne, avec une commission de 20 % et une organisation claire." },
      { property: "og:title", content: "Pour les propriétaires — Maison Kaya Conciergerie" },
      { property: "og:description", content: "Un accompagnement adapté à votre logement, avec une communication transparente." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Pour les propriétaires" title={<>Vous êtes propriétaire ? <em className="text-primary">Nous vous accompagnons.</em></>}
        intro="Notre objectif est de vous apporter un accompagnement adapté à votre logement et à vos attentes, avec une organisation claire et une communication transparente." image={hero} imageAlt="Salon lumineux préparé pour des voyageurs" />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <p className="eyebrow">Vos problématiques</p>
          <Split as="h2" className="display-lg mt-5">Ce que nous prenons <em className="text-primary">en charge.</em></Split>
        </div>
        <ul className="md:col-span-7">
          {PAINS.map((p) => <li key={p} className="list-line">{p}</li>)}
        </ul>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="eyebrow">Comment ça fonctionne ?</p>
          <div className="timeline mt-8">
            <svg className="timeline-svg" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true"><path className="draw-line" d="M1 0 V100" data-draw /></svg>
            {STEPS.map((s) => (
              <div key={s.t} className="step-row">
                <Split as="h2" className="font-display text-4xl md:text-5xl">{s.t}</Split>
                <p className="text-lg text-muted-foreground md:pt-3">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="frame photo-reveal logo-panel" data-no-reveal><img src={logo} alt="Logo Maison Kaya Conciergerie" width={900} height={900} loading="lazy" /></div>
        <div>
          <p className="eyebrow">La commission</p>
          <Split as="h2" className="display-lg mt-5"><span className="whitespace-nowrap">{COMMISSION_TERMS.rate} %</span> des revenus locatifs nets, <em className="text-primary">en toute transparence.</em></Split>
          <p className="mt-8 text-lg text-muted-foreground">
            Notre rémunération est une commission unique de {COMMISSION_TERMS.rate} % sur les {COMMISSION_TERMS.basis}, selon la base de calcul et les conditions définies dans le contrat signé avec chaque propriétaire. Les prestations complémentaires peuvent être facturées séparément, après présentation et acceptation d'un devis.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/services" className="pill pill-ghost">Voir les prestations</Link>
            <Link to="/contact" className="pill pill-primary">Confier mon logement</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 md:pb-32">
        <p className="eyebrow">Questions fréquentes</p>
        <Split as="h2" className="display-lg mt-5">Vos questions, <em className="text-primary">nos réponses.</em></Split>
        <div className="faq mt-10">
          {FAQ.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  ),
});
