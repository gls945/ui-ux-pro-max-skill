import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import ZoneMap from "@/components/ZoneMap";
import { communes, images } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Zone d'intervention : conciergerie dans le Val-de-Marne (94)",
  description:
    "Conciergerie Airbnb à Champigny-sur-Marne, Saint-Maur-des-Fossés, Nogent-sur-Marne, Le Perreux-sur-Marne, Joinville-le-Pont, Villiers-sur-Marne et Bry-sur-Marne.",
  path: "/zone-intervention",
  image: images.interior.src,
});

const notes: Record<string, string> = {
  "champigny-sur-marne": "Notre point d'attache : nous y sommes installés et y accompagnons les propriétaires au plus près.",
  "saint-maur-des-fosses": "Une commune nichée dans une boucle de la Marne, que nous rejoignons rapidement depuis Champigny.",
  "nogent-sur-marne": "Sur les bords de Marne, à proximité immédiate de notre secteur principal.",
  "le-perreux-sur-marne": "Commune voisine de Nogent et de Bry, intégrée à notre périmètre de proximité.",
  "joinville-le-pont": "À l'ouest de notre secteur, en bordure de Marne.",
  "villiers-sur-marne": "À l'est de Champigny, dans notre périmètre d'intervention direct.",
  "bry-sur-marne": "Entre Champigny et Le Perreux, sur la rive de la Marne.",
};

export default function ZonePage() {
  return (
    <>
      <section className="page-hero page-hero--map">
        <div className="container page-hero__grid">
          <div className="page-hero__text">
            <p className="eyebrow" data-reveal>Zone d&apos;intervention</p>
            <h1 className="h1" data-reveal>Une conciergerie locale au cœur du Val-de-Marne.</h1>
            <p className="lead" data-reveal>
              Maison Kaya Conciergerie intervient dans plusieurs communes du Val-de-Marne, à proximité de Paris, afin de proposer un
              accompagnement de proximité aux propriétaires de logements en location courte durée.
            </p>
          </div>
          <ZoneMap />
        </div>
      </section>

      <section className="section sand" aria-labelledby="communes-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>Communes desservies</p>
            <h2 id="communes-title" className="h2" data-reveal>Sept communes le long de la Marne.</h2>
          </div>
          <ul className="communes">
            {communes.map((c, i) => (
              <li key={c.slug} id={c.slug} className="commune" data-reveal style={{ ["--d" as string]: `${(i % 3) * 100}ms` }}>
                <h3 className="h3">Conciergerie {c.name}</h3>
                <p>{notes[c.slug]}</p>
              </li>
            ))}
          </ul>
          <p className="small center" data-reveal>
            Votre logement se situe dans une commune voisine ? <Link href="/contact">Contactez-nous</Link> : nous vous dirons si nous pouvons
            vous accompagner.
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
