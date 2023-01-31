import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SidebarProfile";
import PrenotationsList from "../components/PrenotationsList";
import { useNavigate } from "react-router-dom";

const ProfilePrenotations = () => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const specialists = [
    {
      job: "Veterinary",
      onclick: "/vet",
    },
    {
      job: "Pet Sitting",
      onclick: "/petsitter",
    },
    {
      job: "Psychologists",
      onclick: "/psychologist",
    },
    {
      job: "Grooming",
      onclick: "/grooming",
    },
  ];
  return (
    <div
      data-theme="lemonade"
      className="flex h-screen flex-1"
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: "100%",
      }}
    >
      {showList ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h1 className="text-3xl font-semibold">
                    Book an appointment!
                  </h1>
                </div>
                {/*body*/}
                <div className="flex relative p-6 flex-col flex-auto justify-center" style={{flex: "0 1 auto"}}>
                  {specialists.map((item) => {
                    return <button className="flex my-2 items-center btn border-0 text-black bg-gray-200 hover:bg-gray-300" onClick={() => {navigate(item.onclick)}}>
                      {item.job}
                    </button>;
                  })}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowList(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div
        className="flex flex-1"
        style={{ height: "4rem", maxHeight: "4rem" }}
      >
        <Navbar />
      </div>

      <div className="hidden sm:flex static inline-flex flex-1">
        <div className="inline-block flex">
          <Sidebar />
        </div>

        <button
          onClick={() => {
            setShowList(true);
          }}
          className="btn btn-secondary m-4"
        >
          New Prenotation
        </button>

        <div className="flex flex-1 inline-block" style={{ height: "auto" }}>
          <PrenotationsList />
        </div>
      </div>

      <div className="sm:hidden flex flex-col justify-items-stretch flex-1">
        <div className="flex w-full justify-evenly">
          <Sidebar />
        </div>

        <div className="flex relative">
          <div className="flex absolute fixed top-0 right-0 justify-end m-4 mb-0">
            <button
              onClick={() => {
                setShowList(true);
              }}
              className="btn btn-secondary"
            >
              New prenotations
            </button>
          </div>

          <div className="flex object-left-top w-full" style={{ height: "auto" }}>
            <PrenotationsList />
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePrenotations;
