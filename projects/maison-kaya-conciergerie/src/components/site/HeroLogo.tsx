import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import logoIvoire from "@/assets/logo-mk-ivoire.png";

const LogoScene = lazy(() => import("./LogoScene"));

/**
 * Logo Maison Kaya en 3D à côté du texte d'accueil.
 * Rendu serveur et repli (sans WebGL) : le logo découpé en image fixe.
 * La scène three.js n'est chargée que côté client et seulement si le bloc est visible.
 */
export function HeroLogo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { rootMargin: "100px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const still = <img src={logoIvoire} alt="" className="hero-logo-still" width={900} height={900} />;
  return (
    <div ref={ref} className={`hero-logo ${className}`} role="img" aria-label="Logo Maison Kaya Conciergerie">
      {failed ? still : (
        <ClientOnly fallback={still}>
          {visible ? <Suspense fallback={still}><LogoScene onUnavailable={() => setFailed(true)} /></Suspense> : still}
        </ClientOnly>
      )}
    </div>
  );
}
