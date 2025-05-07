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
        "base": {
          DEFAULT: "#051A4F",
          50: "#E7EDFD",
          100: "#CFDCFC",
          200: "#9AB5F9",
          300: "#6A92F6",
          400: "#366BF2",
          500: "#0F4CE6",
          600: "#0B3AB1",
          700: "#082B82",
          750: "#072369",
          800: "#051A4F", // default
          900: "#020D26",
          950: "#010613",
        },
        "oglala": {
          DEFAULT: "#A50021",
          50: "#FFDBE2",
          100: "#FFB8C6",
          200: "#FF7591",
          300: "#FF2E58",
          400: "#EB002F",
          500: "#A50021",
          600: "#85001B",
          700: "#610013",
          800: "#42000D",
          900: "#1F0006",
          950: "#0F0003"
        }
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
      },
      spacing: {
        "1/5": "20%",
      }

    },
  },
  plugins: [],
}
