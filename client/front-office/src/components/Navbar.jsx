import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserManage from "../services/UserManage";
import { TbUserCircle, TbShoppingCart } from "react-icons/tb";
import Const from "../services/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const token = Cookies.get("token");

  const isUserLoggedIn = async () => {
    const ret = await UserManage.isLogged();
    if (!ret.data.success) logout();
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await UserManage.getUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    navigate("/");
  };

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
              <a href={Const.GAMEURL}>Game Area</a>
            </li>
            <li tabIndex={0}>
              <div className="justify-between">
                Community
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </div>
              <ul className="p-2 border bg-base-100 z-10">
                <li>
                  <button
                    onClick={() => {
                      navigate("/forum");
                    }}
                  >
                    EccoloQua!
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (user.vip) navigate("/helpme");
                    }}
                  >
                    HelpMe!
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M2 19h20v2H2v-2zM2 5l5 3 5-6 5 6 5-3v12H2V5z"
                        fill="rgba(244,212,6,1)"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/boards");
                    }}
                  >
                    Leaderboard
                  </button>
                </li>
              </ul>
            </li>
            <li tabIndex={0}>
              <div className="justify-between">
                Services
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </div>
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
                      if (user.vip) navigate("/vet");
                    }}
                  >
                    Veterinary
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M2 19h20v2H2v-2zM2 5l5 3 5-6 5 6 5-3v12H2V5z"
                        fill="rgba(244,212,6,1)"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/petsitter");
                    }}
                  >
                    Pet Sitter
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (user.vip) navigate("/psychologist");
                    }}
                  >
                    Psychologist
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M2 19h20v2H2v-2zM2 5l5 3 5-6 5 6 5-3v12H2V5z"
                        fill="rgba(244,212,6,1)"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/grooming");
                    }}
                  >
                    Grooming
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <button
                onClick={() => {
                  window.location.href = Const.BOURL;
                }}
              >
                Reserved Section
              </button>
            </li>
          </ul>
        </div>
        <a href={Const.FOURL} className="btn btn-ghost normal-case text-xl">
          CasAnimale
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a href={Const.GAMEURL}>Game Area</a>
          </li>
          <li tabIndex={0}>
            <div className="justify-between">
              Community
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </div>
            <ul className="p-2 border bg-base-100 z-10">
              <li>
                <button
                  onClick={() => {
                    navigate("/forum");
                  }}
                >
                  EccoloQua!
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (user.vip) navigate("/helpme");
                  }}
                >
                  HelpMe!
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M2 19h20v2H2v-2zM2 5l5 3 5-6 5 6 5-3v12H2V5z"
                      fill="rgba(244,212,6,1)"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/boards");
                  }}
                >
                  Leaderboard
                </button>
              </li>
            </ul>
          </li>
          <li tabIndex={0}>
            <div className="justify-between">
              Services
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </div>
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
                    if (user.vip) navigate("/vet");
                  }}
                >
                  Veterinary
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M2 19h20v2H2v-2zM2 5l5 3 5-6 5 6 5-3v12H2V5z"
                      fill="rgba(244,212,6,1)"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/petsitter");
                  }}
                >
                  Pet Sitter
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (user.vip) navigate("/psychologist");
                  }}
                >
                  Psychologist
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M2 19h20v2H2v-2zM2 5l5 3 5-6 5 6 5-3v12H2V5z"
                      fill="rgba(244,212,6,1)"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/grooming");
                  }}
                >
                  Grooming
                </button>
              </li>
            </ul>
          </li>
          <li>
            <button
              onClick={() => {
                window.location.href = Const.BOURL;
              }}
            >
              Reserved Section
            </button>
          </li>
        </ul>
      </div>
      {token ? (
        <div className="navbar-end">
          <div className="hidden sm:flex">
            <label
              tabIndex={0}
              className="btn btn-primary mr-2"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <TbShoppingCart className="block h-6 w-6" alt="cart icon" />
            </label>

            <button
              className="btn btn-primary mr-2"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <TbUserCircle className="block h-6 w-6 mr-1" alt="user icon" />
              Profile
            </button>
            <button className="btn btn-ghost" onClick={logout}>
              Log out
            </button>
          </div>
          <div className="sm:hidden">
            <label
              tabIndex={0}
              className="btn btn-primary"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <TbShoppingCart className="block h-6 w-6" alt="cart icon" />
            </label>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-primary m-2">
                <TbUserCircle className="block h-6 w-6" alt="user icon" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 p-0 rounded-box w-full"
              >
                <li>
                  <button
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button onClick={logout}>Log out</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <div className="dropdown">
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
