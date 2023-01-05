import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SidebarProfile";
import PetsList from "../components/PetsList";
import NewPet from "../components/NewPet";

const ProfilePets = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div data-theme="lemonade" className="flex h-screen flex-1" style={{ flexDirection: "column", justifyContent: "space-between", maxHeight: "100%"}} >
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">New pet</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <NewPet style={{ display: "flex", height: "100%" }} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="flex flex-1" style={{ height: "4rem", maxHeight: "4rem" }}>
        <Navbar />
      </div>

      <div className="hidden sm:flex static inline-flex">
        <div className="inline-block">
          <Sidebar />
        </div>

        <button onClick={() => { setShowModal(true); }} className="btn btn-secondary m-4" >New pet</button>

        <div className="flex flex-1 inline-block" style={{ height: "auto" }}>
          <PetsList />
        </div>
      </div>

      <div className="sm:hidden flex flex-col">
        <div className="flex w-full justify-evenly">
          <Sidebar />
        </div>

        <button onClick={() => { setShowModal(true); }} className="btn btn-secondary m-4 ml-0 mb-0" >New pet</button>

        <div className="flex w-full" style={{ height: "auto" }}>
          <PetsList />
        </div>
      </div>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePets;
