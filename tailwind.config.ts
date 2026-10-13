import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#121214",
          soft: "#1c1c20",
          muted: "#2a2a30",
        },
        paper: {
          DEFAULT: "#f4f5f7",
          warm: "#ebecef",
        },
        mist: {
          DEFAULT: "#9aa1ad",
          soft: "#c5cad3",
          faint: "#e4e7ec",
        },
        petal: {
          DEFAULT: "#a85466",
          deep: "#8a3f50",
          soft: "#d4a0ab",
          mist: "rgba(168, 84, 102, 0.14)",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "var(--font-manrope)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        rise: "rise 0.7s ease-out both",
        "rise-slow": "rise 1s ease-out both",
        fade: "fade 0.8s ease-out both",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
