import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { INCLUDED, EXTRAS, COMMISSION_TERMS } from "@/lib/site";
import linge from "@/assets/linge.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Nos services — Maison Kaya Conciergerie" },
      { name: "description", content: "Tout ce qui est inclus dans la commission unique de 20 %, et les prestations facturées à part, clairement." },
      { property: "og:title", content: "Services & commission de 20 % — Maison Kaya" },
      { property: "og:description", content: "Ce qui est compris dans la commission, ce qui ne l'est pas." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Nos services" title={<>Une seule commission. <em className="text-primary whitespace-nowrap">20 %.</em></>}
        intro="Pas de forfait caché, pas de commission additionnelle. Voici précisément ce que comprend notre accompagnement." image={linge} />
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-7xl leading-none text-primary whitespace-nowrap">{COMMISSION_TERMS.rate} %</p>
            <h2 className="mt-4 font-display text-3xl">Compris dans la commission</h2>
            <p className="mt-6 text-muted-foreground">Notre commission est calculée sur les {COMMISSION_TERMS.basis}.</p>
          </div>
          <ul className="md:col-span-8 divide-y divide-border border-y border-border">
            {INCLUDED.map((s) => (
              <li key={s} className="flex items-start gap-4 py-5 text-lg"><Check className="mt-1 h-5 w-5 shrink-0 text-primary" />{s}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-3xl">Des attentions en plus, pour votre logement.</h2>
            <p className="mt-4 text-lg italic text-muted-foreground">Selon vos besoins, sur devis.</p>
          </div>
          <ul className="md:col-span-8 grid gap-x-10 sm:grid-cols-2">
            {EXTRAS.map((s) => (
              <li key={s.title} className="border-b border-border py-5">
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.description}</p>
              </li>
            ))}
          </ul>
          <div className="md:col-span-8 md:col-start-5">
            <p className="text-muted-foreground">Prestations complémentaires payantes.<br />Achats et interventions externes précisés au devis.</p>
            <a href="https://www.instagram.com/kaya.conciergerie/" target="_blank" rel="noreferrer" className="btn-pill mt-6">Parlons de votre projet en message privé</a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-28 text-center">
        <h2 className="display-lg">Une question sur ce qui est inclus ?</h2>
        <Link to="/contact" className="mt-10 inline-block rounded-full bg-ink px-7 py-4 text-ink-foreground hover:bg-primary">Nous écrire</Link>
      </section>
    </>
  ),
});
