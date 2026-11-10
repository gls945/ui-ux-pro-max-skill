import { useEffect, useState } from "react";

export function SiteEntrance() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    const timeout = window.setTimeout(() => setVisible(false), 2000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-entrance" aria-hidden="true">
      <div className="entrance-panel entrance-panel-left" />
      <div className="entrance-panel entrance-panel-right" />
      <div className="entrance-signature">Maison <em>Kaya</em></div>
    </div>
  );
}