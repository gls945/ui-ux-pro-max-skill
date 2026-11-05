import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import ImmersiveImage from "@/components/ImmersiveImage";
import PageHero from "@/components/PageHero";
import { images, services } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Nos services de conciergerie location courte durée",
  description:
    "Accompagnement des voyageurs, coordination du ménage et du linge, annonces, décoration et maintenance : les prestations de Maison Kaya Conciergerie dans le Val-de-Marne.",
  path: "/services",
  image: images.apartment.src,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Des prestations pensées pour votre location courte durée."
        intro={<p>De l&apos;accueil des voyageurs à la préparation du logement, nous coordonnons chaque étape avec soin, selon les modalités convenues avec vous.</p>}
        image={images.apartment}
      >
        <nav className="toc" aria-label="Sommaire des services" data-reveal>
          {services.map((s, i) => (
            <a key={s.id} href={`#${s.id}`}>
              <span>0{i + 1}</span> {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`section service-detail${i % 2 ? " is-reverse sand" : ""}`} aria-labelledby={`${s.id}-title`}>
          <div className="container service-detail__grid">
            <div className="service-detail__media" data-reveal>
              <ImmersiveImage src={s.image.src} alt={s.image.alt} sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
            <div className="service-detail__text">
              <p className="eyebrow" data-reveal>Service 0{i + 1}</p>
              <h2 id={`${s.id}-title`} className="h2" data-reveal>{s.title}</h2>
              <p className="lead" data-reveal>{s.short}</p>
              <ul className="checklist" data-reveal>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="section notice-section" aria-labelledby="validation-title">
        <div className="container narrow">
          <div className="notice" data-reveal>
            <h2 id="validation-title" className="h3">Votre validation, toujours.</h2>
            <p>
              Les éventuels achats, travaux et prestations supplémentaires font l&apos;objet d&apos;une validation préalable du propriétaire
              et d&apos;une facturation distincte lorsque cela est prévu.
            </p>
            <Link href="/proprietaires#commission" className="link-arrow">Comprendre notre fonctionnement</Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
