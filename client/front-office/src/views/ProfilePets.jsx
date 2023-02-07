import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SidebarProfile";
import PetsList from "../components/PetsList";
import NewPet from "../components/NewPet";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const ProfilePets = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      data-theme="lemonade"
      className="flex h-screen flex-1"
      style={{ flexDirection: "column", maxHeight: "100%" }}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new pet!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <NewPet style={{ display: "flex", height: "100%" }} />
          </ModalBody>

          <ModalFooter>
            <div className="flex p-4 justify-end rounded-b text-sm text-gray-400">
              * required field
            </div>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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

        <button onClick={onOpen} className="btn btn-secondary m-4">
          New pet
        </button>

        <div className="flex flex-1 inline-block" style={{ height: "auto" }}>
          <PetsList />
        </div>
      </div>

      <div className="sm:hidden flex flex-col justify-items-stretch flex-1">
        <div className="flex w-full justify-evenly">
          <Sidebar />
        </div>

        <div className="flex relative">
          <div className="flex absolute fixed top-0 right-0 justify-end m-4 mb-0">
            <button onClick={onOpen} className="btn btn-secondary">
              New pet
            </button>
          </div>

          <div
            className="flex object-left-top w-full"
            style={{ height: "auto" }}
          >
            <PetsList />
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePets;
