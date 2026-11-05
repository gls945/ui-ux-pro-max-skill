import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section legal">
      <div className="container narrow">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="h1">Cette porte ne mène nulle part.</h1>
        <p className="lead">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="btn btn--dark">Revenir à l&apos;accueil</Link>
      </div>
    </section>
  );
}
