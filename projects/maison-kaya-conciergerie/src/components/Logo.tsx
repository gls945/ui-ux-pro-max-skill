import Image from "next/image";

/** Logo officiel Maison Kaya (monogramme MK). Fichiers : /public/brand/ */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`}>
      <span className="logo__mark">
        <Image src="/brand/logo-ink-dark.png" alt="" width={56} height={56} className="logo__ink logo__ink--dark" priority />
        <Image src="/brand/logo-ink-light.png" alt="" width={56} height={56} className="logo__ink logo__ink--light" />
      </span>
      <span className="logo__text">
        <span className="logo__name">Maison Kaya</span>
        <span className="logo__sub">Conciergerie</span>
      </span>
    </span>
  );
}
