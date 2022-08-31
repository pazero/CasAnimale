import React from "react";

const Navbar = () => {
  return (
    <div class="navbar bg-blue-100">
      <div class="flex-1">
        <a
          href="http://localhost:3000"
          class="btn btn-ghost normal-case text-xl"
        >
          CasAnimale
        </a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li tabindex="0">
            <a>
              Servizi
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul class="p-2 bg-base-100">
              <li>
                <a>eCommerce</a>
              </li>
              <li>
                <a>Psicologo</a>
              </li>
              <li>
                <a>Negozi</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="http://localhost:5173" target="_blank">
              Area giochi
            </a>
          </li>
          <li>
            <a>Area riservata</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
