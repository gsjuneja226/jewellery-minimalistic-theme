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
      padding: "1rem",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#222222",
        "alukas-dark": "#1E1E1E",
        "alukas-muted": "#666666",
        "alukas-subtle": "#888888",
        "alukas-border": "#E5E5E5",
        "alukas-bg": "#F8F8F8",
        "alukas-review": "#F5F1ED",
        "alukas-lavender": "#FAF0F8",
        "alukas-orange": "#FF782C",
        "alukas-red": "#F03333",
        "alukas-star": "#FF6B6B",
        gold: "#BA9048",
        "antique-gold": "#A9781C",
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "Jost", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.05)",
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        dropdown: "0 10px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
