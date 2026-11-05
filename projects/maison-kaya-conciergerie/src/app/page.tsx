import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import EntryExperience from "@/components/EntryExperience";
import HomeHero from "@/components/HomeHero";
import ImmersiveImage from "@/components/ImmersiveImage";
import Scene3D from "@/components/Scene3D";
import ZoneMap from "@/components/ZoneMap";
import { communes, images, reasons, services, steps, values } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Conciergerie Airbnb Val-de-Marne (94)",
  description:
    "Maison Kaya Conciergerie accompagne les propriétaires en location courte durée à Champigny-sur-Marne, Saint-Maur, Nogent et dans le Val-de-Marne : un service personnalisé et transparent.",
  path: "/",
  image: images.hero.src,
});

export default function HomePage() {
  return (
    <>
      <EntryExperience />
      <HomeHero />

      {/* Présentation */}
      <section className="section intro" aria-labelledby="intro-title">
        <div className="container intro__grid">
          <div className="intro__text">
            <p className="eyebrow" data-reveal>Maison Kaya</p>
            <h2 id="intro-title" className="h2" data-reveal>
              Bien plus qu&apos;une conciergerie, un véritable partenaire de confiance.
            </h2>
            <p className="lead" data-reveal>
              Confier son logement demande de la confiance et de la sérénité. Maison Kaya Conciergerie vous accompagne au quotidien
              avec une attention particulière portée à chaque détail, afin de vous offrir un accompagnement humain, organisé et
              transparent.
            </p>
            <Link href="/notre-approche" className="link-arrow" data-reveal>
              Découvrir notre approche
            </Link>
          </div>
          <div className="intro__media" data-reveal>
            <ImmersiveImage src={images.living.src} alt={images.living.alt} sizes="(max-width: 900px) 100vw, 42vw" />
          </div>
        </div>
        <ul className="container values">
          {values.map((v, i) => (
            <li key={v.title} className="value" data-reveal style={{ ["--d" as string]: `${i * 120}ms` }}>
              <span className="value__num">0{i + 1}</span>
              <h3 className="h3">{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="section services-home sand" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>Nos services</p>
            <h2 id="services-title" className="h2" data-reveal>Un accompagnement complet, pensé pour votre logement.</h2>
          </div>
          <ul className="service-cards">
            {services.map((s, i) => (
              <li key={s.id} className={`service-card service-card--${i}`} data-reveal style={{ ["--d" as string]: `${(i % 3) * 100}ms` }}>
                <Link href={`/services#${s.id}`} className="service-card__link">
                  <ImmersiveImage src={s.image.src} alt={s.image.alt} sizes="(max-width: 700px) 100vw, 33vw" tilt={12}>
                    <span className="service-card__num">0{i + 1}</span>
                  </ImmersiveImage>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.short}</p>
                  <span className="link-arrow">En savoir plus</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pourquoi Maison Kaya */}
      <section className="section why" aria-labelledby="why-title">
        <div className="container why__grid">
          <div className="why__visual" data-reveal>
            <Scene3D variant="sculpture" />
            <p className="why__caption">Le soin du détail, la sérénité en plus.</p>
          </div>
          <div>
            <p className="eyebrow" data-reveal>Pourquoi Maison Kaya ?</p>
            <h2 id="why-title" className="h2" data-reveal>Un interlocuteur attentif, à deux pas de chez vous.</h2>
            <ul className="why__list">
              {reasons.map((r, i) => (
                <li key={r.title} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <h3 className="h3">{r.title}</h3>
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Comment ça fonctionne */}
      <section className="section steps dark" aria-labelledby="steps-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow eyebrow--light" data-reveal>Comment ça fonctionne ?</p>
            <h2 id="steps-title" className="h2" data-reveal>Quatre étapes, en toute sérénité.</h2>
          </div>
          <ol className="steps__list">
            {steps.map((s, i) => (
              <li key={s.title} className="step" data-reveal style={{ ["--d" as string]: `${i * 150}ms` }}>
                <span className="step__num">{i + 1}</span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Zone */}
      <section className="section zone-home" aria-labelledby="zone-title">
        <div className="container zone-home__grid">
          <div>
            <p className="eyebrow" data-reveal>Zone d&apos;intervention</p>
            <h2 id="zone-title" className="h2" data-reveal>Une conciergerie de proximité dans le Val-de-Marne.</h2>
            <p className="lead" data-reveal>
              Basée à Champigny-sur-Marne, Maison Kaya accompagne les propriétaires des communes voisines, le long de la Marne.
            </p>
            <ul className="commune-chips" data-reveal>
              {communes.map((c) => (
                <li key={c.slug}>
                  <Link href={`/zone-intervention#${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ZoneMap />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
