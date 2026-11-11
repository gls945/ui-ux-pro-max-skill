import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { StepForm, HOUSING, CITIES, COORDS_STEP } from "@/components/site/StepForm";
import { CopyLine } from "@/components/site/CopyLine";
import { whatsappLink, PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS_DISPLAY, CALENDLY_URL, INSTAGRAM_URL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact — Parlons de votre projet | Maison Kaya Conciergerie" },
      { name: "description", content: "Contactez Maison Kaya Conciergerie par formulaire, téléphone, WhatsApp ou rendez-vous en ligne pour confier votre logement dans le Val-de-Marne." },
      { property: "og:title", content: "Contacter Maison Kaya Conciergerie" },
      { property: "og:description", content: "Formulaire, WhatsApp, e-mail ou rendez-vous : parlons de votre logement." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Parlons de <em className="text-primary">votre projet.</em></>}
        intro="Vous possédez un logement dans notre secteur d'intervention et souhaitez être accompagné ? Contactez-nous pour échanger sur vos besoins." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <StepForm kind="contact" steps={[
            { title: "Votre logement", fields: [
              { name: "city", label: "Ville du logement", type: "choice", options: CITIES },
              { name: "housing_type", label: "Type de logement", type: "choice", options: HOUSING },
            ]},
            { ...COORDS_STEP, fields: [...COORDS_STEP.fields, { name: "message", label: "Votre message", type: "textarea", placeholder: "Parlez-nous de votre logement et de vos attentes." }] },
          ]} />
        </div>
        <aside className="space-y-6 lg:col-span-5">
          <div className="rounded-[2rem] bg-ink p-8 text-ink-foreground md:p-10">
            <p className="eyebrow text-ink-foreground/60">Rendez-vous en ligne</p>
            <h2 className="mt-4 font-display text-3xl">Choisissez un créneau</h2>
            <p className="mt-4 text-ink-foreground/70">Un premier échange pour comprendre votre logement et vos besoins.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="pill pill-primary mt-8">Prendre rendez-vous</a>
          </div>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block rounded-[2rem] bg-olive p-8 text-ink-foreground transition-opacity hover:opacity-90 md:p-10">
            <p className="eyebrow text-ink-foreground/70">WhatsApp</p>
            <p className="mt-4 font-display text-3xl">{PHONE_DISPLAY}</p>
            <p className="mt-2 text-ink-foreground/80">Échanger sur WhatsApp, une réponse en direct.</p>
          </a>
          <div className="rounded-[2rem] border border-border p-8 md:p-10">
            <p className="eyebrow">Nous joindre</p>
            <CopyLine label="Téléphone" value={PHONE_DISPLAY} copy={PHONE_TEL} href={`tel:${PHONE_TEL}`} />
            <CopyLine label="E-mail" value={EMAIL} copy={EMAIL} href={`mailto:${EMAIL}`} />
            <CopyLine label="Adresse" value={ADDRESS_DISPLAY} copy={ADDRESS_DISPLAY} />
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="link-line mt-6 inline-block text-sm">Instagram · @kaya.conciergerie</a>
          </div>
        </aside>
      </section>
    </>
  );
}
