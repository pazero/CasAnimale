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
    <form onSubmit={handleSubmit}>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
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
