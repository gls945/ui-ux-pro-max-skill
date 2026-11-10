import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { initMotion, playPageTransition } from "@/lib/motion";

/**
 * Relance la couche d'animations à chaque page, avec un rideau entre deux pages.
 * Les animations modifient le DOM (découpage des titres) : elles ne démarrent
 * qu'une fois la page hydratée par React, sinon React détecterait un écart
 * avec le HTML du serveur et reconstruirait la page.
 */
export function MotionLayer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const status = useRouterState({ select: (s) => s.status });
  const first = useRef(true);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (status !== "idle") return;
    if (lastPath.current !== null && lastPath.current !== pathname) playPageTransition();
    lastPath.current = pathname;

    let cleanup = () => {};
    let timer = 0;
    let mo: MutationObserver | null = null;
    const start = () => {
      cleanup();
      cleanup = initMotion(document);
    };
    const boot = () => {
      // Premier chargement : laisse le temps aux routes chargées à la demande de s'hydrater.
      timer = window.setTimeout(() => {
        start();
        // Si React remplace le contenu (nouvelle page, contenu chargé plus tard), on relance.
        const main = document.querySelector("main");
        if (main) {
          mo = new MutationObserver((records) => {
            const fresh = records.some((r) => [...r.addedNodes].some((n) => n instanceof HTMLElement && !n.closest(".mk-split") && n.querySelector?.("h1, h2, p")));
            if (fresh) { window.clearTimeout(timer); timer = window.setTimeout(start, 120); }
          });
          mo.observe(main, { childList: true, subtree: true });
        }
      }, first.current ? 450 : 60);
      first.current = false;
    };
    if (document.readyState === "complete") boot();
    else window.addEventListener("load", boot, { once: true });

    return () => {
      window.removeEventListener("load", boot);
      window.clearTimeout(timer);
      mo?.disconnect();
      cleanup();
    };
  }, [pathname, status]);

  return null;
}
