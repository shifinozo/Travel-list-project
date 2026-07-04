/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0e1015",
          light: "#171a22",
          soft: "#1f2330",
        },
        ivory: "#faf7f0",
        sand: "#f1ead9",
        gold: {
          DEFAULT: "#c9a44c",
          light: "#e6cb85",
          dark: "#9c7c2f",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 45px -15px rgba(0,0,0,0.35)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
}