import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const token = Cookies.get("token");
  const toast = useToast();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = await UserManage.login({
      email,
      password,
    });
    if (msg.data.success) {
      toast({
        title: "Signed-in successfully!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
      navigate("/");
    } else
      toast({
        title: "Ops something went wrong!",
        description: "Incorrect username or password.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
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
                <h1 className="card-title font-semibold text-md justify-center">
                  Sign in to CasAnimale!
                </h1>
                <div className="form-control">
                  <label className="label" for="loginEmail">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="loginEmail"
                    type="text"
                    placeholder="example@email.org"
                    className="input input-bordered"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="loginPassword">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="loginPassword"
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div>
                    <button className="btn btn-secondary my-2">sign in</button>
                  </div>
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
                <label className="label" for="signInButton">
                  <button
                    id="signInButton"
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
                <h1 className="card-title text-md font-semibold justify-center">
                  Sign in to CasAnimale!
                </h1>
                <div className="form-control">
                  <label className="label" for="loginEmailSmallScreen">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="loginEmailSmallScreen"
                    type="text"
                    placeholder="example@email.org"
                    className="input input-bordered"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="loginPasswordSmallScreen">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="loginPasswordSmallScreen"
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div>
                    <button className="btn btn-secondary my-2">sign in</button>
                  </div>
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
                <label className="label" for="signInButton">
                  <button
                    id="signInButton"
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

export default Login;
