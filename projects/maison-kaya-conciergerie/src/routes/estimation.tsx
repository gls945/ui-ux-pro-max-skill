import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { Split } from "@/components/site/Split";
import { StepForm, HOUSING, CITIES, COORDS_STEP } from "@/components/site/StepForm";
import { COMMISSION_TERMS, COMMUNES, whatsappLink, PHONE_DISPLAY } from "@/lib/site";
import hero from "@/assets/hero-salon.jpg";

const HOW = [
  { t: "Vous décrivez votre logement", d: "Type, ville, surface, couchages, état : deux minutes suffisent." },
  { t: "Nous l'étudions", d: "Nous regardons votre logement, son secteur et la demande locale." },
  { t: "Vous recevez une estimation", d: "Une estimation personnalisée, indicative et sans engagement, par e-mail ou par téléphone." },
];

export const Route = createFileRoute("/estimation")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Estimation de votre logement en location courte durée (94) | Maison Kaya" },
      { name: "description", content: "Décrivez votre logement du Val-de-Marne en quelques questions. Maison Kaya Conciergerie revient vers vous avec une estimation indicative, sans engagement." },
      { property: "og:title", content: "Estimer mon logement — Maison Kaya Conciergerie" },
      { property: "og:description", content: "Quelques questions sur votre logement, une estimation indicative en retour." },
    ],
  }),
  component: Estimation,
});

function Estimation() {
  return (
    <>
      <PageHero eyebrow="Estimation" title={<>Ce que votre logement <em className="text-primary">pourrait rapporter.</em></>}
        intro="Quelques questions, deux minutes. Nous revenons vers vous avec une estimation personnalisée, indicative, qui ne constitue pas une garantie de revenus." image={hero} imageAlt="Salon lumineux préparé pour des voyageurs" />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <p className="eyebrow">Comment ça se passe ?</p>
          <Split as="h2" className="display-lg mt-5">Simple, rapide, <em className="text-primary">sans engagement.</em></Split>
        </div>
        <ol className="steps md:col-span-8">
          {HOW.map((s) => (
            <li key={s.t} className="step-row">
              <h3 className="font-display text-3xl md:text-4xl">{s.t}</h3>
              <p className="text-lg text-muted-foreground md:pt-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="formulaire" className="bg-secondary scroll-mt-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <StepForm kind="estimation" steps={[
              { title: "Votre logement", fields: [
                { name: "housing_type", label: "Type de logement", type: "choice", options: HOUSING },
                { name: "city", label: "Ville", type: "choice", options: CITIES },
              ]},
              { title: "Ses dimensions", fields: [
                { name: "surface", label: "Superficie (m²)", type: "number", required: true },
                { name: "chambres", label: "Chambres", type: "choice", options: ["0", "1", "2", "3", "4 +"] },
                { name: "couchages", label: "Couchages", type: "choice", options: ["1-2", "3-4", "5-6", "7 +"] },
                { name: "sdb", label: "Salles de bain", type: "choice", options: ["1", "2", "3 +"] },
              ]},
              { title: "Son caractère", fields: [
                { name: "etat", label: "État et équipement", type: "choice", options: ["À rafraîchir", "Bon état", "Très bon état", "Haut de gamme"] },
                { name: "exterieur", label: "Extérieur", type: "choice", options: ["Aucun", "Balcon", "Terrasse", "Jardin"] },
                { name: "situation", label: "Situation actuelle", type: "choice", options: ["Résidence principale", "Investissement locatif", "Déjà en location", "Autre"] },
              ]},
              { ...COORDS_STEP, fields: [...COORDS_STEP.fields, { name: "message", label: "Un mot sur votre projet (facultatif)", type: "textarea" }] },
            ]} />
          </div>
          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-[2rem] bg-background p-8 md:p-10">
              <p className="eyebrow">Bon à savoir</p>
              <ul className="mt-5 space-y-4 text-muted-foreground">
                <li><strong className="font-display text-xl text-foreground">Indicative, pas garantie.</strong><br />L'estimation dépend de la saison, de la demande et de votre logement. Nous n'affichons aucune promesse de revenus.</li>
                <li><strong className="font-display text-xl text-foreground">Une commission unique de {COMMISSION_TERMS.rate} %.</strong><br />Calculée sur les {COMMISSION_TERMS.basis}, selon le contrat signé avec vous.</li>
                <li><strong className="font-display text-xl text-foreground">Dans le Val-de-Marne.</strong><br />{COMMUNES.slice(0, 4).join(", ")}… Votre commune n'est pas listée ? Nous étudions chaque demande.</li>
              </ul>
              <Link to="/accompagnement" className="link-line mt-6 inline-block text-sm text-primary">Comment fonctionne la commission</Link>
            </div>
            <a href={whatsappLink("Bonjour Maison Kaya, je souhaiterais une estimation pour mon logement.")} target="_blank" rel="noreferrer" className="block rounded-[2rem] bg-olive p-8 text-ink-foreground transition-opacity hover:opacity-90 md:p-10">
              <p className="eyebrow text-ink-foreground/70">Vous préférez en parler ?</p>
              <p className="mt-4 font-display text-3xl">{PHONE_DISPLAY}</p>
              <p className="mt-2 text-ink-foreground/80">Écrivez-nous sur WhatsApp, nous vous répondons en direct.</p>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
