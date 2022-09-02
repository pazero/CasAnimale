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
  );
};

export default Navbar;
