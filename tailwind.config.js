module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      fontFamily: {
        encode: "'Encode Sans', sans-serif",
        "fira-code": "'Fira Code', monospace",
      },
      colors: {
        sidebar: "#141A28",
        dark: "#282c34",
        light: "#abb2bf",
        heading: "#e6c07b",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("flowbite/plugin"),
  ],
};
