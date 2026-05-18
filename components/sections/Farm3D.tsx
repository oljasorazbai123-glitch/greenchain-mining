"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const views = {
  full: { x: 15, y: 12, z: 15, target: [0, 0, 0] as [number, number, number] },
  solar: { x: -6, y: 6, z: 8, target: [-7, 1, 0] as [number, number, number] },
  wind: { x: 14, y: 8, z: 8, target: [8, 3, 0] as [number, number, number] },
  mining: { x: 2, y: 4, z: 11, target: [0, 1, 5] as [number, number, number] },
};

type ViewKey = keyof typeof views;

export default function Farm3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<ViewKey>("full");
  const [activeView, setActiveView] = useState<ViewKey>("full");

  useEffect(() => {
    viewRef.current = activeView;
  }, [activeView]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000505, 15, 50);
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 200);
    camera.position.set(15, 12, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";

    const grid = new THREE.GridHelper(40, 40, 0x00ff9d, 0x003322);
    (grid.material as THREE.Material).opacity = 0.3;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);
    scene.add(new THREE.AmbientLight(0x224433, 1));

    // Solar panels
    for (let x = -3; x <= 3; x += 2) {
      for (let z = -3; z <= 3; z += 2) {
        const panelGeo = new THREE.BoxGeometry(1.5, 0.1, 1);
        const panel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ color: 0x0066aa }));
        panel.position.set(x * 1.2 - 8, 1, z * 1.2);
        panel.rotation.x = -0.3;
        const edges = new THREE.EdgesGeometry(panelGeo);
        panel.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ffd5 })));
        const pole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 1),
          new THREE.MeshBasicMaterial({ color: 0x334444 })
        );
        pole.position.set(x * 1.2 - 8, 0.5, z * 1.2);
        scene.add(panel, pole);
      }
    }

    // Wind turbines
    const turbines: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const t = new THREE.Group();
      const tower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.15, 5),
        new THREE.MeshBasicMaterial({ color: 0xddffee })
      );
      tower.position.y = 2.5;
      t.add(tower);
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0x00ff9d }));
      hub.position.y = 5;
      t.add(hub);
      const blades = new THREE.Group();
      for (let b = 0; b < 3; b++) {
        const blade = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 2.2, 0.3),
          new THREE.MeshBasicMaterial({ color: 0xeeffee })
        );
        blade.position.y = 1.1;
        const wrap = new THREE.Group();
        wrap.add(blade);
        wrap.rotation.z = (b / 3) * Math.PI * 2;
        blades.add(wrap);
      }
      blades.position.y = 5;
      t.add(blades);
      t.position.set(8, 0, (i - 1) * 4);
      scene.add(t);
      turbines.push(blades);
    }

    // Mining containers
    const containers: { mesh: THREE.Group; core: THREE.Mesh }[] = [];
    for (let i = 0; i < 4; i++) {
      const c = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1.2, 1.2),
        new THREE.MeshBasicMaterial({ color: 0x0a1410 })
      );
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(body.geometry),
        new THREE.LineBasicMaterial({ color: 0x00ff9d })
      );
      c.add(body, edges);
      const core = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.4, 0.6),
        new THREE.MeshBasicMaterial({ color: 0x00ff9d })
      );
      core.position.x = 0.8;
      c.add(core);
      c.position.set(-2 + i * 1.4, 0.6, 5);
      scene.add(c);
      containers.push({ mesh: c, core });
    }

    // Floating crypto cubes
    const cryptos: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshBasicMaterial({ color: 0x00ffd5, wireframe: true })
      );
      cube.position.set((Math.random() - 0.5) * 15, 3 + Math.random() * 4, (Math.random() - 0.5) * 15);
      cube.userData = { baseY: cube.position.y, off: Math.random() * Math.PI * 2 };
      scene.add(cube);
      cryptos.push(cube);
    }

    // Energy waves
    const waveGeo = new THREE.RingGeometry(0.1, 0.15, 32);
    const waves: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const wv = new THREE.Mesh(
        waveGeo,
        new THREE.MeshBasicMaterial({ color: 0x00ff9d, transparent: true, opacity: 0.6, side: THREE.DoubleSide })
      );
      wv.rotation.x = -Math.PI / 2;
      wv.position.y = 0.05;
      wv.userData = { r: 0, delay: i * 1.5 };
      scene.add(wv);
      waves.push(wv);
    }

    let mx = 0,
      my = 0;
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener("mousemove", onMove);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let time = 0;
    let raf: number;
    const loop = () => {
      time += 0.016;
      const v = views[viewRef.current];
      const baseAngle = time * 0.1;
      const targetX = v.x + Math.cos(baseAngle) * 2 + mx * 2;
      const targetZ = v.z + Math.sin(baseAngle) * 2;
      const targetY = v.y + my * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.position.z += (targetZ - camera.position.z) * 0.04;
      camera.lookAt(v.target[0], v.target[1], v.target[2]);

      turbines.forEach((t) => (t.rotation.y += 0.05));
      cryptos.forEach((c) => {
        c.position.y = c.userData.baseY + Math.sin(time * 1.5 + c.userData.off) * 0.4;
        c.rotation.x += 0.02;
        c.rotation.y += 0.03;
      });
      containers.forEach((c, i) => {
        c.core.scale.setScalar(1 + Math.sin(time * 3 + i) * 0.3);
      });
      waves.forEach((wv) => {
        wv.userData.r += 0.08;
        if (wv.userData.r > 8) wv.userData.r = 0;
        wv.scale.set(wv.userData.r, wv.userData.r, 1);
        (wv.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - wv.userData.r / 10);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      container.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="farm-section" id="farm">
      <div className="reveal">
        <div className="section-tag">04 · Виртуалды тур</div>
        <h2 className="section-title">3D Майнинг фермасы</h2>
        <p className="section-subtitle">
          Тінтуірмен бұраңыз. Күн панельдері, жел турбиналары, майнинг контейнерлері — бәрі бір экожүйеде.
        </p>
      </div>

      <div ref={containerRef} id="farm-3d" className="reveal">
        <div className="farm-overlay">
          <div className="farm-info">
            <div className="farm-info-label">FARM ID</div>
            <div className="farm-info-val">KZ-SHYMKENT-01</div>
          </div>
          <div className="farm-controls">
            {(["full", "solar", "wind", "mining"] as ViewKey[]).map((v) => (
              <button
                key={v}
                className={`farm-ctrl ${activeView === v ? "active" : ""}`}
                onClick={() => setActiveView(v)}
              >
                {v === "full" ? "Жалпы" : v === "solar" ? "Күн" : v === "wind" ? "Жел" : "Майнинг"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
