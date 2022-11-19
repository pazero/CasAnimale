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
    },
  },
  plugins: [],
}/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
