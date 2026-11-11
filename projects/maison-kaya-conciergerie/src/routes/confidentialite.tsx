import { createFileRoute } from "@tanstack/react-router";
import { SITE_NAME, EMAIL, ADDRESS_DISPLAY, LEGAL_UPDATED } from "@/lib/site";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Confidentialité & cookies — Maison Kaya Conciergerie" },
      { name: "description", content: "Politique de confidentialité et cookies de Maison Kaya Conciergerie." },
      { property: "og:title", content: "Confidentialité — Maison Kaya" },
      { property: "og:description", content: "Comment nous traitons vos données." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <section className="legal mx-auto max-w-3xl px-6 pb-28 pt-32 md:pt-40">
      <h1 className="display-lg">Confidentialité & cookies</h1>
      <p className="mt-4 text-sm text-muted-foreground">Dernière mise à jour : {LEGAL_UPDATED}</p>
      <div className="mt-10 space-y-6 text-muted-foreground">
        <h2>Données collectées</h2>
        <p>Les formulaires de contact et d'estimation collectent votre nom, votre adresse e-mail, votre numéro de téléphone, la ville et le type de votre logement, ainsi que le message que vous nous laissez.</p>
        <h2>Finalité et base légale</h2>
        <p>Ces informations servent uniquement à répondre à votre demande et à échanger avec vous sur votre projet. Elles sont traitées sur la base de votre consentement, donné lors de l'envoi du formulaire. Elles ne sont jamais revendues ni transmises à des tiers à des fins commerciales.</p>
        <h2>Durée de conservation</h2>
        <p>Vos données sont conservées le temps nécessaire au traitement de votre demande, puis au plus trois ans après notre dernier échange si aucun contrat n'est signé.</p>
        <h2>Vos droits</h2>
        <p>Vous pouvez demander l'accès, la rectification, la suppression ou la portabilité de vos données, ou vous opposer à leur traitement, en écrivant à <a href={`mailto:${EMAIL}`} className="link-line">{EMAIL}</a> ou par courrier à {SITE_NAME}, {ADDRESS_DISPLAY}. Vous pouvez également saisir la CNIL.</p>
        <h2>Cookies</h2>
        <p>Ce site n'utilise aucun cookie publicitaire ni traceur soumis à consentement. Seuls des éléments techniques strictement nécessaires au fonctionnement du site peuvent être utilisés. C'est pourquoi aucun bandeau de consentement n'est affiché.</p>
        <p>Les services externes vers lesquels renvoie le site (Calendly, WhatsApp, Instagram, carte OpenStreetMap) appliquent leurs propres politiques de confidentialité.</p>
      </div>
    </section>
  ),
});
