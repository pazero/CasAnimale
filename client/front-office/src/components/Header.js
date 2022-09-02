import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "../services/Authentication";

async function loginUser(credentials) {
  return Authentication.login(credentials);
}

const Navbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = await loginUser({
      email,
      password,
    });
    console.log(msg.data.message);
    //setToken(token);
  };

  return (
    <div class="bg-tipacane hero min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="p-5 text-center rounded-lg bg-gray-300 bg-opacity-50 text-black lg:text-left">
          <h1 class="text-5xl font-bold">Registrati ora!</h1>
          <p class="text-xl py-6">
            E usufruisci dei tanti servizi che forniamo per te e per tutti i
            tuoi amici animali. Compra quello di cui hai bisogno, chiedi aiuto a
            un esperto 24/7, gioca e scopri cose nuove sul tuo animale
            preferito. Questo e tanto altro su CasAnimale!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="example@email.org"
                  class="input input-bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  class="input input-bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label class="label">
                  <button
                    onClick={() => {
                      navigate("/restore");
                    }}
                    class="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </button>
                </label>
              </div>
              <div>
                <button class="btn btn-primary m-1">Login</button>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  class="btn btn-primary"
                >
                  Registrati
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
