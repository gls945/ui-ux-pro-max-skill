import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "fr_FR",
      type: "website",
      images: image ? [{ url: image, width: 1800, height: 1200 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}
