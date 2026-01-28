/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#154835',
        secondary: '#BDF6C3',
        tertiary: '#1FAB77',
      },
    },
  },
  plugins: [],
}