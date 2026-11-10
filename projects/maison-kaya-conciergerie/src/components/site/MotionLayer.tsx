import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { initScroll } from "@/lib/scroll";

/**
 * Lance le moteur de défilement une fois la page hydratée, puis à chaque changement de page.
 * Aucun rideau entre deux pages : le site reste rapide.
 */
export function MotionLayer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const status = useRouterState({ select: (s) => s.status });

  useEffect(() => {
    if (status !== "idle") return;
    let cleanup = () => {};
    const timer = window.setTimeout(() => { cleanup = initScroll(); }, 80);
    const media = window.matchMedia("(min-width: 768px)");
    const reboot = () => { cleanup(); cleanup = initScroll(); };
    media.addEventListener("change", reboot);
    return () => { window.clearTimeout(timer); media.removeEventListener("change", reboot); cleanup(); };
  }, [pathname, status]);

  return null;
}
