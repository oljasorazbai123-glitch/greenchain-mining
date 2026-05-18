"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const cards = [
  { num: "— 01", icon: "🏙", title: "Ақылды қалалар", desc: "Майнинг түйіндері қала жылыту жүйесімен біріктіріліп, азаматтарға тегін жылу береді." },
  { num: "— 02", icon: "🤖", title: "Автономды фермалар", desc: "Адамсыз жұмыс істейтін, өзін-өзі жөндейтін ферма дрондар мен робот қолдар." },
  { num: "— 03", icon: "🌿", title: "Жасыл блокчейн", desc: "Әр транзакция — нөлдік көміртек. Әр блок — климатқа қосылған үлес." },
  { num: "— 04", icon: "🧬", title: "AI экожүйелер", desc: "Бірнеше ферма арасындағы энергия айырбасы AI арқылы автоматтанады." },
  { num: "— 05", icon: "🪐", title: "Көміртексіз крипто", desc: "Әлемнің алғашқы 100% таза майнинг стандарты — GreenChain Protocol." },
  { num: "— 06", icon: "🌐", title: "Жаһандық желі", desc: "2030 жылға қарай — 6 құрлықта 200 жасыл түйін, бір протокол астында." },
];

export default function Future() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, c.clientWidth / c.clientHeight, 0.1, 100);
    cam.position.z = 5;
    const r = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true });

    const resize = () => {
      r.setSize(c.clientWidth, c.clientHeight);
      cam.aspect = c.clientWidth / c.clientHeight;
      cam.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00ff9d, wireframe: true, transparent: true, opacity: 0.4 })
    );
    scene.add(earth);

    for (let i = 0; i < 20; i++) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const x = 1.5 * Math.sin(phi) * Math.cos(theta);
      const y = 1.5 * Math.cos(phi);
      const z = 1.5 * Math.sin(phi) * Math.sin(theta);
      const n = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ffd5 })
      );
      n.position.set(x, y, z);
      earth.add(n);
    }

    let raf: number;
    const loop = () => {
      earth.rotation.y += 0.002;
      earth.rotation.x += 0.0005;
      r.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      r.dispose();
    };
  }, []);

  return (
    <section className="future-section" id="bolashaq">
      <div className="future-bg">
        <canvas ref={canvasRef} id="earth-canvas"></canvas>
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="reveal">
          <div className="section-tag">07 · Болашақ</div>
          <h2 className="section-title">
            Жасыл блокчейн
            <br />
            болашағы
          </h2>
          <p className="section-subtitle">
            GreenChain бір ферма емес — жаһандық экожүйе. Біз әр құрлықта жасыл түйіндер құрып жатырмыз.
          </p>
        </div>

        <div className="future-grid">
          {cards.map((c, i) => (
            <div key={i} className="future-card reveal">
              <div className="future-num">{c.num}</div>
              <div className="future-icon">{c.icon}</div>
              <div className="future-title">{c.title}</div>
              <div className="future-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
