/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '150':'500px',
        '200':'650px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}