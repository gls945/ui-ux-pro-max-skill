import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { COMMUNES } from "@/lib/site";
import marne from "@/assets/marne-quais-nets.jpg";

export const Route = createFileRoute("/secteur")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Secteur d'intervention — Val-de-Marne (94) | Maison Kaya" },
      { name: "description", content: "Conciergerie à Champigny, Saint-Maur, Nogent, Le Perreux, Joinville, Villiers et Bry-sur-Marne." },
      { property: "og:title", content: "Notre secteur — Maison Kaya" },
      { property: "og:description", content: "Sept communes des bords de Marne, aux portes de Paris." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Secteur d'intervention" title={<>Val-de-Marne, <em className="text-primary">aux portes de Paris.</em></>}
        intro="Nous intervenons dans sept communes de l'Est parisien, à quelques minutes de la capitale — un atout précieux pour attirer les voyageurs." image={marne} />
      <section className="mx-auto max-w-7xl px-6 py-28">
        <ul>
          {COMMUNES.map((c) => (
            <li key={c} className="group flex items-baseline justify-between border-t border-border py-6 last:border-b">
              <span className="font-display text-4xl transition group-hover:translate-x-3 group-hover:text-primary md:text-6xl">{c}</span>
              <span className="text-sm text-muted-foreground">94</span>
            </li>
          ))}
        </ul>
        <div className="mt-16 overflow-hidden rounded-[2rem]">
          <iframe title="Carte du secteur" className="h-[480px] w-full grayscale-[60%]" loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.44%2C48.78%2C2.6%2C48.86&layer=mapnik" />
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 text-muted-foreground"><p>Votre commune n'est pas listée ? Nous étudions chaque demande.</p><Link to="/contact" className="btn-pill">Écrivez-nous</Link></div>
      </section>
    </>
  ),
});
