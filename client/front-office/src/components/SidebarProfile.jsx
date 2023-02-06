import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import { TbFish, TbUserCircle, TbCalendarEvent } from "react-icons/tb";

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      var ret = await UserManage.getUser();
      setUser(ret.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-1">
      <div className="hidden sm:flex">
        <div className="flex flex-col  p-3 bg-white shadow w-60">
          <div className="space-y-3 m-2">
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-bold">Menu</h1>
            </div>
            <div className="flex flex-1">
              <ul className="pt-2 pb-4 space-y-1">
                <li className="rounded-sm">
                  <button
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="flex items-center p-2 space-x-2 rounded-md"
                  >
                    <TbUserCircle className="block h-6 w-6" alt="user icon" />
                    <span>Profile</span>
                  </button>
                </li>
                <li className="rounded-sm">
                  <button
                    onClick={() => {
                      navigate("/profile/pets");
                    }}
                    className="flex items-center p-2 space-x-2 rounded-md"
                  >
                    <TbFish className="block h-6 w-6" alt="fish icon" />
                    <span>Pets</span>
                  </button>
                </li>
                <li className="rounded-sm">
                  <button
                    onClick={() => {
                      navigate("/profile/prenotations");
                    }}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <TbCalendarEvent
                      className="block h-6 w-6"
                      alt="calendar icon"
                    />
                    <span>Prenotations</span>
                  </button>
                </li>
                <li className="rounded-sm">
                  <button
                    onClick={() => {
                      navigate("/profile/notifications");
                    }}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    {user && user.notification?.length > 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="block h-6 w-6"
                        alt="notification icon"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M22 20H2v-2h1v-6.969C3 6.043 7.03 2 12 2s9 4.043 9 9.031V18h1v2zM9.5 21h5a2.5 2.5 0 1 1-5 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="block h-6 w-6"
                        alt="notification icon"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M22 20H2v-2h1v-6.969C3 6.043 7.03 2 12 2s9 4.043 9 9.031V18h1v2zM5 18h14v-6.969C19 7.148 15.866 4 12 4s-7 3.148-7 7.031V18zm4.5 3h5a2.5 2.5 0 1 1-5 0z" />
                      </svg>
                    )}

                    <span>Notifications</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden w-full">
        <ul className="flex flex-1 justify-around">
          <li
            className="rounded-sm m-4 mr-4 basis-1/3"
            style={{ flex: "1 1 auto" }}
          >
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="flex justify-center"
            >
              <TbUserCircle className="block h-6 w-6" alt="user icon" />
            </button>
          </li>
          <li
            className="rounded-sm m-4 ml-4 basis-1/3"
            style={{ flex: "1 1 auto" }}
          >
            <button
              onClick={() => {
                navigate("/profile/pets");
              }}
              className="flex justify-center"
            >
              <TbFish className="block h-6 w-6" alt="fish icon" />
            </button>
          </li>
          <li
            className="rounded-sm m-4 ml-4 basis-1/3"
            style={{ flex: "1 1 auto" }}
          >
            <button
              onClick={() => {
                navigate("/profile/prenotations");
              }}
              className="flex justify-center"
            >
              <TbCalendarEvent className="block h-6 w-6" alt="fish icon" />
            </button>
          </li>
          <li
            className="rounded-sm m-4 ml-4 basis-1/3"
            style={{ flex: "1 1 auto" }}
          >
            <button
              onClick={() => {
                navigate("/profile/notifications");
              }}
              className="flex justify-center"
            >
              {user && user.notification?.length > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="block h-6 w-6"
                  alt="notification icon"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M22 20H2v-2h1v-6.969C3 6.043 7.03 2 12 2s9 4.043 9 9.031V18h1v2zM9.5 21h5a2.5 2.5 0 1 1-5 0z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="block h-6 w-6"
                  alt="notification icon"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M22 20H2v-2h1v-6.969C3 6.043 7.03 2 12 2s9 4.043 9 9.031V18h1v2zM5 18h14v-6.969C19 7.148 15.866 4 12 4s-7 3.148-7 7.031V18zm4.5 3h5a2.5 2.5 0 1 1-5 0z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
