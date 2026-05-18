"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hidden ? "hide" : ""}`}>
      <div className="loader-logo">GREENCHAIN</div>
      <div className="loader-bar">
        <div className="loader-bar-fill"></div>
      </div>
      <div className="loader-text">Жүйе іске қосылуда...</div>
    </div>
  );
}
