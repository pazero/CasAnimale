import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-blue-100">
      <div className="flex-1">
        <a
          href="http://localhost:3000"
          className="btn btn-ghost normal-case text-xl"
        >
          CasAnimale
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li tabIndex="0">
            <a href="/">
              Servizi
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a href="/">eCommerce</a>
              </li>
              <li>
                <a href="/">Psicologo</a>
              </li>
              <li>
                <a href="/">Negozi</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="http://localhost:5173" target="_blank" rel="noreferrer">
              Area giochi
            </a>
          </li>
          <li>
            <a href="/">Area riservata</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
