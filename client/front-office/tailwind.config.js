/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "../front-office/src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
