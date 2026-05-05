/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { "background-position": "-1000px 0" },
          "100%": { "background-position": "1000px 0" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        skillsphere: {
          primary: "#7c3aed",
          "primary-content": "#ffffff",
          secondary: "#ec4899",
          "secondary-content": "#ffffff",
          accent: "#06b6d4",
          "accent-content": "#ffffff",
          neutral: "#1f2937",
          "neutral-content": "#f3f4f6",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          "base-content": "#111827",
          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      {
        skillsphereDark: {
          primary: "#a78bfa",
          "primary-content": "#1e1b4b",
          secondary: "#f472b6",
          "secondary-content": "#500724",
          accent: "#22d3ee",
          "accent-content": "#083344",
          neutral: "#0f172a",
          "neutral-content": "#e5e7eb",
          "base-100": "#0b0b14",
          "base-200": "#111122",
          "base-300": "#1a1a2e",
          "base-content": "#e5e7eb",
          info: "#60a5fa",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
    ],
    darkTheme: "skillsphereDark",
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
