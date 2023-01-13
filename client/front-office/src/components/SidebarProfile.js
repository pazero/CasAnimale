import React from "react";
import { TbFish, TbUserCircle, TbCalendarEvent } from 'react-icons/tb';


export default function Sidebar() {
  return (
    <div className="flex">
      <div className="hidden sm:flex">
        <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
          <div className="space-y-3 m-2">
            <div className="flex items-center justify-center">
              <h2 className="text-xl font-bold">Menu</h2>
            </div>
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1">
                <li className="rounded-sm">
                  <a href="/profile" className="flex items-center p-2 space-x-3 rounded-md">
                    <TbUserCircle className="block h-6 w-6" alt="user icon" />
                    <span>Profile</span>
                  </a>
                </li>
                <li className="rounded-sm">
                  <a href="/profile/pets" className="flex items-center p-2 space-x-3 rounded-md">
                    <TbFish className="block h-6 w-6" alt="fish icon" />
                    <span>Your pets</span>
                  </a>
                </li>
                <li className="rounded-sm">
                  <a href="/profile/" className="flex items-center p-2 space-x-3 rounded-md">
                    <TbCalendarEvent className="block h-6 w-6" alt="calendar icon" />
                    <span>Your prenotations</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <ul className="flex flex-row justify-items-stretch">
          <li className="rounded-sm m-4 mr-4">
            <a href="/profile" className="flex items-center space-x-3 rounded-md">
              <TbUserCircle className="block h-6 w-6" alt="user icon" />
              <div>Profile</div>
            </a>
          </li>
          <li className="rounded-sm m-4 ml-4">
            <a href="/profile/pets" className="flex items-center space-x-3 rounded-md">
              <TbFish className="block h-6 w-6" alt="fish icon" />
              <span>Your pets</span>
            </a>
          </li>
          <li className="rounded-sm m-4 ml-4">
            <a href="/profile/" className="flex items-center space-x-3 rounded-md">
              <TbCalendarEvent className="block h-6 w-6" alt="fish icon" />
              <span>Your prenotations</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}