import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { StepForm, HOUSING, CITIES, COORDS_STEP } from "@/components/site/StepForm";
import { whatsappLink, PHONE_DISPLAY, CALENDLY_URL, INSTAGRAM_URL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact & rendez-vous — Maison Kaya Conciergerie" },
      { name: "description", content: "Contactez Maison Kaya, prenez rendez-vous ou écrivez-nous sur WhatsApp pour confier votre logement." },
      { property: "og:title", content: "Contacter Maison Kaya" },
      { property: "og:description", content: "Formulaire, WhatsApp ou rendez-vous : parlons de votre logement." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Parlons de <em className="text-primary">votre logement.</em></>} />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <StepForm kind="contact" steps={[
            { title: "Votre logement", fields: [
              { name: "city", label: "Où se situe-t-il ?", type: "choice", options: CITIES },
              { name: "housing_type", label: "Type de logement", type: "choice", options: HOUSING },
            ]},
            { title: "Votre projet", fields: [
              { name: "situation", label: "Situation actuelle", type: "choice", options: ["Pas encore en location", "Déjà en location", "Résidence principale", "Investissement"] },
              { name: "besoin", label: "Accompagnement recherché", type: "choice", options: ["Gestion complète (20 %)", "Prestation ponctuelle", "Je me renseigne"] },
            ]},
            { ...COORDS_STEP, fields: [...COORDS_STEP.fields, { name: "message", label: "Informations complémentaires", type: "textarea" }] },
          ]} />
        </div>
        <aside className="space-y-6 lg:col-span-5">
          <div className="rounded-[2rem] bg-ink p-10 text-ink-foreground">
            <p className="eyebrow text-ink-foreground/60">Rendez-vous</p>
            <h3 className="mt-4 font-display text-3xl">Entretien personnalisé</h3>
            <p className="mt-6 text-ink-foreground/70">Étude de votre projet locatif.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="pill pill-primary mt-8">Choisir un créneau</a>
          </div>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block rounded-[2rem] bg-olive p-10 text-ink-foreground transition-opacity hover:opacity-90">
            <p className="eyebrow text-ink-foreground/70">WhatsApp</p>
            <p className="mt-4 font-display text-3xl">{PHONE_DISPLAY}</p>
            <p className="mt-2 text-ink-foreground/80">Une réponse rapide, en direct.</p>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="block rounded-[2rem] border border-border p-10 transition hover:bg-secondary">
            <p className="eyebrow">Instagram</p>
            <p className="mt-4 font-display text-3xl">@kaya.conciergerie</p>
          </a>
        </aside>
      </section>
    </>
  );
}
