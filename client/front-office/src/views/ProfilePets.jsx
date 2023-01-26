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
                <div class="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                  <button type="button" class="z-30 absolute top-3 right-2.5 text-red-500 bg-transparent hover:text-red-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setShowModal(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex relative sm:px-5 flex-auto">
                  <NewPet style={{ display: "flex", height: "100%" }} />
                </div>
                {/*footer*/}
                <div className="flex p-4 justify-end rounded-b text-sm text-gray-400">
                  * required field
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

      <div className="sm:hidden flex flex-col justify-items-stretch">
        <div className="flex w-full justify-evenly">
          <Sidebar />
        </div>

        <div class="flex relative">
          <div class="flex absolute fixed top-0 right-0 justify-end m-4 mb-0">
            <button onClick={() => { setShowModal(true); }} className="btn btn-secondary" >New pet</button>
          </div>

          <div className="flex object-left-top w-full h-full" style={{ height: "auto" }}>
            <PetsList />
          </div>
        </div>
      </div>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePets;