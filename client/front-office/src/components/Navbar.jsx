import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserManage from "../services/UserManage";
import { TbUserCircle, TbShoppingCart } from "react-icons/tb";
import Const from "../services/utils";
import { useToast } from "@chakra-ui/react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  const toast = useToast();

  const isUserLoggedIn = async () => {
    const ret = await UserManage.isLogged().catch(() => {
      return null;
    });
    if (ret && !ret.data.success) logout();
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: userData } = await UserManage.getUser();
        setUser(userData);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    toast({
      title: "You logged out succesfully!",
      status: "success",
      duration: 3000,
      variant: "subtle",
    });
    navigate("/");
  };

  return (
    <nav
      className="navbar bg-blue-50"
      role="navigation"
      aria-label="Main"
      style={{ minHeight: "5%" }}
    >
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost"
            aria-label="Dropdown menu"
          >
            <span className="hidden">hamburger menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="hamburger icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a href={Const.GAMEURL}>Game Area</a>
            </li>
            <li>
              <button
                aria-expanded="false"
                tabIndex={0}
                className="justify-between"
                aria-label="Press enter to view community"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    var tmp = document.getElementById("communitysmall");
                    if (
                      tmp.style.display === "" ||
                      tmp.style.display === "none"
                    ) {
                      tmp.style.display = "block";
                      tmp.setAttribute("aria-expanded", true);
                    } else {
                      tmp.style.display = "none";
                      tmp.setAttribute("aria-expanded", false);
                    }
                  }
                }}
              >
                Community
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-label=""
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </button>
              <ul
                id="communitysmall"
                aria-expanded="false"
                className="p-2 border bg-base-100 z-10"
              >
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
                      navigate("/findpartner");
                    }}
                  >
                    FindPartner
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      user === null
                        ? toast({
                            title: "Ops log-in first!",
                            description:
                              "You have to be a VIP user to access this aerea!",
                            status: "error",
                            duration: 3000,
                            variant: "subtle",
                          })
                        : user.vip
                        ? navigate("/helpme")
                        : toast({
                            title: "Ops it looks like you're not a VIP user!",
                            description:
                              "Subscribe to VIP in you profile aerea.",
                            status: "error",
                            duration: 3000,
                            variant: "subtle",
                          });
                    }}
                  >
                    HelpMe!
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      alt="VIP icon"
                      aria-label="vip icon"
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
            <li aria-label="Services dropdown menu">
              <button
                aria-expanded="false"
                tabIndex={0}
                className="justify-between"
                aria-label="Press enter to view servicies"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    var tmp = document.getElementById("servicesmall");
                    if (
                      tmp.style.display === "" ||
                      tmp.style.display === "none"
                    ) {
                      tmp.style.display = "block";
                      tmp.setAttribute("aria-expanded", true);
                    } else {
                      tmp.style.display = "none";
                      tmp.setAttribute("aria-expanded", false);
                    }
                  }
                }}
              >
                Services
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-label=""
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </button>
              <ul
                id="servicesmall"
                aria-expanded="false"
                className="p-2 border bg-base-100 z-10"
              >
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
                      user === null
                        ? toast({
                            title: "Ops log-in first!",
                            description:
                              "You have to be a VIP user to access this aerea!",
                            status: "error",
                            duration: 3000,
                            variant: "subtle",
                          })
                        : user.vip
                        ? navigate("/vet")
                        : toast({
                            title: "Ops it looks like you're not a VIP user!",
                            description:
                              "Subscribe to VIP in you profile aerea.",
                            status: "error",
                            duration: 3000,
                            variant: "subtle",
                          });
                    }}
                  >
                    Veterinary
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-label="vip icon"
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
                      user === null
                        ? toast({
                            title: "Ops log-in first!",
                            description:
                              "You have to be a VIP user to access this aerea!",
                            status: "error",
                            duration: 3000,
                            variant: "subtle",
                          })
                        : user.vip
                        ? navigate("/psychologist")
                        : toast({
                            title: "Ops it looks like you're not a VIP user!",
                            description:
                              "Subscribe to VIP in you profile aerea.",
                            status: "error",
                            duration: 3000,
                            variant: "subtle",
                          });
                    }}
                  >
                    Psychologist
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-label="vip icon"
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
        <div class="flex flex-row">
          <img src="/f/CasAnimale.png" alt="CasAnimale logo" class="hidden sm:flex h-12 w-12"/>
        <a
          href={Const.FOURL}
          className="btn btn-ghost normal-case text-xl px-1"
          aria-label="CasAnimale home button"
        >
          <img src="/f/CasAnimaleScritta.png" alt="CasAnimale title" class="h-12"/>
        </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a href={Const.GAMEURL}>Game Area</a>
          </li>
          <li className="has-submenu">
            <button
              tabIndex={0}
              className="justify-between"
              aria-label="Press enter to view community"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  var tmp = document.getElementById("communitylarge");
                  if (
                    tmp.style.display === "" ||
                    tmp.style.display === "none"
                  ) {
                    tmp.style.display = "block";
                    tmp.setAttribute("aria-expanded", true);
                  } else {
                    tmp.style.display = "none";
                    tmp.setAttribute("aria-expanded", false);
                  }
                }
              }}
            >
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
            </button>
            <ul
              id="communitylarge"
              aria-expanded="false"
              className="p-2 border bg-base-100 z-10"
            >
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
                    navigate("/findpartner");
                  }}
                >
                  FindPartner
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    user === null
                      ? toast({
                          title: "Ops log-in first!",
                          description:
                            "You have to be a VIP user to access this aerea!",
                          status: "error",
                          duration: 3000,
                          variant: "subtle",
                        })
                      : user.vip
                      ? navigate("/helpme")
                      : toast({
                          title: "Ops it looks like you're not a VIP user!",
                          description: "Subscribe to VIP in you profile aerea.",
                          status: "error",
                          duration: 3000,
                          variant: "subtle",
                        });
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
          <li>
            <button
              tabIndex={0}
              className="justify-between"
              aria-label="Press enter to view servicies"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  var tmp = document.getElementById("servicelarge");
                  if (
                    tmp.style.display === "" ||
                    tmp.style.display === "none"
                  ) {
                    tmp.style.display = "block";
                    tmp.setAttribute("aria-expanded", true);
                  } else {
                    tmp.style.display = "none";
                    tmp.setAttribute("aria-expanded", false);
                  }
                }
              }}
            >
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
            </button>
            <ul
              id="servicelarge"
              aria-expanded="false"
              className="p-2 border bg-base-100 z-10"
            >
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
                    user === null
                      ? toast({
                          title: "Ops log-in first!",
                          description:
                            "You have to be a VIP user to access this aerea!",
                          status: "error",
                          duration: 3000,
                          variant: "subtle",
                        })
                      : user.vip
                      ? navigate("/vet")
                      : toast({
                          title: "Ops it looks like you're not a VIP user!",
                          description: "Subscribe to VIP in you profile aerea.",
                          status: "error",
                          duration: 3000,
                          variant: "subtle",
                        });
                  }}
                >
                  Veterinary
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    aria-label="vip icon"
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
                    user === null
                      ? toast({
                          title: "Ops log-in first!",
                          description:
                            "You have to be a VIP user to access this aerea!",
                          status: "error",
                          duration: 3000,
                          variant: "subtle",
                        })
                      : user.vip
                      ? navigate("/psychologist")
                      : toast({
                          title: "Ops it looks like you're not a VIP user!",
                          description: "Subscribe to VIP in you profile aerea.",
                          status: "error",
                          duration: 3000,
                          variant: "subtle",
                        });
                  }}
                >
                  Psychologist
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    aria-label=""
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
            <button
              tabIndex={0}
              className="btn font-semibold border-indigo-200 bg-indigo-200 text-indigo-900 hover:bg-indigo-200 hover:text-indigo-900 mr-2"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <TbShoppingCart className="block h-6 w-6" alt="cart icon" />
            </button>

            <button
              className="btn font-semibold border-indigo-200 bg-indigo-200 text-indigo-900 hover:bg-indigo-200 hover:text-indigo-900 mr-2"
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
            <button
              tabIndex={0}
              className="btn border-indigo-200 bg-indigo-200 text-indigo-900 hover:bg-indigo-200 hover:text-indigo-900"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <TbShoppingCart className="block h-6 w-6" alt="cart icon" />
            </button>
            <div className="dropdown ml-2">
              <label
                tabIndex={0}
                className="btn font-semibold border-indigo-200 bg-indigo-200 text-indigo-900 hover:bg-indigo-200 hover:text-indigo-900 "
              >
                <TbUserCircle className="block h-6 w-6" alt="user icon" />
              </label>
              <ul className="menu menu-compact dropdown-content mt-3 shadow bg-gray-100 p-0 rounded-box w-full">
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
            <label
              tabIndex={0}
              className="btn mr-2 font-semibold border-indigo-200 bg-indigo-200 text-indigo-900 hover:bg-indigo-200 hover:text-indigo-900"
              for="dropdown"
            >
              <span>login</span>
            </label>
            <ul
              id="dropdown"
              className="menu menu-compact dropdown-content mt-3 shadow bg-gray-100 focus:indigo-200 p-0 rounded-box w-full"
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
    </nav>
  );
};

export default Navbar;
