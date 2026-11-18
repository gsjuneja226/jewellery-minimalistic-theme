import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        "warm-white": "#FFFDF9",
        "soft-cream": "#FAF5EC",
        espresso: "#2A1408",
        "brown-text": "#4E3C2A",
        "light-blush": "#F8E9E4",
        blush: "#EAC6BA",
        gold: "#BA9048",
        "antique-gold": "#A9781C",
        "deep-gold": "#8A5F10",
        burgundy: "#5B1626",
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
        gurmukhi: ["var(--font-gurmukhi)", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(42, 20, 8, 0.04)",
        card: "0 4px 20px rgba(186, 144, 72, 0.08)",
        gold: "0 0 20px rgba(169, 120, 28, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
