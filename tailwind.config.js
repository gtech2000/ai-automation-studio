/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "layer-1": "rgb(var(--layer-1) / <alpha-value>)",
        "layer-2": "rgb(var(--layer-2) / <alpha-value>)",
        stroke: "rgb(var(--stroke) / <alpha-value>)",
        "accent-1": "rgb(var(--accent-1) / <alpha-value>)",
        "accent-1-bg": "rgb(var(--accent-1-bg) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        grey: "rgb(var(--grey) / <alpha-value>)",
        success: "#1A7F37",
        warning: "#9A6700",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

module.exports = config;
