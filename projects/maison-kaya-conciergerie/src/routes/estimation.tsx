import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { StepForm, HOUSING, CITIES, COORDS_STEP } from "@/components/site/StepForm";

export const Route = createFileRoute("/estimation")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Estimer mes revenus locatifs — Maison Kaya" },
      { name: "description", content: "Obtenez une estimation personnalisée du potentiel de votre logement en location courte durée dans le Val-de-Marne." },
      { property: "og:title", content: "Estimer mes revenus — Maison Kaya" },
      { property: "og:description", content: "Quelques questions sur votre logement, une estimation personnalisée en retour." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Estimation" title={<>Ce que votre logement <em className="text-primary">pourrait rapporter.</em></>}
        intro="Quelques questions, deux minutes. Nous revenons vers vous avec une estimation personnalisée — indicative, et non une garantie de revenus." />
      <section className="mx-auto max-w-3xl px-6 py-20">
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
      </section>
    </>
  ),
});
