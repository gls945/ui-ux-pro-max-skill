import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Color, Group, Shape, Path, ExtrudeGeometry } from "three";
import { sceneState } from "@/lib/scroll";

function Key({ color, position, rotation }: { color: string; position: [number, number, number]; rotation: [number, number, number] }) {
  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.absarc(0, 0.8, 0.48, 0, Math.PI * 2, false);
    const hole = new Path();
    hole.absarc(0, 0.8, 0.27, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const shaft = new Shape();
    shaft.moveTo(-0.12, 0.5); shaft.lineTo(0.12, 0.5); shaft.lineTo(0.12, -0.55);
    shaft.lineTo(0.4, -0.55); shaft.lineTo(0.4, -0.73); shaft.lineTo(0.12, -0.73);
    shaft.lineTo(0.12, -0.92); shaft.lineTo(0.33, -0.92); shaft.lineTo(0.33, -1.12);
    shaft.lineTo(-0.12, -1.12); shaft.closePath();
    return new ExtrudeGeometry([shape, shaft], { depth: 0.13, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3, curveSegments: 36 });
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} position={position} rotation={rotation}><meshStandardMaterial color={color} metalness={0.82} roughness={0.23} /></mesh>;
}

function Sculpture({ colors, reduced, onReady }: { colors: [string, string, string]; reduced: boolean; onReady: () => void }) {
  const group = useRef<Group>(null);
  const ready = useRef(false);
  const time = useRef(0);
  useFrame((state, delta) => {
    if (!ready.current) { ready.current = true; onReady(); }
    if (!group.current || reduced) return;
    time.current += Math.min(delta, 0.05);
    group.current.rotation.y = Math.sin(time.current * 0.45) * 0.35 + state.pointer.x * 0.2 + (sceneState.delegation - 0.5) * Math.PI * 1.1;
    group.current.rotation.x = Math.sin(time.current * 0.3) * 0.12;
    group.current.position.y = Math.sin(time.current * 0.65) * 0.12;
  });
  return <group ref={group} rotation={[0.08, 0.15, -0.3]}>
    <Key color={colors[0]} position={[-0.38, 0, 0.1]} rotation={[0, 0.15, -0.4]} />
    <Key color={colors[1]} position={[0.38, -0.1, -0.25]} rotation={[0, -0.3, 0.35]} />
    <mesh position={[0, 1.17, 0]} rotation={[0.3, 0, 0]}><torusGeometry args={[0.38, 0.04, 12, 64]} /><meshStandardMaterial color={colors[2]} metalness={0.9} roughness={0.2} /></mesh>
  </group>;
}

export default function KeyScene({ onUnavailable }: { onUnavailable: () => void }) {
  const [palette, setPalette] = useState<[string, string, string] | null>(null);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) { onUnavailable(); return; }
    const style = getComputedStyle(document.documentElement);
    const toRgb = (token: string) => {
      const probe = document.createElement("span");
      probe.style.color = style.getPropertyValue(token); document.body.appendChild(probe);
      const computed = getComputedStyle(probe).color;
      const context = document.createElement("canvas").getContext("2d");
      let result = computed;
      if (context) { context.fillStyle = computed; context.fillRect(0, 0, 1, 1); const data = context.getImageData(0, 0, 1, 1).data; result = new Color((data[0] ?? 0) / 255, (data[1] ?? 0) / 255, (data[2] ?? 0) / 255).convertSRGBToLinear().getStyle(); }
      probe.remove(); return result;
    };
    setPalette([toRgb("--sculpture-metal"), toRgb("--sculpture-rose"), toRgb("--sculpture-light")]);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches); update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [onUnavailable]);
  if (!palette) return null;
  return <div className="h-full w-full" data-scene-ready={ready || undefined}>
    <Canvas camera={{ position: [0, 0.1, 5.2], fov: 40 }} dpr={[1, 1.5]} frameloop={reduced ? "demand" : "always"} gl={{ alpha: true, antialias: true }} fallback={<span>Clés Maison Kaya</span>}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={3} />
      <Environment resolution={64}>
        <Lightformer intensity={3} position={[0, 4, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={2} color={palette[2]} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 6, 1]} />
      </Environment>
      <Sculpture colors={palette} reduced={reduced} onReady={() => setReady(true)} />
    </Canvas>
  </div>;
}