/** Logo provisoire (monogramme + nom). À remplacer par le logo officiel : /public/logo.svg */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`}>
      <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 44V20a16 16 0 0 1 32 0v24" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 44V21a10 10 0 0 1 20 0v23" fill="none" stroke="currentColor" strokeWidth="1" opacity=".55" />
        <circle cx="24" cy="27" r="2.6" fill="currentColor" />
        <path d="M24 29.5v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">Maison Kaya</span>
        <span className="logo__sub">Conciergerie</span>
      </span>
    </span>
  );
}
