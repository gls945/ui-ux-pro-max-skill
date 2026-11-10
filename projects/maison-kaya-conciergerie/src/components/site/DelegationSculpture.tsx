import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";

const KeyScene = lazy(() => import("./KeyScene"));

export function DelegationSculpture({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { rootMargin: "150px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`delegation-sculpture ${className}`} aria-label="Clés Maison Kaya en trois dimensions">
    {failed ? <KeyRound className="sculpture-fallback" aria-hidden="true" /> : <ClientOnly fallback={null}>
      {visible && <Suspense fallback={<KeyRound className="sculpture-fallback" aria-hidden="true" />}><KeyScene onUnavailable={() => setFailed(true)} /></Suspense>}
    </ClientOnly>}
  </div>;
}