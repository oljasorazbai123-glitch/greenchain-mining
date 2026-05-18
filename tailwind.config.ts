import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000505",
        "bg-2": "#020f0a",
        neon: "#00ff9d",
        "neon-2": "#00ffd5",
        emerald: "#10b981",
        cyan: "#22d3ee",
      },
      fontFamily: {
        display: ["var(--font-syncopate)", "sans-serif"],
        body: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        neon: "0 0 40px rgba(0,255,157,.4)",
      },
    },
  },
  plugins: [],
};

export default config;
