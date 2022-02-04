const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      ipx: "375px",
      ip12: "390px",
      ...defaultTheme.screens,
    },
    extend: {
      spacing: {
        14: "3.5rem",
        18: "4.5rem",
        19: "4.75rem",
        22: "5.5rem",
        56: "14rem",
        58: "14.5rem",
        62: "15.5rem",
        66: "16.5rem",
        68: "17rem",
        70: "17.5rem",
        74: "18.5rem",
        76: "19rem",
        78: "19.5rem",
        82: "20.5rem",
        84: "21rem",
        86: "21.5rem",
        88: "22.0rem",
        90: "22.5rem",
        92: "23rem",
        94: "23.5rem",
        128: "32rem",
      },
      colors: {
        brand: "#0097dd",
        brandLight: "#11a7ec",
        dark: "#384146",
        mid: "#8d9aa1",
        light: "#c6ccd0",
        xlight: "#e9f1f4",
        xxlight: "#f7f9fa",
        xxxlight: "#f7f9fa",
      },
      fontFamily: {
        display: ['"poppins"', "sans-serif"],
        body: ['"poppins"', "sans-serif"],
      },
      container: {
        padding: {
          DEFAULT: "1.3rem",
          sm: "2rem",
          lg: "3rem",
        },
      },
    },
  },
  plugins: [],
};
