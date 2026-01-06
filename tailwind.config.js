/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        "outfit-medium": ["OutfitMedium", "sans-serif"],
        "outfit-bold": ["OutfitBold", "sans-serif"],
      },

      colors: {
        primary: {
          100: "#3F401B",
          200: "#969841",
          300: "#63642A",
          400: "#4a4b20",
          500: "#E8E8E80D",
          600: "#555625",
        },
        accent: {
          100: "#D1D1D1",
          200: "#8C8C8C",
        },
        green: {
          100: "#21D1841A",
          200: "#21D184",
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31",
        },
        error: "#D20202",
        white: "#FFFFFF",
        yellow: "#FBCD58",
      },
    },
  },
  plugins: [],
};
