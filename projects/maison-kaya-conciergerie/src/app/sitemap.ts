import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ["", 1],
    ["/services", 0.9],
    ["/proprietaires", 0.9],
    ["/notre-approche", 0.7],
    ["/zone-intervention", 0.8],
    ["/contact", 0.9],
    ["/mentions-legales", 0.2],
    ["/politique-confidentialite", 0.2],
  ] as const;
  return pages.map(([p, priority]) => ({ url: `${site.url}${p}`, lastModified: new Date(), changeFrequency: "monthly", priority }));
}
