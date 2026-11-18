import * as THREE from "three";

export interface JewellerySceneHandle {
  goTo: (nextIndex: number, direction: number) => void;
  pause: () => void;
  resume: () => void;
  resize: () => void;
  dispose: () => void;
}

export function createJewelleryScene(
  canvas: HTMLCanvasElement,
  initialIndex: number = 0,
  prefersReducedMotion: boolean = false
): JewellerySceneHandle {
  const pixelRatio = Math.min(
    window.devicePixelRatio || 1,
    navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 ? 1.5 : 2
  );

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(pixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 60);
  camera.position.set(0, 0.2, 10.5);
  camera.lookAt(0, 0, 0);

  // Studio lighting environment
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x1a1612);

  const geometriesToDispose: THREE.BufferGeometry[] = [];
  const materialsToDispose: THREE.Material[] = [];

  function pan(
    w: number,
    h: number,
    x: number,
    y: number,
    z: number,
    c: number,
    intensity: number
  ) {
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(c).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    geometriesToDispose.push(geo);
    materialsToDispose.push(mat);

    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    envScene.add(m);
  }

  pan(9, 3, 0, 9, 1, 0xfff2d6, 16);
  pan(3, 9, -9, 2, 3, 0xffffff, 5);
  pan(3, 9, 9, 1, 3, 0xcfe4ff, 5);
  pan(11, 2, 0, -4, 8, 0xffd7a0, 3);
  pan(7, 7, 0, 3, -9, 0xffffff, 4);
  pan(4, 4, -6, -3, -6, 0xff8ac8, 3);
  pan(4, 4, 6, -3, -6, 0x6fd0ff, 3);
  pan(3, 3, 4, 6, 6, 0xffffff, 8);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envTexture = pmremGenerator.fromScene(envScene, 0.02).texture;
  scene.environment = envTexture;

  const keyLight = new THREE.DirectionalLight(0xfff0d0, 1.4);
  keyLight.position.set(0, 6, 4);
  scene.add(keyLight);

  const DS = THREE.DoubleSide;
  const gold = new THREE.MeshStandardMaterial({
    color: 0xf0bd4a,
    metalness: 1,
    roughness: 0.16,
    envMapIntensity: 1.25,
  });
  const dia = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0,
    flatShading: true,
    envMapIntensity: 1.6,
    side: DS,
  });

  const gm = (c: number) =>
    new THREE.MeshStandardMaterial({
      color: c,
      metalness: 0.55,
      roughness: 0.04,
      flatShading: true,
      envMapIntensity: 1.5,
      side: DS,
    });

  const em = gm(0x19c46f);
  const sap = gm(0x1d4ed8);
  const rub = gm(0xd4143a);
  const pearl = new THREE.MeshPhysicalMaterial({
    color: 0xf6f0e6,
    roughness: 0.22,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.2,
  });

  materialsToDispose.push(gold, dia, em, sap, rub, pearl);

  function gem(r: number, m: THREE.Material, seg: number = 12) {
    const p = [
      [0, -0.85],
      [1, 0],
      [1, 0.05],
      [0.6, 0.34],
      [0, 0.34],
    ].map((q) => new THREE.Vector2(q[0] * r, q[1] * r));
    const geo = new THREE.LatheGeometry(p, seg);
    geometriesToDispose.push(geo);
    return new THREE.Mesh(geo, m);
  }

  function fg(
    r: number,
    m: THREE.Material,
    sx: number,
    sy: number,
    seg: number = 12
  ) {
    const g = new THREE.Group();
    const e = gem(r, m, seg);
    e.rotation.x = Math.PI / 2;
    g.add(e);
    g.scale.set(sx, sy, 1);
    return g;
  }

  function tor(r: number, t: number, sx: number, sy: number) {
    const geo = new THREE.TorusGeometry(r, t, 16, 56);
    geometriesToDispose.push(geo);
    const o = new THREE.Mesh(geo, gold);
    o.scale.set(sx, sy, 1);
    return o;
  }

  function ball(r: number, m: THREE.Material) {
    const geo = new THREE.SphereGeometry(r, 24, 24);
    geometriesToDispose.push(geo);
    return new THREE.Mesh(geo, m);
  }

  function at(o: THREE.Object3D, x: number, y: number, z: number = 0) {
    o.position.set(x, y, z);
    return o;
  }

  // Ring
  function createRing() {
    const g = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(1, 0.14, 24, 72);
    geometriesToDispose.push(ringGeo);
    g.add(new THREE.Mesh(ringGeo, gold));

    const cylGeo = new THREE.CylinderGeometry(0.32, 0.12, 0.34, 20);
    geometriesToDispose.push(cylGeo);
    g.add(at(new THREE.Mesh(cylGeo, gold), 0, 1.1));
    g.add(at(gem(0.44, dia, 14), 0, 1.3));

    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      g.add(
        at(
          ball(0.06, gold),
          Math.cos(a) * 0.41,
          1.31,
          Math.sin(a) * 0.41
        )
      );
    }

    [-0.7, -0.42, 0.42, 0.7].forEach((o) => {
      const a = Math.PI / 2 + o;
      const s = gem(0.085, dia, 10);
      s.position.set(Math.cos(a) * 1.07, Math.sin(a) * 1.07, 0);
      s.rotation.z = a - Math.PI / 2;
      g.add(s);
    });

    g.scale.setScalar(1.15);
    return g;
  }

  // Necklace
  function createNecklace() {
    const g = new THREE.Group();
    const Y = (x: number) => 1.35 - 2 * (1 - Math.pow(x / 1.9, 2));
    const xs: number[] = [];
    const L: number[] = [0];
    const n = 17;

    for (let i = 0; i <= 300; i++) {
      const x = -1.9 + (3.8 * i) / 300;
      xs.push(x);
      if (i) {
        L.push(L[i - 1] + Math.hypot(x - xs[i - 1], Y(x) - Y(xs[i - 1])));
      }
    }

    for (let j = 0, k = 0; j < n; j++) {
      const d = (L[300] * (j + 0.5)) / n;
      while (L[k] < d) k++;
      const r = 0.14 + 0.07 * (1 - Math.abs(j - (n - 1) / 2) / (n / 2));
      g.add(at(ball(r, pearl), xs[k], Y(xs[k])));
    }

    g.add(at(tor(0.07, 0.02, 1, 1.3), 0, -0.78));
    g.add(at(fg(0.3, rub, 0.75, 1.2), 0, -1.3));
    g.add(at(tor(0.3, 0.035, 0.75, 1.2), 0, -1.3));
    g.position.y = 0.15;
    return g;
  }

  // Earrings
  function createEar(x: number) {
    const g = new THREE.Group();
    g.add(at(ball(0.11, gold), 0, 1.2));
    g.add(at(fg(0.08, dia, 1, 1, 10), 0, 1.2, 0.1));

    const cylGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    geometriesToDispose.push(cylGeo);
    g.add(at(new THREE.Mesh(cylGeo, gold), 0, 0.78));
    g.add(at(tor(0.07, 0.02, 1, 1.3), 0, 0.45));
    g.add(at(fg(0.45, em, 0.75, 1.45), 0, -0.2));
    g.add(at(tor(0.45, 0.05, 0.75, 1.45), 0, -0.2));
    g.position.x = x;
    return g;
  }

  function createEarringsPair() {
    const g = new THREE.Group();
    g.add(createEar(-1));
    g.add(createEar(1));
    g.scale.setScalar(0.95);
    g.position.y = 0.3;
    return g;
  }

  // Pendant
  function createPendant() {
    const g = new THREE.Group();
    const c = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.5, 1.7, 0),
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(1.5, 1.7, 0)
    );
    const tubeGeo = new THREE.TubeGeometry(c, 50, 0.025, 8);
    geometriesToDispose.push(tubeGeo);
    g.add(new THREE.Mesh(tubeGeo, gold));
    g.add(at(tor(0.08, 0.025, 1, 1.2), 0, 0.95));
    g.add(at(fg(0.6, sap, 0.85, 1.1), 0, 0.0));
    g.add(at(tor(0.6, 0.06, 0.85, 1.1), 0, 0));

    for (let i = 0; i < 14; i++) {
      const a = (i * Math.PI * 2) / 14;
      g.add(
        at(
          fg(0.09, dia, 1, 1, 10),
          Math.cos(a) * 0.78,
          Math.sin(a) * 0.98,
          0
        )
      );
    }
    return g;
  }

  // Bangle
  function createBangle() {
    const g = new THREE.Group();
    const bangGeo = new THREE.TorusGeometry(1.45, 0.17, 24, 96);
    geometriesToDispose.push(bangGeo);
    g.add(new THREE.Mesh(bangGeo, gold));

    for (let i = 0; i < 18; i++) {
      const a = (i * Math.PI * 2) / 18;
      g.add(
        at(
          fg(0.13, dia, 1, 1, 10),
          Math.cos(a) * 1.45,
          Math.sin(a) * 1.45,
          0.19
        )
      );
    }
    return g;
  }

  const pieceSpecs: [THREE.Group, number, number][] = [
    [createRing(), 1, 0.35],
    [createNecklace(), 0, 0],
    [createEarringsPair(), 0, 0],
    [createPendant(), 0, 0],
    [createBangle(), 1, 0.9],
  ];

  let currentIndex = initialIndex;

  const slides = pieceSpecs.map((spec, i) => {
    const w = new THREE.Group();
    const m = new THREE.Group();
    m.add(spec[0]);
    m.rotation.x = spec[2];
    w.add(m);
    scene.add(w);
    const active = i === currentIndex;
    return {
      w,
      m,
      spin: spec[1],
      x: active ? 0 : 3.4,
      s: active ? 1 : 0,
      tx: active ? 0 : 3.4,
      ts: active ? 1 : 0,
    };
  });

  function resize() {
    if (!canvas || !canvas.parentElement) return;
    const w = canvas.clientWidth || 300;
    const h = canvas.clientHeight || 300;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();

  let isPaused = false;
  let animationFrameId: number;

  function render(time: number) {
    if (isPaused) return;

    slides.forEach((o) => {
      o.x += (o.tx - o.x) * 0.09;
      o.s += (o.ts - o.s) * 0.09;
      o.w.position.x = o.x;
      o.w.scale.setScalar(Math.max(o.s, 0.001));
      o.w.visible = o.s > 0.02;

      o.m.rotation.y = prefersReducedMotion
        ? 0.5
        : o.spin
        ? time * 0.0007
        : Math.sin(time * 0.0009) * 0.5;
    });

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);

  return {
    goTo(nextIndex: number, direction: number) {
      const oldSlide = slides[currentIndex];
      oldSlide.tx = -direction * 3.4;
      oldSlide.ts = 0;

      currentIndex = (nextIndex + slides.length) % slides.length;
      const newSlide = slides[currentIndex];
      newSlide.x = direction * 3.4;
      newSlide.s = 0;
      newSlide.tx = 0;
      newSlide.ts = 1;
    },
    pause() {
      isPaused = true;
      cancelAnimationFrame(animationFrameId);
    },
    resume() {
      if (isPaused) {
        isPaused = false;
        animationFrameId = requestAnimationFrame(render);
      }
    },
    resize,
    dispose() {
      isPaused = true;
      cancelAnimationFrame(animationFrameId);
      pmremGenerator.dispose();
      envTexture.dispose();
      renderer.dispose();
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
    },
  };
}
