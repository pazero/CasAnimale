/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "../front-office/src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        tipacane: "url('./assets/tipa_con_cane.jpg')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFFFFF",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
