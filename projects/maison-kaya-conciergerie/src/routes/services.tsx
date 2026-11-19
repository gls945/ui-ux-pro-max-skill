import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { Split } from "@/components/site/Split";
import { SERVICES, COMMISSION_TERMS } from "@/lib/site";
import linge from "@/assets/linge.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Nos services de conciergerie location courte durée (94) | Maison Kaya" },
      { name: "description", content: "Accompagnement des voyageurs, coordination du ménage et du linge, annonces, décoration, maintenance : les prestations de Maison Kaya Conciergerie dans le Val-de-Marne." },
      { property: "og:title", content: "Nos services — Maison Kaya Conciergerie" },
      { property: "og:description", content: "Les prestations proposées aux propriétaires de logements en location courte durée." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Nos services" title={<>Des prestations claires, <em className="text-primary">un seul interlocuteur.</em></>}
        intro="Voici précisément ce que comprend notre accompagnement. Chaque prestation est définie avec vous, selon votre logement et vos attentes." image={linge} imageAlt="Serviettes préparées avec soin sur un lit" />
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-col gap-16 md:gap-24">
          {SERVICES.map((s, i) => (
            <article key={s.slug} id={s.slug} className="grid scroll-mt-32 gap-8 border-t border-border pt-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <Split as="h2" className="font-display text-3xl md:text-4xl">{s.t}</Split>
                <p className="mt-4 text-lg text-muted-foreground">{s.short}</p>
              </div>
              <ul className={`md:col-span-7 ${i % 2 ? "md:pl-8" : "md:pl-16"}`}>
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-4 border-b border-border py-4 text-lg"><Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="eyebrow">Commission</p>
            <Split as="h2" className="display-lg mt-5">Une commission unique de <em className="text-primary whitespace-nowrap">{COMMISSION_TERMS.rate} %.</em></Split>
          </div>
          <div className="md:col-span-7 md:pt-10">
            <p className="text-lg">La commission est calculée sur les {COMMISSION_TERMS.basis}, selon les conditions définies dans le contrat signé avec chaque propriétaire.</p>
            <p className="mt-4 text-muted-foreground">{COMMISSION_TERMS.separateFees.join(", ").toLowerCase().replace(/^./, (c) => c.toUpperCase())} sont facturés séparément. Les éventuels achats, travaux et prestations supplémentaires font l'objet d'une validation préalable de votre part et d'une facturation distincte, sur {COMMISSION_TERMS.pricing}.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/accompagnement" className="pill pill-ink">Pour les propriétaires</Link>
              <Link to="/contact" className="pill pill-ghost">Nous écrire</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  ),
});
