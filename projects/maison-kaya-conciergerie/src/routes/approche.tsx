import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import linge from "@/assets/linge.jpg";
import { InteriorPhoto } from "@/components/site/InteriorPhoto";

const VALUES = [
  { t: "Humaine", d: "Un interlocuteur qui connaît votre logement, et vous." },
  { t: "Attentive", d: "Le soin du détail, du linge plié aux consignes bien transmises." },
  { t: "Transparente", d: "Une commission claire, des comptes rendus réguliers." },
  { t: "Locale", d: "Ancrée sur les bords de Marne, au plus près de vos biens." },
];

export const Route = createFileRoute("/approche")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Notre approche — Qui est Maison Kaya ?" },
      { name: "description", content: "Une conciergerie humaine et personnalisée, qui prend soin de votre logement comme du sien." },
      { property: "og:title", content: "Qui sommes-nous — Maison Kaya" },
      { property: "og:description", content: "Philosophie, valeurs et soin apporté aux logements." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Qui sommes-nous" title={<>Une maison, <em className="text-primary">pas une plateforme.</em></>}
        intro="Maison Kaya est née d'une conviction : un logement bien tenu, des voyageurs bien reçus et un propriétaire serein vont de pair." />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-28 md:grid-cols-12">
        <InteriorPhoto src={linge} alt="Linge préparé avec soin" className="rounded-[2rem] md:col-span-5" imageClassName="w-full" />
        <div className="md:col-span-7 md:pl-8">
          {VALUES.map((v) => (
            <div key={v.t} className="border-b border-border py-10 first:pt-0">
              <h2 className="font-display text-5xl italic text-primary">{v.t}</h2>
              <p className="mt-3 text-lg text-muted-foreground">{v.d}</p>
            </div>
          ))}
          <Link to="/contact" className="mt-10 inline-block rounded-full bg-ink px-7 py-4 text-ink-foreground hover:bg-primary">Faisons connaissance</Link>
        </div>
      </section>
    </>
  ),
});
