/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "../front-office/src/**/*.{html,js}"],
  theme: {
    spacing: {
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
    },

    extend: {
      backgroundImage: {
        tipacane: "url('./assets/tipa_con_cane.jpg')",
        registerbg: "url('register-bg.jpg')",
        loginbg: "url('login-bg.jpg')", 
      },
    },
  },
  daisyui: {
    // themes: [
    //   "autumn",
    //  ],
  },
  plugins: [require("daisyui")],
};
