/* Studio Shine – scène 3D du hero : ciseaux dorés qui coupent, feuilles et paillettes.
   Dépend de vendor/three.min.js (three.js r149, licence MIT). */
(function () {
  const hero = document.getElementById('hero');
  const canvas = document.getElementById('scene');
  const mirror = hero && hero.querySelector('.mirror');
  if (!hero || !canvas || !window.THREE) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return; } // pas de WebGL : le miroir et son fond restent affichés
  document.documentElement.classList.add('gl');

  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  /* Environnement lumineux (reflets du métal) : une pièce claire avec trois panneaux lumineux */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({ color: 0x8f8a78, side: THREE.BackSide })));
  const panel = (w, h, color, pos, rot) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    m.position.set(...pos); m.rotation.set(...rot); env.add(m);
  };
  panel(10, 10, new THREE.Color(3, 2.9, 2.6), [0, 9.8, 0], [Math.PI / 2, 0, 0]);
  panel(6, 12, new THREE.Color(1.3, 1.9, 1.2), [-9.8, 0, 2], [0, Math.PI / 2, 0]);
  panel(5, 8, new THREE.Color(2.6, 1.9, 1.1), [9.8, 2, 4], [0, -Math.PI / 2, 0]);
  panel(14, 3, new THREE.Color(1.6, 1.6, 1.5), [0, -2, 9.8], [0, Math.PI, 0]);
  scene.environment = pmrem.fromScene(env, 0.035).texture;

  const key = new THREE.DirectionalLight(0xfff1dc, 1.6); key.position.set(4, 6, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(0xd5e6c4, 1.0); rim.position.set(-6, 2, -4); scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  /* ---------- Ciseaux ---------- */
  const steel = new THREE.MeshStandardMaterial({ color: 0xeceae2, metalness: 1, roughness: 0.16 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xc8963f, metalness: 1, roughness: 0.3 });
  const extrude = { depth: 0.06, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 3, curveSegments: 32 };

  function half(sign) {
    const g = new THREE.Group();
    // Lame : tranchant droit sur l'axe, dos courbe du côté opposé à l'anneau
    const s = new THREE.Shape();
    const o = -sign;
    s.moveTo(0, -0.3);
    s.lineTo(0, 2.45);
    s.quadraticCurveTo(o * 0.3, 1.5, o * 0.26, 0.2);
    s.lineTo(o * 0.2, -0.3);
    s.lineTo(0, -0.3);
    const blade = new THREE.Mesh(new THREE.ExtrudeGeometry(s, extrude), steel);
    blade.geometry.translate(0, 0, -0.03);
    g.add(blade);
    // Branche vers l'anneau
    const shank = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.9, 0.08), gold);
    shank.position.set(sign * 0.22, -0.66, 0);
    shank.rotation.z = sign * 0.29;
    g.add(shank);
    // Anneau
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.085, 20, 72), gold);
    ring.position.set(sign * 0.52, -1.46, 0);
    ring.scale.set(1, 0.86, 1);
    g.add(ring);
    g.position.z = sign * 0.05;
    return g;
  }
  const scissors = new THREE.Group();
  const inner = new THREE.Group();
  const A = half(1), B = half(-1);
  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.24, 32), gold);
  screw.rotation.x = Math.PI / 2;
  inner.add(A, B, screw);
  inner.position.y = -0.3;
  scissors.add(inner);
  scene.add(scissors);

  /* ---------- Feuilles ---------- */
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.5);
  leafShape.quadraticCurveTo(0.44, -0.08, 0, 0.55);
  leafShape.quadraticCurveTo(-0.44, -0.08, 0, -0.5);
  const leafGeo = new THREE.ShapeGeometry(leafShape, 14);
  const leafColors = [0x7e8f6c, 0x8c9c7a, 0x55654a, 0xa9b696, 0x6e7f5e];
  const leaves = [];
  for (let i = 0; i < 22; i++) {
    const m = new THREE.Mesh(leafGeo, new THREE.MeshStandardMaterial({ color: leafColors[i % leafColors.length], roughness: 0.75, metalness: 0, envMapIntensity: 0.35, side: THREE.DoubleSide }));
    const sc = 0.35 + Math.random() * 0.55;
    m.scale.setScalar(sc);
    m.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 12, -4 + Math.random() * 6);
    m.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    m.userData = { vx: 0.12 + Math.random() * 0.2, vy: -(0.15 + Math.random() * 0.25), r: [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5], ph: Math.random() * 6 };
    leaves.push(m); scene.add(m);
  }

  /* ---------- Paillettes dorées ---------- */
  const N = 160, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 24; pos[i * 3 + 1] = (Math.random() - 0.5) * 14; pos[i * 3 + 2] = -5 + Math.random() * 8; }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xd9be8c, size: 0.07, transparent: true, opacity: 0.85, depthWrite: false }));
  scene.add(dust);

  /* ---------- Mèches coupées ---------- */
  const strands = [];
  const strandMat = [0x8a6a45, 0xb8925a, 0x5a4330].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5, metalness: 0.2, transparent: true }));
  const tip = new THREE.Vector3();
  function snipStrands() {
    if (strands.length > 24) return;
    inner.localToWorld(tip.set(0, 1.2, 0));
    for (let i = 0; i < 4; i++) {
      const pts = [];
      const len = 0.5 + Math.random() * 0.5;
      for (let k = 0; k < 6; k++) pts.push(new THREE.Vector3(Math.sin(k * 1.3 + i) * 0.06, (k / 5) * len, Math.cos(k + i) * 0.04));
      const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.012 * scissors.scale.x, 5);
      const mat = strandMat[i % 3].clone();
      const m = new THREE.Mesh(geo, mat);
      m.position.copy(tip);
      m.scale.setScalar(scissors.scale.x);
      m.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      m.userData = { v: new THREE.Vector3((Math.random() - 0.5) * 1.2, 0.3 + Math.random() * 0.4, (Math.random() - 0.5) * 0.6), spin: (Math.random() - 0.5) * 4, life: 0 };
      strands.push(m); scene.add(m);
    }
  }

  /* ---------- Placement : les ciseaux devant le miroir ---------- */
  const anchor = new THREE.Vector3();
  let baseScale = 1, viewW = 1, viewH = 1;
  function layout() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    viewH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    viewW = viewH * camera.aspect;
    const hr = hero.getBoundingClientRect(), mr = mirror.getBoundingClientRect();
    // Les ciseaux débordent du coin bas-droit du miroir, sans cacher la photo
    const cx = (mr.right - mr.width * 0.06 - hr.left) / w, cy = (mr.top + mr.height * 0.72 - hr.top) / h;
    anchor.set((cx - 0.5) * viewW, (0.5 - cy) * viewH, 0);
    baseScale = (mr.height / h) * viewH * 0.5 / 4.4;
  }
  layout();
  addEventListener('resize', layout);

  /* ---------- Interaction ---------- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { pointer.tx = e.clientX / innerWidth - 0.5; pointer.ty = e.clientY / innerHeight - 0.5; }, { passive: true });

  let running = !reduced, visible = true, paused = false, last = performance.now(), t = 0, prevPhase = 0;
  const pauseBtn = document.getElementById('pause');
  pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.innerHTML = `<svg><use href="#i-${paused ? 'play' : 'pause'}"/></svg>`;
    pauseBtn.setAttribute('aria-label', paused ? "Relancer l'animation" : "Mettre l'animation en pause");
    if (!paused) { last = performance.now(); loop(); }
  });
  new IntersectionObserver(([en]) => { const was = visible; visible = en.isIntersecting; if (visible && !was) { last = performance.now(); loop(); } }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { last = performance.now(); loop(); } });

  const ease = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  let raf = 0;
  function frame(dt) {
    t += dt;
    // Ouverture lente puis fermeture sèche : un vrai « clac »
    const cycle = 1.9, ph = (t % cycle) / cycle;
    const open = ph < 0.72 ? ease(ph / 0.72) : 1 - Math.pow((ph - 0.72) / 0.28, 2.2);
    const th = 0.03 + 0.36 * Math.max(0, open);
    A.rotation.z = th; B.rotation.z = -th;
    if (prevPhase < 0.97 && ph >= 0.97) snipStrands();
    prevPhase = ph;

    pointer.x += (pointer.tx - pointer.x) * 0.05; pointer.y += (pointer.ty - pointer.y) * 0.05;
    const hr = hero.getBoundingClientRect();
    const sp = Math.min(Math.max(-hr.top / hr.height, 0), 1);
    scissors.scale.setScalar(baseScale);
    scissors.position.set(anchor.x + pointer.x * 0.4, anchor.y + Math.sin(t * 0.9) * 0.12 + sp * viewH * 0.25, anchor.z);
    scissors.rotation.set(0.15 + pointer.y * 0.35, Math.sin(t * 0.45) * 0.55 + pointer.x * 0.6 + sp * 2.4, -0.62 + Math.sin(t * 0.3) * 0.06);

    for (const m of leaves) {
      const u = m.userData;
      m.position.x += u.vx * dt; m.position.y += u.vy * dt + Math.sin(t + u.ph) * 0.003;
      m.rotation.x += u.r[0] * dt; m.rotation.y += u.r[1] * dt; m.rotation.z += u.r[2] * dt * 0.5;
      if (m.position.y < -viewH * 0.7) m.position.y = viewH * 0.7;
      if (m.position.x > viewW * 0.7) m.position.x = -viewW * 0.7;
    }
    const p = dustGeo.attributes.position.array;
    for (let i = 0; i < N; i++) { p[i * 3 + 1] += dt * 0.12; if (p[i * 3 + 1] > 7) p[i * 3 + 1] = -7; }
    dustGeo.attributes.position.needsUpdate = true;
    dust.material.opacity = 0.65 + Math.sin(t * 2) * 0.2;

    for (let i = strands.length - 1; i >= 0; i--) {
      const m = strands[i], u = m.userData;
      u.life += dt; u.v.y -= 1.6 * dt;
      m.position.addScaledVector(u.v, dt * baseScale);
      m.rotation.z += u.spin * dt; m.rotation.x += u.spin * 0.5 * dt;
      m.material.opacity = Math.max(0, 1 - u.life / 2.2);
      if (u.life > 2.2) { scene.remove(m); m.geometry.dispose(); m.material.dispose(); strands.splice(i, 1); }
    }
    renderer.render(scene, camera);
  }
  function loop() {
    cancelAnimationFrame(raf);
    if (!running || paused || !visible || document.hidden) return;
    raf = requestAnimationFrame(now => { frame(Math.min((now - last) / 1000, 0.05)); last = now; loop(); });
  }
  frame(0.6); // première image fixe (aussi pour reduced-motion)
  if (running) loop();
  window.__studioShineFrame = frame; // utilisé pour les captures de test
})();
