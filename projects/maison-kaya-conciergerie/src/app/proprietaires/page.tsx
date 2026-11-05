import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import ImmersiveImage from "@/components/ImmersiveImage";
import PageHero from "@/components/PageHero";
import { images, ownerPains, steps } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Propriétaires : faites-vous accompagner",
  description:
    "Propriétaire d'un logement en location courte durée dans le 94 ? Maison Kaya vous accompagne : voyageurs, ménage, préparation, interventions. Commission de 20 % selon contrat.",
  path: "/proprietaires",
  image: images.salon2.src,
});

export default function OwnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Pour les propriétaires"
        title="Vous êtes propriétaire ? Nous vous accompagnons."
        intro={
          <p>
            Notre objectif est de vous apporter un accompagnement adapté à votre logement et à vos attentes, avec une organisation claire et
            une communication transparente.
          </p>
        }
        image={images.salon2}
      >
        <div className="btn-row" data-reveal>
          <Link href="/contact#formulaire" className="btn btn--dark btn--lg">Confier mon logement</Link>
          <Link href="/contact#rendez-vous" className="btn btn--ghost btn--lg">Prendre rendez-vous</Link>
        </div>
      </PageHero>

      <section className="section sand" aria-labelledby="pains-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>Vos problématiques</p>
            <h2 id="pains-title" className="h2" data-reveal>Louer en courte durée, c&apos;est aussi beaucoup d&apos;organisation.</h2>
          </div>
          <ul className="pains">
            {ownerPains.map((p, i) => (
              <li key={p.title} className="pain" data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="pain__num">0{i + 1}</span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="value-title">
        <div className="container split">
          <div data-reveal>
            <ImmersiveImage src={images.bedroom.src} alt={images.bedroom.alt} sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <div>
            <p className="eyebrow" data-reveal>Notre proposition</p>
            <h2 id="value-title" className="h2" data-reveal>Un seul interlocuteur, une organisation claire.</h2>
            <p className="lead" data-reveal>
              Nous prenons le relais sur la coordination du quotidien — échanges avec les voyageurs, ménage, linge, préparation et
              interventions — tout en vous tenant informé et en sollicitant votre accord pour toute dépense supplémentaire.
            </p>
            <ol className="mini-steps" data-reveal>
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span>{i + 1}</span>
                  <strong>{s.title}</strong> — {s.text}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="commission" className="section dark" aria-labelledby="commission-title">
        <div className="container commission">
          <div data-reveal>
            <p className="eyebrow eyebrow--light">Notre rémunération</p>
            <h2 id="commission-title" className="h2">Une commission claire, définie ensemble.</h2>
          </div>
          <div className="commission__figure" data-reveal>
            <span className="commission__num">20&nbsp;%</span>
            <span className="commission__label">de commission</span>
          </div>
          <div className="commission__text" data-reveal>
            <p>
              Notre modèle repose sur une commission de 20&nbsp;%, selon la base de calcul et les conditions définies dans le contrat
              individuel signé avec chaque propriétaire.
            </p>
            <p>
              Les prestations complémentaires peuvent être facturées séparément, après présentation et acceptation d&apos;un devis. Aucune
              dépense ni intervention supplémentaire n&apos;est engagée sans votre validation.
            </p>
            <p className="small">
              Nous ne promettons ni niveau de revenus, ni taux d&apos;occupation, ni rentabilité : chaque logement est différent, et nous en
              parlons en toute transparence lors de notre premier échange.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
