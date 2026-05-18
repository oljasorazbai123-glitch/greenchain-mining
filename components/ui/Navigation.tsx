"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [time, setTime] = useState("Тірі эфирде");

  useEffect(() => {
    setTime("Тірі эфирде");
  }, []);

  return (
    <nav className="main-nav">
      <div className="logo">
        <div className="logo-mark">
          <span>◆</span>
        </div>
        <span>GREENCHAIN</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#mesele">Мәселе</a>
        </li>
        <li>
          <a href="#qalai">Қалай жұмыс істейді</a>
        </li>
        <li>
          <a href="#dashboard">Дашборд</a>
        </li>
        <li>
          <a href="#farm">3D Ферма</a>
        </li>
        <li>
          <a href="#ai">AI жүйе</a>
        </li>
        <li>
          <a href="#bolashaq">Болашақ</a>
        </li>
      </ul>
      <div className="nav-status">
        <span className="status-dot"></span>
        <span>{time}</span>
      </div>
    </nav>
  );
}
