import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = await UserManage.login({
      email,
      password,
    });
    if (msg.data.token) Cookies.set("token", msg.data.token, { expires: 3600 });
    alert(msg.data.message);
    navigate("/");
  };

  return (
    <div
      data-theme="lemonade"
      className="flex flex-1 justify-center flex-direction-column"
      style={{ height: "100%", backgroundColor: "#01a2b4" }}
    >
      <div
        className=" hidden sm:flex flex-1 justify-end flex-direction-column"
        style={{
          height: "100%",
          backgroundImage: "url('login-bg.jpg')",
          backgroundColor: "#01a2b4",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      >
        <div
          className="flex justify-center"
          style={{
            flex: "0 1 45%",
            alignItems: "center",
            marginLeft: "3.5rem",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex h-screen justify-center"
            style={{ marginRight: "20%" }}
          >
            <div className="m-auto card justify-center w-full max-w-sm shadow-2xl bg-base-100">
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
                <label className="label">
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="label-text-alt link link-hover"
                  >
                    Or if you don't have an account SIGN UP
                  </button>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className="sm:hidden justify-center"
        style={{
          height: "100%",
          backgroundColor: "#01a2b4",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      >
        <div
          className="flex justify-center"
          style={{ flex: "0 1 auto", alignItems: "center", margin: "3.5rem" }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex h-screen justify-center"
          >
            <div className="m-auto card justify-center w-full max-w-sm shadow-2xl bg-base-100">
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
                <label className="label">
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="label-text-alt link link-hover"
                  >
                    Or if you don't have an account SIGN UP
                  </button>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
