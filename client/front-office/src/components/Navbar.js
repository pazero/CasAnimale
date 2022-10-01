import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-blue-200" style={{minHeight:"5%"}}>
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
              <a className="justify-between">
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
                  <a>eCommerce</a>
                </li>
                <li>
                  <a>Psicologo</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Area riservata</a>
            </li>
          </ul>
        </div>
        <a href="http://localhost:3000/" className="btn btn-ghost normal-case text-xl">CasAnimale</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a href="http://localhost:5173/">Area Giochi</a>
          </li>
          <li tabIndex={0}>
            <a href="#" className="justify-between">
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
                <a>eCommerce</a>
              </li>
              <li>
                <a>Veterinario</a>
              </li>
              <li>
                <a>PetSitter</a>
              </li>
              <li>
                <a>Leaderbord</a>
              </li>
              <li>
                <a>EccoloQua!</a>
              </li>
              <li>
                <a>CercoParter</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Area riservata</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="hidden sm:flex">
          <a
            onClick={() => {
              navigate("/login");
            }}
            className="btn btn-ghost mr-2"
          >
            sign in
          </a>
          <a
            onClick={() => {
              navigate("/register");
            }}
            className="btn btn-primary"
            style={{}}
          >
            sign up
          </a>
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
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
