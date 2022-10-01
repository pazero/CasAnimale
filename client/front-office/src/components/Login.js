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
    <div
      data-theme="lemonade"
      className="flex flex-1 justify-start flex-direction-column"
      style={{ height: "100%" }}
    >
      <div
        className=" hidden lg:flex flex-1 justify-end flex-direction-column"
        style={{
          height: "100%",
          backgroundImage: "url('login-bg.jpg')",
          backgroundColor: "#01a2b4",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      >
        <form onSubmit={handleSubmit} className="flex h-screen" style={{marginRight:"20%"}}>
          <div className="m-auto card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body text-center">
              <div className="card-title justify-center">
                Sign in to CasAnimale!
              </div>
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
                <span className="label-text">
                  Or if you don't have an account
                </span>
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
      </div>
    </div>
  );
};

export default Navbar;
