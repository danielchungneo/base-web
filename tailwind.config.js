const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js,jsx,ts,tsx}",
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./providers/**/*.{html,js,jsx,ts,tsx}",
    "./stories/**/*.{html,js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          // "Rubik", // when adding a font in CSS, add the font name here as well so it can be used in Tailwind
          "Inter var",
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
      },

      colors: {
        // pull the colors from CSS variables so we can still do custom CSS later with the theme colors
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        info: "var(--color-info)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        neutral: "var(--color-neutral)",
      },
    },
  },

  plugins: [
    //
    require("@tailwindcss/forms"),
  ],

  safelist: [
    {
      pattern: /bg-(dev|staging|production)/,
    },
    {
      pattern: /text-(dev|staging|production)/,
    },
    {
      pattern: /bg-(primary|secondary|success|info|warning|danger|light|dark)/,
      variants: ["hover", "focus", "active"],
    },
    {
      pattern: /rounded-(.*)/,
    },
  ],
};
