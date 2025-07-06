/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./src/**/*.{js,ts,jsx,tsx}", // if you also have src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
