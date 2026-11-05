import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** Métal encre / anthracite satiné — reprend l'encre du logo Maison Kaya. */
export function inkMaterial() {
  return new THREE.MeshStandardMaterial({ color: 0x2a2926, metalness: 0.85, roughness: 0.32 });
}
/** Nickel ivoire satiné — reprend le fond ivoire du logo (pour les fonds sombres). */
export function ivoryMetalMaterial() {
  return new THREE.MeshStandardMaterial({ color: 0xf1eee6, metalness: 1, roughness: 0.26 });
}
/** @deprecated conservé pour compatibilité */
export const brassMaterial = inkMaterial;

/** Renderer + environnement de lumière doux (reflets réalistes sur le métal). */
export function createRenderer(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return { renderer, env };
}

/**
 * Clé ancienne modélisée en primitives.
 * Axe de la tige = +X ; l'anneau (anneau ornemental) est à gauche, le panneton à droite.
 * Renvoie un groupe dont l'origine est au centre de la tige.
 */
export function createKey(material = inkMaterial()) {
  const key = new THREE.Group();

  // Anneau (tête) avec motif intérieur en quadrilobe
  const bow = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.11, 32, 96), material);
  bow.position.x = -1.35;
  key.add(bow);
  for (let i = 0; i < 4; i++) {
    const petal = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 16, 48), material);
    const a = (i * Math.PI) / 2;
    petal.position.set(-1.35 + Math.cos(a) * 0.2, Math.sin(a) * 0.2, 0);
    key.add(petal);
  }
  const center = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), material);
  center.position.x = -1.35;
  key.add(center);

  // Collier
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.22, 32), material);
  collar.rotation.z = Math.PI / 2;
  collar.position.x = -0.68;
  key.add(collar);
  const collar2 = collar.clone();
  collar2.scale.set(0.8, 0.5, 0.8);
  collar2.position.x = -0.45;
  key.add(collar2);

  // Tige
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 2.1, 32), material);
  shaft.rotation.z = Math.PI / 2;
  shaft.position.x = 0.6;
  key.add(shaft);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 24), material);
  tip.position.x = 1.65;
  key.add(tip);

  // Panneton (dents)
  const bit = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.08), material);
  bit.position.set(1.32, -0.25, 0);
  key.add(bit);
  [1.15, 1.32, 1.5].forEach((x, i) => {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.16 + (i % 2) * 0.1, 0.08), material);
    tooth.position.set(x, -0.5 - (i % 2) * 0.05, 0);
    key.add(tooth);
  });

  return key;
}

/** Sculpture architecturale abstraite : arches, sphères et dalles aux tons sable. */
export function createSculpture() {
  const g = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0xf7f5ef, roughness: 0.85, metalness: 0 });
  const sand = new THREE.MeshStandardMaterial({ color: 0xe4ded3, roughness: 0.9 });
  const taupe = new THREE.MeshStandardMaterial({ color: 0x2a2926, roughness: 0.35, metalness: 0.2 });
  const brass = inkMaterial();

  // Arche (porte stylisée)
  const archShape = new THREE.Shape();
  archShape.moveTo(-1, -1.6);
  archShape.lineTo(-1, 0.4);
  archShape.absarc(0, 0.4, 1, Math.PI, 0, true);
  archShape.lineTo(1, -1.6);
  archShape.lineTo(-1, -1.6);
  const hole = new THREE.Path();
  hole.moveTo(-0.62, -1.6);
  hole.lineTo(-0.62, 0.4);
  hole.absarc(0, 0.4, 0.62, Math.PI, 0, true);
  hole.lineTo(0.62, -1.6);
  archShape.holes.push(hole);
  const arch = new THREE.Mesh(
    new THREE.ExtrudeGeometry(archShape, { depth: 0.35, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3, curveSegments: 48 }),
    stone,
  );
  arch.position.set(0, 0.1, -0.2);
  g.add(arch);

  const slab = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 1.4), sand);
  slab.position.y = -1.6;
  g.add(slab);

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), taupe);
  sphere.position.set(1.55, -1.08, 0.3);
  g.add(sphere);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.05, 24, 80), brass);
  ring.position.set(-1.45, -0.6, 0.4);
  g.add(ring);

  const small = new THREE.Mesh(new THREE.SphereGeometry(0.16, 48, 48), brass);
  small.position.set(0, 0.25, 0.25);
  g.add(small);

  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.9, 48), sand);
  cyl.position.set(-1.35, -1.06, -0.2);
  g.add(cyl);

  return { group: g, ring, small, sphere };
}

export function disposeScene(scene: THREE.Object3D) {
  scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) m.geometry.dispose();
    const mat = m.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
    else mat?.dispose();
  });
}

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
