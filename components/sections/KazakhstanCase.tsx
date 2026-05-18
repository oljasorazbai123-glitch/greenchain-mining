"use client";

import { useEffect, useRef, useState } from "react";

export default function KazakhstanCase() {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setFilled(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="case">
      <div className="reveal">
        <div className="section-tag">05 · Нақты мысал</div>
        <h2 className="section-title">
          Қазақстандағы
          <br />
          GreenChain моделі
        </h2>
        <p className="section-subtitle">Шымкент маңындағы пилоттық ферма. 1 жылдық эксперимент нәтижелері.</p>
      </div>

      <div className="case-grid">
        <div className="case-card case-before reveal">
          <div className="case-label">— GreenChain-ге дейін</div>
          <div className="case-big">1 500</div>
          <div className="case-unit">kWh / тәулік</div>
          <ul className="case-list">
            <li>Қымбат көмір электр энергиясы</li>
            <li>Орасан жылу шығарылымы</li>
            <li>Атмосфера ластануы</li>
            <li>Айлық төлем — 18 000 USD</li>
            <li>40 тонна CO₂ шығарылым</li>
          </ul>
        </div>
        <div className="case-card case-after reveal">
          <div className="case-label">+ GreenChain-тен кейін</div>
          <div className="case-big">500</div>
          <div className="case-unit">kWh / тәулік</div>
          <ul className="case-list">
            <li>100% күн және жел энергиясы</li>
            <li>AI салқындату жүйесі</li>
            <li>Жылу теплицаны жылытады</li>
            <li>Айлық төлем — 2 100 USD</li>
            <li>0 тонна CO₂ — нөлдік ізі</li>
          </ul>
        </div>
      </div>

      <div ref={ref} className="reduction-bar reveal">
        <div className="reduction-header">
          <div>
            <div className="reduction-title">Энергия тұтынудың азаюы</div>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>1500 → 500 kWh жылдамдықпен</div>
          </div>
          <div className="reduction-pct">67%</div>
        </div>
        <div className="reduction-track">
          <div className="reduction-fill" style={{ width: filled ? "67%" : "0%" }}></div>
        </div>
        <div className="reduction-labels">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </section>
  );
}
