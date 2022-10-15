import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  function logout() {
    Cookies.remove("token", { path: "" });
    navigate("/");
  }

  return (
    <div className="navbar bg-blue-200" style={{ minHeight: "5%" }}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="http://localhost:5237">Area Giochi</a>
            </li>
            <li tabIndex={0}>
              <a href="/" className="justify-between">
                Servizi
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2 border bg-base-100 z-10">
                <li>
                  <button
                    onClick={() => {
                      navigate("/compra");
                    }}
                  >
                    eCommerce
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Vet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    PetSitter
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Leaderbord
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/forum");
                    }}
                  >
                    Forum
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Looking4Partner
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Area Riservata
              </button>
            </li>
          </ul>
        </div>
        <a
          href="http://localhost:3000/"
          className="btn btn-ghost normal-case text-xl"
        >
          CasAnimale
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a href="http://localhost:5237">Area Giochi</a>
          </li>
          <li tabIndex={0}>
            <a href="/" className="justify-between">
              Servizi
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </a>
            <ul className="p-2 border bg-base-100 z-10">
              <li>
                <button
                  onClick={() => {
                    navigate("/compra");
                  }}
                >
                  eCommerce
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Vet
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  PetSitter
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Leaderbord
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/forum");
                  }}
                >
                  Forum
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Looking4Partner
                </button>
              </li>
            </ul>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Area Riservata
            </button>
          </li>
        </ul>
      </div>
      {token ? (
        <div className="navbar-end">
          <div className="hidden sm:flex">
            <button
              className="btn btn-primary mr-2"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </button>
            <button
              className="btn btn-ghost"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>

      ) : (
        <div className="navbar-end">
          <div className="hidden sm:flex">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="btn btn-ghost mr-2"
            >
              sign in
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="btn btn-primary"
              style={{}}
            >
              sign up
            </button>
          </div>
          <div className="dropdown sm:hidden">
            <label tabIndex={0} className="btn btn-primary mr-2">
              <span>login</span>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 p-0 rounded-box w-full"
            >
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign in
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign up
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
