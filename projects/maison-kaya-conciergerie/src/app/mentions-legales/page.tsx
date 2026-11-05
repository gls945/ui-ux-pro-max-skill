import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Mentions légales", description: "Mentions légales du site Maison Kaya Conciergerie.", path: "/mentions-legales" }) };

/**
 * ⚠️ Les informations marquées « À compléter » doivent être fournies et vérifiées
 * avant la mise en ligne (aucune donnée juridique n'a été inventée).
 */
const TODO = <mark className="todo">À compléter avant publication</mark>;

export default function LegalPage() {
  return (
    <section className="section legal">
      <div className="container narrow">
        <p className="eyebrow">Informations légales</p>
        <h1 className="h1">Mentions légales</h1>

        <h2 className="h3">Éditeur du site</h2>
        <ul>
          <li>Nom commercial : {site.name}</li>
          <li>Dénomination sociale et forme juridique : {TODO}</li>
          <li>Capital social (le cas échéant) : {TODO}</li>
          <li>Numéro SIREN / SIRET et RCS ou RNE : {TODO}</li>
          <li>Numéro de TVA intracommunautaire, ou mention de franchise si applicable : {TODO}</li>
          <li>
            Adresse : {site.address.street}, {site.address.postalCode} {site.address.city}
          </li>
          <li>
            Téléphone : <a href={site.phoneHref}>{site.phoneDisplay}</a>
          </li>
          <li>
            E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>Directeur ou directrice de la publication : {TODO}</li>
        </ul>

        <h2 className="h3">Activité réglementée</h2>
        <p>
          Le cas échéant (activité relevant de la loi n° 70-9 du 2 janvier 1970, dite « loi Hoguet ») : numéro de carte professionnelle,
          autorité de délivrance et garantie financière : {TODO}
        </p>

        <h2 className="h3">Hébergement</h2>
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.</p>

        <h2 className="h3">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus de ce site (textes, logo, éléments graphiques) est la propriété de {site.name}, sauf mention contraire.
          Toute reproduction sans autorisation préalable est interdite. Les photographies d&apos;illustration proviennent de la banque
          d&apos;images Unsplash et ne représentent pas des logements gérés par {site.name}.
        </p>

        <h2 className="h3">Responsabilité</h2>
        <p>
          {site.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées sur ce site, sans pouvoir en garantir
          l&apos;exhaustivité. Les conditions d&apos;accompagnement applicables sont exclusivement celles du contrat signé avec chaque
          propriétaire.
        </p>
      </div>
    </section>
  );
}
