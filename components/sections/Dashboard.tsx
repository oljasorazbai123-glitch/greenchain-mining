"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  { label: "Күн энергиясы", target: 72, trend: "+12%" },
  { label: "Жел энергиясы", target: 43, trend: "+8%" },
  { label: "Батарея деңгейі", target: 91, trend: "+3%" },
  { label: "Майнинг қуаты", target: 86, trend: "оңтайлы" },
  { label: "Үнемделген энергия", target: 68, trend: "+22%" },
  { label: "Көміртек төмендеуі", target: 94, trend: "+15%" },
];

export default function Dashboard() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("UTC+5 · 00:00:00");
  const [animated, setAnimated] = useState(false);
  const [donutVal, setDonutVal] = useState(0);
  const [metricVals, setMetricVals] = useState<number[]>(metrics.map(() => 0));

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setTime(`UTC+5 · ${h}:${m}:${s}`);
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  // Draw chart
  useEffect(() => {
    const c = chartRef.current;
    if (!c) return;
    const draw = () => {
      const w = c.offsetWidth,
        h = c.offsetHeight;
      c.width = w * 2;
      c.height = h * 2;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, w, h);

      const data1: number[] = [],
        data2: number[] = [],
        data3: number[] = [];
      for (let i = 0; i < 24; i++) {
        data1.push(30 + Math.sin(i / 3) * 25 + Math.random() * 15);
        data2.push(20 + Math.cos(i / 4) * 15 + Math.random() * 10);
        data3.push(40 + Math.sin(i / 2.5) * 10 + Math.random() * 8);
      }

      ctx.strokeStyle = "rgba(0,255,157,.05)";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (h / 5) * i);
        ctx.lineTo(w, (h / 5) * i);
        ctx.stroke();
      }

      const drawLine = (data: number[], color: string, fill: boolean) => {
        ctx.beginPath();
        data.forEach((v, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - (v / 80) * h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        if (fill) {
          ctx.lineTo(w, h);
          ctx.lineTo(0, h);
          ctx.closePath();
          const g = ctx.createLinearGradient(0, 0, 0, h);
          g.addColorStop(0, color.replace("1)", ".25)"));
          g.addColorStop(1, color.replace("1)", "0)"));
          ctx.fillStyle = g;
          ctx.fill();
        } else {
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.shadowColor = color;
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      };
      drawLine(data1, "rgba(0,255,157,1)", true);
      drawLine(data1, "rgba(0,255,157,1)", false);
      drawLine(data2, "rgba(34,211,238,1)", true);
      drawLine(data2, "rgba(34,211,238,1)", false);
      drawLine(data3, "rgba(255,255,255,1)", false);
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  // Animate metrics when in view
  useEffect(() => {
    const el = dashboardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animated) {
            setAnimated(true);

            metrics.forEach((m, i) => {
              const start = performance.now();
              const tick = (now: number) => {
                const p = Math.min((now - start) / 2000, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                const v = Math.round(m.target * eased);
                setMetricVals((prev) => {
                  const next = [...prev];
                  next[i] = v;
                  return next;
                });
                if (p < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            });

            const startD = performance.now();
            const tickD = (now: number) => {
              const p = Math.min((now - startD) / 2000, 1);
              setDonutVal(Math.round(87 * (1 - Math.pow(1 - p, 3))));
              if (p < 1) requestAnimationFrame(tickD);
            };
            requestAnimationFrame(tickD);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animated]);

  const donutTotal = 427;
  const donutOffset = donutTotal - (donutTotal * donutVal) / 100;

  return (
    <section id="dashboard">
      <div className="reveal">
        <div className="section-tag">03 · Бақылау орталығы</div>
        <h2 className="section-title">Тірі энергия дашбордты</h2>
        <p className="section-subtitle">
          NASA басқару орталығы сияқты — әр киловатт, әр блок, әр сенсор шынайы уақытта көрсетіледі.
        </p>
      </div>

      <div ref={dashboardRef} className="dashboard reveal">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h3>ENERGY OPERATIONS · KZ-01</h3>
            <span className="live-badge">ТІРІ ДЕРЕКТЕР</span>
          </div>
          <div className="dashboard-time">{time}</div>
        </div>

        <div className="dashboard-grid">
          {metrics.map((m, i) => (
            <div key={i} className="metric">
              <div className="metric-label">{m.label}</div>
              <div className="metric-trend">{m.trend}</div>
              <div className="metric-value">
                {metricVals[i]}
                <span className="metric-unit">%</span>
              </div>
              <div className="metric-progress">
                <div className="metric-progress-fill" style={{ width: animated ? m.target + "%" : "0%" }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-charts">
          <div className="chart-box">
            <div className="chart-header">
              <div className="chart-title">24 САҒАТТЫҚ ЭНЕРГИЯ АҒЫНЫ</div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--neon)" }}></span>Күн
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--cyan)" }}></span>Жел
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "#fff" }}></span>Майнинг
                </div>
              </div>
            </div>
            <canvas ref={chartRef} id="dash-chart"></canvas>
          </div>
          <div className="chart-box">
            <div className="chart-header">
              <div className="chart-title">Жасыл индекс</div>
            </div>
            <div className="donut-wrap">
              <div className="donut">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(0,255,157,.1)" strokeWidth="10" />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="url(#donutGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={donutTotal}
                    strokeDashoffset={donutOffset}
                    style={{ transition: "stroke-dashoffset 0.2s linear" }}
                  />
                  <defs>
                    <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00ff9d" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="donut-text">
                  <div className="donut-val">{donutVal}%</div>
                  <div className="donut-lbl">Жасыл</div>
                </div>
              </div>
              <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, lineHeight: 1.5, maxWidth: 200 }}>
                Барлық тұтынылатын энергияның жасыл көзден алынған үлесі
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
