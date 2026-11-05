import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import WhatsAppButton from "@/components/WhatsAppButton";
import { communes, images, site } from "@/content/site";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-title", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Conciergerie Airbnb Val-de-Marne (94)", template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "fr_FR", type: "website", images: [{ url: images.hero.src }] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#FDFBF5", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  slogan: site.slogan,
  description: site.description,
  url: site.url,
  telephone: "+33763901469",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: communes.map((c) => ({ "@type": "City", name: c.name })),
};

// Évite tout flash de l'entrée si elle a déjà été vue pendant la session.
const entryScript = `try{if(sessionStorage.getItem('mk-entered')==='1')document.documentElement.dataset.entered='1'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: entryScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WhatsAppButton />
        <RevealObserver />
      </body>
    </html>
  );
}
