module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif;"
      }
    },
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}
