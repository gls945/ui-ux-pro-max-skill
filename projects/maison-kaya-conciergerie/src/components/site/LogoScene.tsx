import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { ExtrudeGeometry, Group, Box3, Vector3 } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { LOGO_MK_PATH, LOGO_MK_VIEWBOX } from "@/lib/logo-mk-path";

/** Logo Maison Kaya extrudé en relief, à partir de son tracé vectoriel. */
function useLogoGeometry() {
  const geometry = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_MK_VIEWBOX.width} ${LOGO_MK_VIEWBOX.height}"><path fill="#000" fill-rule="evenodd" d="${LOGO_MK_PATH}"/></svg>`;
    const data = new SVGLoader().parse(svg);
    const shapes = data.paths.flatMap((path) => SVGLoader.createShapes(path));
    const geo = new ExtrudeGeometry(shapes, {
      depth: 26,
      bevelEnabled: true,
      // Biseau fin : un biseau large épaissit les petites lettres de la couronne et les rend floues.
      bevelThickness: 2.5,
      bevelSize: 0.6,
      bevelSegments: 2,
      curveSegments: 24,
    });
    // Le SVG a l'axe Y vers le bas : on retourne, puis on centre.
    geo.scale(1, -1, 1);
    geo.computeBoundingBox();
    const center = new Box3().copy(geo.boundingBox!).getCenter(new Vector3());
    geo.translate(-center.x, -center.y, -center.z);
    const s = 3.2 / LOGO_MK_VIEWBOX.width;
    geo.scale(s, s, s);
    geo.computeVertexNormals();
    return geo;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

function Logo({ reduced, onReady }: { reduced: boolean; onReady: () => void }) {
  const group = useRef<Group>(null);
  const ready = useRef(false);
  const time = useRef(0);
  const geometry = useLogoGeometry();
  useFrame((state, delta) => {
    if (!ready.current) { ready.current = true; onReady(); }
    if (!group.current || reduced) return;
    time.current += Math.min(delta, 0.05);
    const t = time.current;
    // Léger balancement + le logo suit doucement le pointeur.
    const ty = Math.sin(t * 0.5) * 0.2 + state.pointer.x * 0.25;
    const tx = Math.sin(t * 0.37) * 0.06 - state.pointer.y * 0.14;
    group.current.rotation.y += (ty - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.06;
    group.current.position.y = Math.sin(t * 0.8) * 0.06;
  });
  return (
    <group ref={group}>
      {/* Face avant mate et claire (lisible), côtés satinés plus sombres (relief net). */}
      <mesh geometry={geometry}>
        <meshStandardMaterial attach="material-0" color="#fbf8f1" metalness={0.15} roughness={0.55} envMapIntensity={0.9} />
        <meshStandardMaterial attach="material-1" color="#b9ad9b" metalness={0.7} roughness={0.3} envMapIntensity={1.2} />
      </mesh>
    </group>
  );
}

export default function LogoScene({ onUnavailable }: { onUnavailable: () => void }) {
  const [reduced, setReduced] = useState(false);
  const [checked, setChecked] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) { onUnavailable(); return; }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    setChecked(true);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [onUnavailable]);
  if (!checked) return null;
  return (
    <div className="h-full w-full" data-scene-ready={ready || undefined}>
      <Canvas camera={{ position: [0, 0, 5.4], fov: 38 }} dpr={[1, 2]} frameloop={reduced ? "demand" : "always"} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-3, 4, 5]} intensity={2.4} />
        <directionalLight position={[4, -2, 3]} intensity={0.8} color="#d8c6ad" />
        <Environment resolution={64}>
          <Lightformer intensity={2.5} position={[0, 4, 3]} scale={[8, 4, 1]} />
          <Lightformer intensity={1.2} color="#d8c6ad" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 6, 1]} />
          <Lightformer intensity={0.8} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[6, 6, 1]} />
        </Environment>
        <Logo reduced={reduced} onReady={() => setReady(true)} />
      </Canvas>
    </div>
  );
}
