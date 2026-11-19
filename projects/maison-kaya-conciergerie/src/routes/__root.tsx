import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, WhatsAppFab, SkipLink } from "@/components/site/Layout";
import { SITE_NAME, PHONE_TEL, EMAIL, ADDRESS, COMMUNES, INSTAGRAM_URL } from "@/lib/site";
import { MotionLayer } from "@/components/site/MotionLayer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cette page ne s'est pas chargée
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Un problème est survenu de notre côté. Vous pouvez actualiser la page ou revenir à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_NAME },
      { name: "description", content: "Conciergerie Airbnb et location courte durée dans le Val-de-Marne (94) : accompagnement des propriétaires à Champigny, Saint-Maur, Nogent, Le Perreux, Joinville, Villiers et Bry-sur-Marne." },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;600&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Pose les réglages d'animation avant le premier affichage (pas de flash). Si le script du site
// ne démarre pas, tout redevient visible après 5 s.
const BOOT = `(function(){try{var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(r)return;d.classList.add("mk-motion","mk-pin");if(matchMedia("(min-width: 768px)").matches)d.classList.add("mk-pin-d");setTimeout(function(){if(!window.__mkReady){d.classList.remove("mk-motion","mk-pin","mk-pin-d");d.classList.add("mk-failsafe")}},5000)}catch(e){}})();`;

// Données structurées (entreprise locale) pour le référencement.
const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: "Conciergerie pour propriétaires de logements en location courte durée dans le Val-de-Marne.",
  telephone: PHONE_TEL,
  email: EMAIL,
  address: { "@type": "PostalAddress", streetAddress: ADDRESS.street, postalCode: ADDRESS.zip, addressLocality: ADDRESS.city, addressCountry: "FR" },
  areaServed: COMMUNES.map((name) => ({ "@type": "City", name })),
  sameAs: [INSTAGRAM_URL],
};

/** Aperçu statique (sans serveur) : pas d'enveloppe <html> rendue par React, sinon la saisie dans les formulaires bloque. */
const STATIC_PREVIEW = import.meta.env["VITE_STATIC_PREVIEW"] === "1";

function RootShell({ children }: { children: ReactNode }) {
  if (STATIC_PREVIEW) return <>{children}</>;
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mk-progress" aria-hidden="true" />
      <SkipLink />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Header />
      <main id="contenu" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <MotionLayer />
    </QueryClientProvider>
  );
}
