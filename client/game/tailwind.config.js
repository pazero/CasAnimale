/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      backgroundImage: {  /** portebbero servire */
        homebg: "url('#')",
        quizbg: "url('quiz.png')",
        hangmanbg: "url('hangman.png')", 
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require("daisyui")],
}