import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const toast = useToast();

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
      photo: "",
      birth,
      email,
      password,
      favanimal,
    });
    if (msg.status.toString() === "200") {
      toast({
        title: "Signed-up uccessfully!",
        status: "success",
        duration: 3000,
        variant: "subtle",
      });
      navigate("/login");
    } else {
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed signing-up try reloading the page.",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
    }
  }

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  // const [photo, setPhoto] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favanimal, setFavAnimal] = useState("");

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
                <h1 className="card-title font-semibold text-md justify-center">
                  Sign up to CasAnimale!
                </h1>
                <div className="form-control flex flex-row">
                  <div
                    className="flex mr-2"
                    style={{ flex: "1 0 auto", flexDirection: "column" }}
                  >
                    <label className="label" for="registerName">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      id="registerName"
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
                    <label className="label" for="registerSurname">
                      <span className="label-text">Surname</span>
                    </label>
                    <input
                      id="registerSurname"
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
                    <label className="label" for="registerBirthDate">
                      <span className="label-text">Birth Date</span>
                    </label>
                    <input
                      id="registerBirthDate"
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
                    <label className="label" for="registerFavouriteAnimal">
                      <span className="label-text">Favourite animal</span>
                    </label>
                    <input
                      id="registerFavouriteAnimal"
                      type="text"
                      placeholder="platypus"
                      className="input input-bordered"
                      onChange={(e) => setFavAnimal(e.target.value)}
                      style={{ flex: "1 0 auto" }}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label" for="registerEmail">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="registerEmail"
                    type="text"
                    placeholder="example@email.org"
                    className="input input-bordered"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="registerPassword">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="registerPassword"
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
                <h1 className="card-title text-md font-semibold justify-center">
                  Sign up to CasAnimale!
                </h1>
                <div className="form-control">
                  <label className="label" for="registerNameSmallScreen">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    id="registerNameSmallScreen"
                    type="text"
                    placeholder="Mario"
                    className="input input-bordered"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="registerSurnameSmallScreen">
                    <span className="label-text">Surname</span>
                  </label>
                  <input
                    id="registerSurnameSmallScreen"
                    type="text"
                    placeholder="Draghi"
                    className="input input-bordered"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="registerBirthDateSmallScreen">
                    <span className="label-text">Birth Date</span>
                  </label>
                  <input
                    id="registerBirthDateSmallScreen"
                    type="text"
                    placeholder="31/12/2000"
                    className="input input-bordered"
                    onChange={(e) => setBirth(e.target.value)}
                    style={{ flex: "1 0 auto" }}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="registerFavouriteAnimalSmallScreen">
                    <span className="label-text">Favourite animal</span>
                  </label>
                  <input
                    id="registerFavouriteAnimalSmallScreen"
                    type="text"
                    placeholder="platypus"
                    className="input input-bordered"
                    onChange={(e) => setFavAnimal(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="registerEmailSmallScreen">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="registerEmailSmallScreen"
                    type="text"
                    placeholder="example@email.org"
                    className="input input-bordered"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label" for="registerPasswordSmallScreen">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="registerPasswordSmallScreen"
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
