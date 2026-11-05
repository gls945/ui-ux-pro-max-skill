import { communes } from "@/content/site";

/**
 * Carte stylisée (non cartographique) des communes desservies, avec la Marne
 * et Paris comme simple repère géographique. Inclinée en 3D, s'anime au survol.
 */
export default function ZoneMap() {
  return (
    <figure className="zonemap" data-reveal>
      <div className="zonemap__plane">
        <svg viewBox="0 0 100 80" className="zonemap__svg" role="img" aria-labelledby="zonemap-title">
          <title id="zonemap-title">
            Carte schématique des communes desservies dans le Val-de-Marne : Champigny-sur-Marne, Saint-Maur-des-Fossés, Nogent-sur-Marne, Le Perreux-sur-Marne, Joinville-le-Pont, Villiers-sur-Marne et Bry-sur-Marne. Paris figure uniquement comme repère.
          </title>
          <defs>
            <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M5 0H0V5" fill="none" stroke="#89796A" strokeWidth=".08" opacity=".5" />
            </pattern>
          </defs>
          <rect width="100" height="80" fill="url(#grid)" />
          {/* La Marne (tracé stylisé) */}
          <path
            className="zonemap__river"
            d="M98 40 C88 44 82 40 74 44 C66 48 70 30 60 33 C50 36 54 46 48 50 C40 55 36 72 46 74 C56 76 58 60 50 58 C40 56 34 62 26 58 C18 54 12 48 4 47"
          />
          {/* Paris — repère seulement */}
          <g className="zonemap__paris">
            <circle cx="10" cy="22" r="6" />
            <text x="10" y="23.2" textAnchor="middle">Paris</text>
            <text x="10" y="31.5" textAnchor="middle" className="zonemap__note">repère</text>
          </g>
          {communes.map((c, i) => (
            <g key={c.slug} className={`zonemap__pin${"home" in c && c.home ? " is-home" : ""}`} style={{ ["--d" as string]: `${i * 90}ms` }}>
              <circle cx={c.x} cy={c.y} r={"home" in c && c.home ? 2.2 : 1.5} className="zonemap__dot" />
              <circle cx={c.x} cy={c.y} r="4" className="zonemap__halo" />
              <text x={c.x} y={c.y - 3.4} textAnchor="middle">
                {c.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption>Représentation schématique — Paris n&apos;est indiqué qu&apos;à titre de repère géographique.</figcaption>
    </figure>
  );
}
