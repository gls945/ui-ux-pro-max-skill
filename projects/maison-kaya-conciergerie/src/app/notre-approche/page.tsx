import CtaSection from "@/components/CtaSection";
import ImmersiveImage from "@/components/ImmersiveImage";
import PageHero from "@/components/PageHero";
import Scene3D from "@/components/Scene3D";
import { images, values } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Notre approche : proximité, soin du détail, transparence",
  description:
    "Découvrez l'histoire, la mission et les valeurs de Maison Kaya Conciergerie, conciergerie de proximité à Champigny-sur-Marne (94).",
  path: "/notre-approche",
  image: images.details.src,
});

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre approche"
        title="Prendre soin de chaque logement comme d'un lieu unique."
        intro={<p>Maison Kaya est née d&apos;une conviction simple : confier son logement doit rester une source de sérénité.</p>}
        image={images.details}
      />

      <section className="section editorial" aria-labelledby="story-title">
        <div className="container editorial__grid">
          <div className="editorial__col">
            <p className="eyebrow" data-reveal>Notre histoire</p>
            <h2 id="story-title" className="h2" data-reveal>Une conciergerie fondée sur la confiance.</h2>
            {/* TODO : compléter avec la présentation des fondateurs (prénoms, parcours, photo) fournie par Maison Kaya. */}
            <p className="dropcap" data-reveal>
              Maison Kaya Conciergerie a été créée à Champigny-sur-Marne avec la volonté de proposer aux propriétaires du Val-de-Marne un
              service de proximité, humain et attentif. Plutôt qu&apos;une gestion anonyme, nous avons choisi un accompagnement où chaque
              propriétaire connaît son interlocuteur, et où chaque logement est traité avec le soin qu&apos;il mérite.
            </p>
            <p data-reveal>
              Notre ancrage local nous permet d&apos;être présents, réactifs et de bien connaître le secteur que nous accompagnons, le long
              de la Marne.
            </p>
          </div>
          <div className="editorial__media" data-reveal data-parallax="0.06">
            <ImmersiveImage src={images.interior.src} alt={images.interior.alt} sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
        </div>
      </section>

      <section className="section sand" aria-labelledby="mission-title">
        <div className="container quotes">
          <figure className="quote" data-reveal>
            <h2 id="mission-title" className="eyebrow">Notre mission</h2>
            <blockquote>
              « Offrir aux propriétaires un accompagnement personnalisé et attentif, en prenant soin de chaque logement comme d&apos;un lieu
              qui mérite toute notre attention. »
            </blockquote>
          </figure>
          <figure className="quote" data-reveal>
            <h2 className="eyebrow">Notre vision</h2>
            <blockquote>
              « Faire de Maison Kaya une référence locale de la conciergerie de qualité, reconnue pour son sérieux, sa proximité et son
              sens du détail. »
            </blockquote>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container values-page">
          <div className="values-page__visual" data-reveal>
            <Scene3D variant="sculpture" />
          </div>
          <div>
            <p className="eyebrow" data-reveal>Nos valeurs</p>
            <h2 id="values-title" className="h2" data-reveal>Trois engagements, au quotidien.</h2>
            <ul className="values values--stack">
              {values.map((v, i) => (
                <li key={v.title} className="value" data-reveal>
                  <span className="value__num">0{i + 1}</span>
                  <h3 className="h3">{v.title}</h3>
                  <p>{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section gallery-section" aria-label="Inspirations">
        <div className="container gallery">
          {[images.kitchen, images.bedroom2, images.living].map((img, i) => (
            <div key={img.src} className={`gallery__item gallery__item--${i}`} data-reveal style={{ ["--d" as string]: `${i * 120}ms` }}>
              <ImmersiveImage src={img.src} alt={img.alt} sizes="(max-width: 700px) 100vw, 33vw" tilt={12} />
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
