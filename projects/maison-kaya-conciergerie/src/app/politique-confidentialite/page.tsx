import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Politique de confidentialité",
  description: "Comment Maison Kaya Conciergerie traite les données personnelles transmises via son site.",
  path: "/politique-confidentialite",
});

const TODO = <mark className="todo">À compléter avant publication</mark>;

export default function PrivacyPage() {
  return (
    <section className="section legal">
      <div className="container narrow">
        <p className="eyebrow">Données personnelles</p>
        <h1 className="h1">Politique de confidentialité</h1>

        <h2 className="h3">Responsable du traitement</h2>
        <p>
          {site.name} — {site.address.street}, {site.address.postalCode} {site.address.city} — <a href={`mailto:${site.email}`}>{site.email}</a>.
          Identité juridique : {TODO}
        </p>

        <h2 className="h3">Données collectées et finalités</h2>
        <p>
          Via le formulaire de contact, nous collectons : nom et prénom, adresse e-mail, numéro de téléphone, ville et type de logement,
          ainsi que le contenu de votre message. Ces données servent uniquement à répondre à votre demande et, le cas échéant, à préparer
          une proposition d&apos;accompagnement.
        </p>
        <p>Base légale : votre consentement et les mesures précontractuelles prises à votre demande (article 6.1 a et b du RGPD).</p>

        <h2 className="h3">Destinataires</h2>
        <p>
          Les données sont destinées exclusivement à {site.name}. Elles transitent par notre prestataire d&apos;envoi d&apos;e-mails (Resend)
          et notre hébergeur (Vercel), susceptibles de traiter des données hors de l&apos;Union européenne dans le cadre de garanties
          appropriées (clauses contractuelles types / Data Privacy Framework). Elles ne sont ni vendues ni cédées.
        </p>

        <h2 className="h3">Durée de conservation</h2>
        <p>
          Les demandes sans suite sont conservées au maximum 3 ans à compter du dernier contact, puis supprimées. Durée exacte retenue :{" "}
          {TODO}
        </p>

        <h2 className="h3">Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité,
          ainsi que du droit de retirer votre consentement à tout moment. Pour les exercer : <a href={`mailto:${site.email}`}>{site.email}</a>.
          Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
        </p>

        <h2 className="h3" id="cookies">Cookies et traceurs</h2>
        <p>
          Ce site n&apos;utilise aucun cookie publicitaire ni outil de mesure d&apos;audience soumis à consentement. Une simple préférence
          technique (stockage de session du navigateur) mémorise que vous avez déjà franchi l&apos;animation d&apos;entrée ; elle est
          supprimée à la fermeture de l&apos;onglet.
        </p>
        <p>
          Le module de prise de rendez-vous Calendly et la messagerie WhatsApp sont des services tiers qui ne sont chargés ou ouverts
          qu&apos;à votre initiative (clic) ; ils peuvent alors déposer leurs propres cookies, régis par leurs politiques respectives. Si des
          outils de mesure d&apos;audience soumis à consentement étaient ajoutés, un bandeau de consentement et une politique cookies dédiée
          seraient mis en place.
        </p>
      </div>
    </section>
  );
}
