/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        'theme-color': "#243c5a",
        'theme-light': "#28476d",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
};
