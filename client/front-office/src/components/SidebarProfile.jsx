import React from "react";
import { TbFish, TbUserCircle, TbCalendarEvent } from 'react-icons/tb';


export default function Sidebar() {
  return (
    <div className="flex flex-1">
      <div className="hidden sm:flex">
        <div className="flex flex-col  p-3 bg-white shadow w-60">
          <div className="space-y-3 m-2">
            <div className="flex items-center justify-center">
              <h2 className="text-xl font-bold">Menu</h2>
            </div>
            <div className="flex flex-1">
              <ul className="pt-2 pb-4 space-y-1">
                <li className="rounded-sm">
                  <a href="/f/profile" className="flex items-center p-2 space-x-2 rounded-md">
                    <TbUserCircle className="block h-6 w-6" alt="user icon" />
                    <span>Profile</span>
                  </a>
                </li>
                <li className="rounded-sm">
                  <a href="/f/profile/pets" className="flex items-center p-2 space-x-2 rounded-md">
                    <TbFish className="block h-6 w-6" alt="fish icon" />
                    <span>Pets</span>
                  </a>
                </li>
                <li className="rounded-sm">
                  <a href="/f/profile/prenotations" className="flex items-center p-2 space-x-3 rounded-md">
                    <TbCalendarEvent className="block h-6 w-6" alt="calendar icon" />
                    <span>Prenotations</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <ul className="flex flex-row justify-items-stretch">
          <li className="rounded-sm m-4 mr-4 basis-1/3" style={{flex: "1 1 auto"}}>
            <a href="/f/profile" className="flex flex-row items-center space-x-3 rounded-md">
              <TbUserCircle className="block h-6 w-6" alt="user icon" />
              <div>Profile</div>
            </a>
          </li>
          <li className="rounded-sm m-4 ml-4 basis-1/3" style={{flex: "1 1 auto"}}>
            <a href="/f/profile/pets" className="flex flex-row items-center space-x-3 rounded-md">
              <TbFish className="block h-6 w-6" alt="fish icon"/>
              <span>Pets</span>
            </a>
          </li>
          <li className="rounded-sm m-4 ml-4 basis-1/3" style={{flex: "1 1 auto"}}>
            <a href="/f/profile/prenotations" className="flex flex-row items-center space-x-3 rounded-md">
              <TbCalendarEvent className="block h-6 w-6" alt="fish icon"/>
              <span>Prenotations</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}