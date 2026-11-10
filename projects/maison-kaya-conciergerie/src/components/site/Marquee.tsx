/** Bandeau défilant (CSS uniquement), mis en pause au survol. */
export function Marquee({ items, label }: { items: readonly string[]; label: string }) {
  const group = (hidden: boolean) => (
    <div className="mk-marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-12">
          <span className="mk-marquee-item">{item}</span>
          <span className="mk-marquee-dot" />
        </span>
      ))}
    </div>
  );
  return (
    <section className="mk-marquee" aria-label={label} data-no-motion>
      <div className="mk-marquee-track">{group(false)}{group(true)}</div>
    </section>
  );
}
