/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "../front-office/src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "tipacane": "url('./assets/tipa_con_cane.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
