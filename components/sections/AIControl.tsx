"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "⚡", title: "Энергия бөлу", desc: "Әр секундта қандай көзден қанша алу керектігін есептейді" },
  { icon: "❄", title: "Smart Cooling", desc: "Чиптердің температурасын болжап, алдын ала салқындатады" },
  { icon: "♻", title: "Жылу рекуперациясы", desc: "Артық жылуды теплицаға және үй жылыту жүйесіне бағыттайды" },
  { icon: "📈", title: "Болжамдық оңтайландыру", desc: "Машиналық оқыту арқылы тиімді кестені құрастырады" },
  { icon: "🌦", title: "Ауа-райы болжамы", desc: "72 сағат алға қарап, энергия өндіруді жоспарлайды" },
];

const messages = [
  { t: "14:32:01", ok: true, m: "Күн өндірісі оңтайландырылды: +12.4%" },
  { t: "14:32:08", ok: true, m: "Майнинг қуаты бөлінді: 86%" },
  { t: "14:32:15", ok: true, m: "Жылу рекуперациясы: 95% тиімділік" },
  { t: "14:32:22", warn: true, m: "Жел жылдамдығы өсуде: 7.2 м/с" },
  { t: "14:32:30", ok: true, m: "Батарея зарядталуда: 91%" },
  { t: "14:32:37", ok: true, m: "Көміртек ізі: 0 кг CO₂" },
  { t: "14:32:44", ok: true, m: "72 сағаттық болжам жаңартылды" },
  { t: "14:32:51", ok: true, m: "Хэшрейт: 12.4 TH/s · тұрақты" },
  { t: "14:32:58", ok: true, m: "Smart cooling: 42°C → 38°C" },
];

export default function AIControl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      c.width = c.offsetWidth * 2;
      c.height = c.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const layers = [5, 7, 5, 3];
    const W = c.offsetWidth,
      H = c.offsetHeight;
    const ns: { x: number; y: number; pulse: number }[][] = [];
    layers.forEach((count, li) => {
      const layer: { x: number; y: number; pulse: number }[] = [];
      for (let i = 0; i < count; i++) {
        layer.push({
          x: ((li + 1) * W) / (layers.length + 1),
          y: ((i + 1) * H) / (count + 1),
          pulse: Math.random() * Math.PI * 2,
        });
      }
      ns.push(layer);
    });

    let t = 0;
    let raf: number;
    const loop = () => {
      t += 0.04;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < ns.length - 1; i++) {
        ns[i].forEach((a) => {
          ns[i + 1].forEach((b) => {
            const flow = Math.sin(t + a.y * 0.1 + b.y * 0.05) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(0,255,157,${0.1 + flow * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            const phase = (t * 0.5 + a.y * 0.01) % 1;
            const px = a.x + (b.x - a.x) * phase;
            const py = a.y + (b.y - a.y) * phase;
            ctx.fillStyle = "rgba(0,255,213,.8)";
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fill();
          });
        });
      }
      ns.flat().forEach((n) => {
        n.pulse += 0.05;
        const s = 2.5 + Math.sin(n.pulse) * 1.5;
        ctx.fillStyle = "#00ff9d";
        ctx.shadowColor = "#00ff9d";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, s, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    let mi = 0;
    const addLine = () => {
      const stream = streamRef.current;
      if (!stream) return;
      const m = messages[mi % messages.length];
      const line = document.createElement("div");
      line.className = "ai-line";
      line.innerHTML = `<span class="time">${m.t}</span><span class="${m.warn ? "warn" : "ok"}">${
        m.warn ? "⚠" : "✓"
      }</span> ${m.m}`;
      stream.appendChild(line);
      while (stream.children.length > 8) stream.removeChild(stream.firstChild!);
      mi++;
    };
    addLine();
    const iv = setInterval(addLine, 1800);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="ai">
      <div className="reveal">
        <div className="section-tag">06 · Жасанды интеллект</div>
        <h2 className="section-title">AI басқару орталығы</h2>
        <p className="section-subtitle">
          Нейрондық желі әр сенсорды, әр чипті, әр ваттты бақылайды. Сіз ұйықтап жатқанда — ол есептеп жатыр.
        </p>
      </div>

      <div className="ai-layout">
        <div className="ai-features">
          {features.map((f, i) => (
            <div
              key={i}
              className={`ai-feature reveal ${activeIdx === i ? "active" : ""}`}
              onClick={() => setActiveIdx(i)}
            >
              <div className="ai-feature-row">
                <div className="ai-feature-icon">{f.icon}</div>
                <div>
                  <div className="ai-feature-title">{f.title}</div>
                  <div className="ai-feature-desc">{f.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ai-panel reveal">
          <div className="ai-panel-header">
            <div className="ai-id">NEURAL-CORE · v4.2.1</div>
            <div className="ai-status">БЕЛСЕНДІ</div>
          </div>
          <div className="ai-viz">
            <canvas ref={canvasRef} id="ai-canvas"></canvas>
          </div>
          <div ref={streamRef} className="ai-stream"></div>
        </div>
      </div>
    </section>
  );
}
