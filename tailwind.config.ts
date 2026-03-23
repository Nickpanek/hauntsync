import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core surfaces — never use pure #000000 (OLED smearing)
        background: "#121212",
        surface: "#1E1E1E",
        "surface-raised": "#2A2A2A",
        // Text
        "text-primary": "rgba(255,255,255,0.87)",
        "text-secondary": "rgba(255,255,255,0.60)",
        // Accents
        accent: "#00FF88",      // electric green — CTA, highlights
        warning: "#FF6B35",     // safety orange — urgency, badges
        danger: "#FF4444",      // error / critical
        // Legacy neon palette kept for compatibility
        "neon-red": "#FF0000",
        "neon-green": "#00FF00",
        "neon-yellow": "#FFFF00",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        "dm-sans": ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        // Legacy aliases
        creepster: ["Creepster", "cursive"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "fog-drift-1": {
          "0%, 100%": { transform: "translateX(0) translateY(0) scale(1)", opacity: "0.04" },
          "33%": { transform: "translateX(60px) translateY(-30px) scale(1.1)", opacity: "0.07" },
          "66%": { transform: "translateX(-40px) translateY(20px) scale(0.95)", opacity: "0.03" },
        },
        "fog-drift-2": {
          "0%, 100%": { transform: "translateX(0) translateY(0) scale(1)", opacity: "0.05" },
          "40%": { transform: "translateX(-80px) translateY(40px) scale(1.15)", opacity: "0.08" },
          "70%": { transform: "translateX(50px) translateY(-20px) scale(0.9)", opacity: "0.03" },
        },
        "fog-drift-3": {
          "0%, 100%": { transform: "translateX(0) translateY(0) scale(1.05)", opacity: "0.06" },
          "50%": { transform: "translateX(30px) translateY(50px) scale(1.2)", opacity: "0.04" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        "fog-1": "fog-drift-1 18s ease-in-out infinite",
        "fog-2": "fog-drift-2 24s ease-in-out infinite",
        "fog-3": "fog-drift-3 30s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
