/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3a86ff',
        secondary: '#8338ec',
        success: '#06d6a0',
        warning: '#ffd166',
        danger: '#ef476f',
      },
      fontFamily: {
        arabic: ['"Segoe UI"', 'Tahoma', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}