import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";

const Navbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = await UserManage.login({
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
          <div className="card-title justify-center">Sign up!</div>
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
            <button className="btn btn-primary m-1">Login</button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="btn btn-primary"
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
