import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";

async function loginUser(credentials) {
  return UserManage.login(credentials);
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
    <form data-theme="lemonade" onSubmit={handleSubmit} className="flex h-screen">
      <div className="m-auto card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body text-center">
          <div className="card-title justify-center">Sign in to CasAnimale!</div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="example@email.org"
              className="input input-bordered"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">
              <button
                onClick={() => {
                  navigate("/restore");
                }}
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </button>
            </label>
          </div>
          <div>
            <button className="btn btn-secondary m-1">sign in</button>
          </div>
          <label className="label" size="lg">
            <span className="label-text">Or if you don't have an account</span>
            <button
              onClick={() => {
                navigate("/register");
              }}
              size="sm"
              className="btn btn-primary"
            >
              sign up
            </button>
          </label>
        </div>
      </div>
    </form>
  );
};

export default Navbar;
