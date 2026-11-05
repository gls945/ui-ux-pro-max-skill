"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { images } from "@/content/site";
import Scene3D from "./Scene3D";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    ref.current.style.setProperty("--hx", x.toFixed(3));
    ref.current.style.setProperty("--hy", y.toFixed(3));
  };
  return (
    <section ref={ref} className="hero" onPointerMove={onMove} aria-labelledby="hero-title">
      <div className="hero__media" data-parallax="-0.15">
        <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="hero__img" />
        <div className="hero__shade" />
      </div>
      <div className="hero__arch" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow eyebrow--light hero__fade" style={{ ["--d" as string]: "0ms" }}>
            Conciergerie location courte durée · Val-de-Marne
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line" style={{ ["--d" as string]: "80ms" }}>Votre logement mérite</span>{" "}
            <span className="hero__line" style={{ ["--d" as string]: "200ms" }}>
              <em>une attention particulière.</em>
            </span>
          </h1>
          <p className="hero__sub hero__fade" style={{ ["--d" as string]: "380ms" }}>
            Maison Kaya Conciergerie accompagne les propriétaires dans la gestion de leur location courte durée, avec un service
            personnalisé au cœur du Val-de-Marne.
          </p>
          <div className="btn-row hero__fade" style={{ ["--d" as string]: "520ms" }}>
            <Link href="/contact#formulaire" className="btn btn--light btn--lg">
              Confier mon logement
            </Link>
            <Link href="/services" className="btn btn--outline-light btn--lg">
              Découvrir nos services
            </Link>
          </div>
        </div>
        <Scene3D variant="key" className="hero__key" />
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span />
        Défiler
      </div>
      <span className="hero__tag">Photo d&apos;illustration</span>
    </section>
  );
}
