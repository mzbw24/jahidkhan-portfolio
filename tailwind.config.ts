import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        tint: "hsl(var(--tint) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        navy: {
          DEFAULT: "hsl(var(--navy) / <alpha-value>)",
          soft: "hsl(var(--navy-soft) / <alpha-value>)",
          foreground: "hsl(var(--navy-foreground) / <alpha-value>)",
        },
        gold: "hsl(var(--gold) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-bengali)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", "var(--font-bengali)", "Georgia", "serif"],
        script: ["var(--font-script)", "var(--font-bengali)", "cursive"],
      },
      boxShadow: {
        card: "0 1px 2px hsl(var(--shadow) / 0.06), 0 8px 24px -12px hsl(var(--shadow) / 0.18)",
        lift: "0 2px 4px hsl(var(--shadow) / 0.08), 0 18px 36px -16px hsl(var(--shadow) / 0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
