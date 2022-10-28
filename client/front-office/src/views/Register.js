import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Cookies from "js-cookie";

const Register = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  async function sendData(data) {
    data.preventDefault();
    const msg = await UserManage.newUser({
      name,
      surname,
      birth,
      email,
      password,
      favanimal,
    });
    alert(msg.data.message);
    navigate("/login");
  };

  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const [birth, setBirth] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [favanimal, setFavAnimal] = useState([]);

  return (
    <div
      data-theme="lemonade"
      className="flex flex-1 justify-start flex-direction-column"
      style={{ height: "100%" }}
    >
      <div
        className=" hidden sm:flex flex-1 justify-start flex-direction-column"
        style={{
          height: "100%",
          backgroundImage: "url('register-bg.jpg')",
          backgroundColor: "#ffac14",
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
            className="flex justify-center"
            style={{ flex: "1 0 auto" }}
            onSubmit={sendData}
          >
            <div className="card flex flex-shrink-0 justify-center w-full shadow-2xl bg-base-100">
              <div className="card-body text-center hidden sm:flex">
                <div className="card-title justify-center">
                  Sign up to CasAnimale!
                </div>
                <div className="form-control flex flex-row">
                  <div
                    className="flex mr-2"
                    style={{ flex: "1 0 auto", flexDirection: "column" }}
                  >
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Mario"
                      className="input input-bordered"
                      onChange={(e) => setName(e.target.value)}
                      style={{ flex: "1 0 auto" }}
                    />
                  </div>
                  <div
                    className="flex ml-2"
                    style={{ flex: "1 0 auto", flexDirection: "column" }}
                  >
                    <label className="label">
                      <span className="label-text">Surname</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Draghi"
                      className="input input-bordered"
                      onChange={(e) => setSurname(e.target.value)}
                      style={{ flex: "1 0 auto" }}
                    />
                  </div>
                </div>
                <div className="form-control flex flex-row">
                  <div
                    className="flex mr-2"
                    style={{ flex: "1 0 auto", flexDirection: "column" }}
                  >
                    <label className="label">
                      <span className="label-text">Birth Date</span>
                    </label>
                    <input
                      type="date"
                      placeholder="01/01/1900"
                      className="input input-bordered"
                      onChange={(e) => setBirth(e.target.value)}
                      style={{ flex: "1 0 auto" }}
                    />
                  </div>
                  <div
                    className="flex ml-2"
                    style={{ flex: "1 0 auto", flexDirection: "column" }}
                  >
                    <label className="label">
                      <span className="label-text">Favourite animal</span>
                    </label>
                    <input
                      type="text"
                      placeholder="platypus"
                      className="input input-bordered"
                      onChange={(e) => setFavAnimal(e.target.value)}
                      style={{ flex: "1 0 auto" }}
                    />
                  </div>
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
                </div>
                <div>
                  <button className="btn btn-primary m-1" type="submit">
                    sign up
                  </button>
                </div>
                <label className="label justify-center">
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="label-text-alt link link-hover"
                  >
                    If you already have an account SIGN IN
                  </button>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className=" sm:hidden justify-start"
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#ffac14",
          backgroundSize: "100%",
          backgroundPosition: "bottom",
        }}
      >
        <div
          className="flex justify-center"
          style={{ flex: "0 1 auto", alignItems: "center", margin: "3.5rem" }}
        >
          <form
            className="flex justify-center"
            style={{ flex: "1 0 auto" }}
            onSubmit={sendData}
          >
            <div className="flex flex-shrink-0 justify-center w-full shadow-2xl bg-base-100">
              <div className="card-body text-center">
                <div className="card-title justify-center">
                  Sign up to CasAnimale!
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Mario"
                    className="input input-bordered"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Surname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Draghi"
                    className="input input-bordered"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Birth Date</span>
                  </label>
                  <input
                    type="text"
                    placeholder="31/12/2000"
                    className="input input-bordered"
                    onChange={(e) => setBirth(e.target.value)}
                    style={{ flex: "1 0 auto" }}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Favourite animal</span>
                  </label>
                  <input
                    type="text"
                    placeholder="platypus"
                    className="input input-bordered"
                    onChange={(e) => setFavAnimal(e.target.value)}
                  />
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
                </div>
                <div>
                  <button className="btn btn-primary m-1" type="submit">
                    sign up
                  </button>
                </div>
                <label className="label justify-center">
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="label-text-alt link link-hover"
                  >
                    If you already have an account SIGN IN
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

export default Register;
