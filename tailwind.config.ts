import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pine: {
          950: "#06110f",
          900: "#0a1a16",
          850: "#0d221d",
          800: "#12302a",
          700: "#184038",
          600: "#1f5349",
          500: "#2a6b5e",
          400: "#4d8a7c",
          300: "#7aada1",
          200: "#b4d0c8",
          100: "#dceae6",
        },
        lime: {
          DEFAULT: "#c8f542",
          dim: "#9ccc2e",
          ink: "#1a2a05",
        },
        paper: "#f3f6f3",
        ink: "#0c1916",
      },
      fontFamily: {
        display: ["var(--font-syne)", "var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-outfit)", "var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        sheet: "0 24px 80px -24px rgba(0, 0, 0, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
