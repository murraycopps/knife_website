/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/routes/**/*.svelte',
  ],
  theme: {
    extend: {
      colors: {
        'light-base': '#e0e6f5',
        'mid-base': '#0834a3',
        'dark-base': '#051A4F',
      }
    },
  },
  plugins: [],
}
