"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 10);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 12; i++) {
      const geo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      const mat = new THREE.MeshBasicMaterial({ color: 0x00ff9d, wireframe: true, transparent: true, opacity: 0.6 });
      const cube = new THREE.Mesh(geo, mat);
      const angle = (i / 12) * Math.PI * 2;
      cube.position.set(Math.cos(angle) * 3.5, Math.sin(i * 0.5) * 1.5, Math.sin(angle) * 3.5);
      cube.userData = { angle, speed: 0.3 + Math.random() * 0.3, yOff: i * 0.5 };
      group.add(cube);
      cubes.push(cube);
    }

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.4, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ffd5, wireframe: true, transparent: true, opacity: 0.5 })
    );
    group.add(ico);

    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x00ff9d, wireframe: true, transparent: true, opacity: 0.3 })
    );
    group.add(inner);

    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x00ff9d, size: 0.04, transparent: true, opacity: 0.7 })
    );
    scene.add(particles);

    let mouseX = 0,
      mouseY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    let raf: number;
    const loop = () => {
      t += 0.01;
      group.rotation.y += 0.003;
      group.rotation.x += mouseY * 0.02;
      group.rotation.y += mouseX * 0.02;
      ico.rotation.x += 0.005;
      ico.rotation.y += 0.007;
      inner.rotation.x -= 0.008;
      inner.rotation.y -= 0.005;
      cubes.forEach((c) => {
        c.userData.angle += 0.005;
        c.position.x = Math.cos(c.userData.angle) * 3.5;
        c.position.z = Math.sin(c.userData.angle) * 3.5;
        c.position.y = Math.sin(t * c.userData.speed + c.userData.yOff) * 1.5;
        c.rotation.x += 0.02;
        c.rotation.y += 0.015;
      });
      particles.rotation.y += 0.0005;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} id="hero-3d"></canvas>
      <div className="hero-content">
        <div className="hero-tag reveal">◆ Жасыл блокчейн экожүйесі · 2026</div>
        <h1 className="hero-title reveal">
          <span className="word">GREENCHAIN</span>
          <br />
          <span className="accent">MINING</span>
        </h1>
        <p className="hero-subtitle reveal">
          Блокчейн энергиясын азайтатын интеллектуалды экожүйе. Күн, жел және AI бір тізбекте — нөлдік көміртек майнингі.
        </p>
        <div className="hero-buttons reveal">
          <a href="#qalai" className="btn btn-primary">
            Жобаны іске қосу
          </a>
          <a href="#dashboard" className="btn btn-ghost">
            Энергия моделін көру
          </a>
        </div>
        <div className="hero-stats reveal">
          <div className="hero-stat">
            <div className="hero-stat-num" data-count="67">
              0
            </div>
            <div className="hero-stat-label">% Энергия үнемі</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num" data-count="100">
              0
            </div>
            <div className="hero-stat-label">% Жаңартылатын көз</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num" data-count="24">
              0
            </div>
            <div className="hero-stat-label">Сағат AI бақылау</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num" data-count="0">
              0
            </div>
            <div className="hero-stat-label">Көміртек ізі</div>
          </div>
        </div>
      </div>
      <div className="scroll-ind">ТӨМЕНГЕ СЫРҒЫТЫҢЫЗ</div>
    </section>
  );
}
