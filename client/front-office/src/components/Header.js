import React from "react";
import Login from './Login'

const Navbar = () => {
  return (
    <div class="bg-tipacane hero min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        {/* card della homepage */}
        <div class="p-5 text-center rounded-lg bg-gray-300 bg-opacity-50 text-black lg:text-left">
          <h1 class="text-5xl font-bold">Registrati ora!</h1>
          <p class="text-xl py-6">
            E usufruisci dei tanti servizi che forniamo per te e per tutti i
            tuoi amici animali. Compra quello di cui hai bisogno, chiedi aiuto a
            un esperto 24/7, gioca e scopri cose nuove sul tuo animale
            preferito. Questo e tanto altro su CasAnimale!
          </p>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default Navbar;
