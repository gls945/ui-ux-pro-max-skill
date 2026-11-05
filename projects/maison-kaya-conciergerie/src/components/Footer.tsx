import Link from "next/link";
import { communes, nav, site, whatsappHref } from "@/content/site";
import Logo from "./Logo";

export default function Footer() {
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__slogan">« {site.slogan} »</p>
          <p className="footer__about">
            Conciergerie de proximité accompagnant les propriétaires de logements en location courte durée dans le Val-de-Marne.
          </p>
          {socials.length > 0 && (
            <ul className="footer__socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="footer__title">Contact</h2>
          <ul className="footer__list">
            <li>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <address>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer__title">Navigation</h2>
          <ul className="footer__list">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer__title">Communes desservies</h2>
          <ul className="footer__list">
            {communes.map((c) => (
              <li key={c.slug}>
                <Link href={`/zone-intervention#${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Maison Kaya Conciergerie</p>
        <ul>
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link href="/politique-confidentialite">Politique de confidentialité</Link>
          </li>
        </ul>
        <p className="footer__note">Photographies d&apos;illustration — ne représentent pas des logements gérés par Maison Kaya.</p>
      </div>
    </footer>
  );
}
