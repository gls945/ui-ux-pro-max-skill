import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-salon.jpg";
import linge from "@/assets/linge.jpg";
import marne from "@/assets/marne-rives-nettes.jpg";
import { COMMUNES, CALENDLY_URL, COMMISSION_TERMS } from "@/lib/site";
import { Reviews } from "@/components/site/Reviews";
import { InteriorPhoto } from "@/components/site/InteriorPhoto";
import { DelegationSculpture } from "@/components/site/DelegationSculpture";
import { HeroLogo } from "@/components/site/HeroLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Kaya — Conciergerie Airbnb dans le Val-de-Marne" },
      { name: "description", content: "Confiez votre location courte durée à Maison Kaya : du temps retrouvé, un logement suivi avec soin et un accompagnement local dans le Val-de-Marne." },
      { property: "og:title", content: "Maison Kaya — Conciergerie pour propriétaires" },
      { property: "og:description", content: "Du temps retrouvé, des tarifs ajustés et un logement suivi avec soin : votre conciergerie de proximité dans le Val-de-Marne." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="home-hero relative overflow-hidden">
        <InteriorPhoto src={hero} alt="Salon lumineux préparé pour des voyageurs" className="home-interior absolute inset-0 h-full w-full" imageClassName="h-full w-full object-cover animate-slowzoom" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/35" />
        <div className="home-hero-layout relative mx-auto max-w-7xl px-6 text-ink-foreground">
          <div className="home-hero-copy">
          <p className="eyebrow text-ink-foreground/70 animate-rise">Conciergerie · Val-de-Marne</p>
          <h1 className="display-xl mt-5 animate-rise">
            Louez sereinement.<br /><em className="text-sand">On s'occupe du reste.</em>
          </h1>
          <div className="mt-8 flex flex-col gap-6">
            <p className="max-w-md text-lg text-ink-foreground/80">
              Retrouvez votre temps, valorisez votre location et confiez votre logement à une conciergerie de proximité qui en prend soin.
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Link to="/estimation" className="rounded-full bg-primary px-7 py-4 text-primary-foreground transition hover:opacity-90">Estimer mes revenus</Link>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="rounded-full border border-ink-foreground/40 px-7 py-4 backdrop-blur transition hover:bg-ink-foreground/10">Prendre rendez-vous</a>
            </div>
          </div>
          </div>
          <HeroLogo className="home-hero-logo" />
        </div>
      </section>

      <section className="home-trust-section">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid gap-16 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Pourquoi Maison Kaya ?</p>
          <div className="md:col-span-9">
            <h2 className="display-lg">
              Votre tranquillité, <em className="text-primary">notre engagement.</em>
            </h2>
            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              <div>
                <h3 className="font-display text-2xl">Une présence locale</h3>
                <p className="mt-4 text-muted-foreground">Implantés dans le Val-de-Marne, nous connaissons votre secteur et coordonnons les besoins de votre logement sur place.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl">Un suivi attentif</h3>
                <p className="mt-4 text-muted-foreground">Échanges avec les voyageurs, vérification après chaque départ et signalement des imprévus : votre logement reste suivi.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl">Une relation transparente</h3>
                <p className="mt-4 text-muted-foreground">Vous êtes tenu informé de l’activité. Les frais sont annoncés et les prestations complémentaires sont définies avec vous.</p>
              </div>
            </div>
            <p className="mt-10 max-w-2xl text-muted-foreground">
              Une commission unique de <span className="whitespace-nowrap font-semibold text-foreground"><span data-count={COMMISSION_TERMS.rate}>{COMMISSION_TERMS.rate}</span> %</span> sur les {COMMISSION_TERMS.basis}. {COMMISSION_TERMS.separateFees.join(", ")} sont facturés séparément, sur {COMMISSION_TERMS.pricing}.
            </p>
            <Link to="/services" className="btn-pill mt-10">
              Ce qui est inclus
            </Link>
          </div>
        </div>
      </div>
      </section>

      <section className="delegation-section">
        <div className="delegation-layout">
        <DelegationSculpture />
        <div className="delegation-copy">
          <h2 className="display-lg">Déléguer, <em>sans rien lâcher.</em></h2>
          <div className="space-y-8 text-lg">
             <p><span className="font-display text-2xl">Du temps retrouvé.</span><br /><span className="text-muted-foreground">Plus de messages à 23 h ni de clés à remettre : nous gérons le quotidien.</span></p>
             <p><span className="font-display text-2xl">Des revenus optimisés.</span><br /><span className="text-muted-foreground">Tarifs ajustés aux saisons, à la demande et aux événements locaux.</span></p>
             <p><span className="font-display text-2xl">Un logement préservé.</span><br /><span className="text-muted-foreground">Vérifié après chaque départ, et vous êtes tenu informé.</span></p>
          </div>
           <Link to="/accompagnement" className="btn-pill self-start">Comment ça marche</Link>
        </div>
        </div>
      </section>

      <section className="home-services-section">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-16 pb-10 md:py-28 md:grid-cols-12">
        <div className="md:col-span-5">
          <InteriorPhoto src={linge} alt="Serviettes préparées avec soin" className="towels-photo rounded-[2rem]" imageClassName="h-full w-full object-cover" />
        </div>
        <div className="md:col-span-7 md:pl-10">
          <p className="eyebrow">Nos prestations</p>
          <h2 className="display-lg mt-5">Tout ce qu'il faut, <em className="text-primary">rien de superflu.</em></h2>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {["Annonces et réservations", "Calendriers et disponibilités", "Ajustement des tarifs", "Échanges voyageurs", "Suivi du logement"].map((s) => (
              <li key={s} className="py-5 font-display text-2xl md:text-3xl">{s}</li>
            ))}
          </ul>
          <Link to="/services" className="btn-pill mt-8">Voir le détail des services</Link>
        </div>
      </div>
      </section>

      <Reviews />

      <section className="relative mt-10 overflow-hidden">
        <img src={marne} alt="La Marne entre ses rives arborées, avec des rameurs sur l’eau" loading="lazy" width={1200} height={700} className="h-[80vh] min-h-[600px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/40" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-6 text-ink-foreground">
          <p className="eyebrow text-ink-foreground/70">Secteur d'intervention</p>
          <h2 className="display-lg mt-4 max-w-2xl">Les bords de Marne, <em className="text-sand">{`\naux portes de\u00a0Paris.`}</em></h2>
          <p className="mt-6 max-w-lg text-ink-foreground/80">{COMMUNES.join(" · ")}</p>
          <Link to="/secteur" className="mt-8 self-start rounded-full bg-ink-foreground px-6 py-3 text-ink transition hover:bg-sand">Découvrir le secteur</Link>
        </div>
      </section>

      <section className="decision-section">
        <div className="decision-layout">
          <div className="decision-option">
            <p className="eyebrow">Pas encore décidé ?</p>
            <h3>Estimez le potentiel <em>de votre logement</em></h3>
            <Link to="/estimation" className="btn-pill">Estimer mes revenus</Link>
          </div>
          <div className="decision-option decision-option-offset">
            <p className="eyebrow">Prêt à vous lancer ?</p>
            <h3>Réservez un entretien <em>personnalisé</em></h3>
            <p className="mt-6 text-muted-foreground">Étude de votre projet locatif.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-pill">Prendre rendez-vous</a>
          </div>
        </div>
      </section>
    </>
  );
}
