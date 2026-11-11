import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { COMMUNES } from "@/lib/site";
import marne from "@/assets/marne-quais-nets.jpg";

export const Route = createFileRoute("/secteur")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Zone d'intervention — Conciergerie Champigny, Saint-Maur, Nogent (94) | Maison Kaya" },
      { name: "description", content: "Conciergerie Airbnb à Champigny-sur-Marne, Saint-Maur-des-Fossés, Nogent-sur-Marne, Le Perreux-sur-Marne, Joinville-le-Pont, Villiers-sur-Marne et Bry-sur-Marne." },
      { property: "og:title", content: "Zone d'intervention — Maison Kaya Conciergerie" },
      { property: "og:description", content: "Sept communes du Val-de-Marne, à proximité de Paris." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Zone d'intervention" title={<>Une conciergerie locale <em className="text-primary">au cœur du Val-de-Marne.</em></>}
        intro="Maison Kaya Conciergerie intervient dans plusieurs communes du Val-de-Marne, à proximité de Paris, afin de proposer un accompagnement de proximité aux propriétaires de logements en location courte durée." image={marne} imageAlt="Les quais de la Marne, avec cygnes et péniches" />
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="eyebrow mb-6">Communes desservies</p>
        <ul>
          {COMMUNES.map((c) => (
            <li key={c} className="commune-row">
              <span>{c}</span>
              <span className="text-sm text-muted-foreground">Val-de-Marne</span>
            </li>
          ))}
        </ul>
        <div className="mt-12 overflow-hidden rounded-[2rem] md:mt-16">
          <iframe title="Carte des communes desservies dans le Val-de-Marne" className="h-[420px] w-full grayscale-[60%] md:h-[480px]" loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.44%2C48.78%2C2.6%2C48.86&layer=mapnik" />
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 text-muted-foreground"><p>Votre commune n'est pas listée ? Nous étudions chaque demande.</p><Link to="/contact" className="btn-pill">Écrivez-nous</Link></div>
      </section>
    </>
  ),
});
