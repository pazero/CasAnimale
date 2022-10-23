/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      backgroundImage: {  /** portebbero servire */
        homebg: "url('#')",
        quizbg: "url('quiz.png')",
        hangmanbg: "url('hangman.png')", 
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
