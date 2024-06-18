/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "10px",
        xs: "12px",
        sm: "13px",
        base: "14px",
        lg: "16px",
        xl: "18px",
        "2xl": "22px",
        "3xl": "30px",
      },
      colors: {
        typ: {
          accent: "hsl(var(--accentHsl) / <alpha-value>)",
          c1: "hsl(var(--c1Hsl) / <alpha-value>)",
          c2: "hsl(var(--c2Hsl) / <alpha-value>)",
          c3: "hsl(var(--c3Hsl) / <alpha-value>)",
          c4: "hsl(var(--c4Hsl) / <alpha-value>)",
          c5: "hsl(var(--c5Hsl) / <alpha-value>)",
          c6: "hsl(var(--c6Hsl) / <alpha-value>)",
          c7: "hsl(var(--c7Hsl) / <alpha-value>)",
          bg0: "hsl(var(--bg0Hsl) / <alpha-value>)",
          bg1: "hsl(var(--bg1Hsl) / <alpha-value>)",
          bg2: "hsl(var(--bg2Hsl) / <alpha-value>)",
          bg3: "hsl(var(--bg3Hsl) / <alpha-value>)",
          bg4: "hsl(var(--bg4Hsl) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
