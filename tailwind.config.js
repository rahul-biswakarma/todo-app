/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        "bg-2": "#f2f2f2",
        "text-1": "#282c3a",
        "text-2": "#bebcc1",
        "light-cyan": "#c8f1f1",
        "icons-color-1": "#727276",
        "icons-color-2": "#0e0e19",
        "border-color": "#f0f0f0",
      },
      backgroundImage: {
        "graph-pattern": "url('/assets/images/bg-pattern.svg')",
      },
    },
    spacing: {
      "d-pad": "1.5rem",
      "main-pad": "1rem",
      "nav-pad": "1rem 2rem",
    },
  },
  plugins: [],
};
