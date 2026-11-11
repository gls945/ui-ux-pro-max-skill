import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { Split } from "@/components/site/Split";
import { VALUES } from "@/lib/site";
import linge from "@/assets/linge.jpg";

export const Route = createFileRoute("/approche")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Notre approche — Une conciergerie humaine dans le Val-de-Marne | Maison Kaya" },
      { name: "description", content: "Notre histoire, notre mission, notre vision et nos valeurs : proximité, soin du détail et transparence, au service des propriétaires du Val-de-Marne." },
      { property: "og:title", content: "Notre approche — Maison Kaya Conciergerie" },
      { property: "og:description", content: "Histoire, mission, vision et valeurs de Maison Kaya." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Notre approche" title={<>Une maison, <em className="text-primary">pas une plateforme.</em></>}
        intro="Maison Kaya est née d'une conviction : un logement bien tenu, des voyageurs bien reçus et un propriétaire serein vont de pair." />

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5"><div className="frame photo-reveal md:sticky md:top-28" data-no-reveal><img src={linge} alt="Linge préparé avec soin" width={1200} height={1504} loading="lazy" /></div></div>
        <div className="md:col-span-7 md:pl-8">
          <p className="eyebrow">Notre histoire</p>
          <Split as="h2" className="display-lg mt-5">Une conciergerie de proximité, <em className="text-primary">fondée sur la confiance.</em></Split>
          <p className="mt-8 text-lg text-muted-foreground">Maison Kaya Conciergerie a été créée dans le Val-de-Marne avec une volonté simple : proposer aux propriétaires un service de proximité, fondé sur la confiance et le soin apporté à chaque logement. Un interlocuteur qui connaît votre logement, votre secteur, et vous.</p>

          <p className="eyebrow mt-16">Notre mission</p>
          <p className="mt-4 font-display text-2xl leading-snug md:text-3xl">« Offrir aux propriétaires un accompagnement personnalisé et attentif, en prenant soin de chaque logement comme d'un lieu qui mérite toute notre attention. »</p>

          <p className="eyebrow mt-16">Notre vision</p>
          <p className="mt-4 font-display text-2xl leading-snug md:text-3xl">« Faire de Maison Kaya une référence locale de la conciergerie de qualité, reconnue pour son sérieux, sa proximité et son sens du détail. »</p>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow">Nos valeurs</p>
          <div className="mt-6 grid gap-10 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.t} className="border-t border-border pt-8">
                <Split as="h2" className="font-display text-4xl italic text-primary md:text-5xl">{v.t}</Split>
                <p className="mt-4 text-lg text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="pill pill-ink mt-14">Faisons connaissance</Link>
        </div>
      </section>
    </>
  ),
});
