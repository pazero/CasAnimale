import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SidebarProfile";
import Cookies from "js-cookie";
import { Image, Button } from "@chakra-ui/react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [photo, setPhoto] = useState();
  const [birth, setBirth] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [favanimal, setFavanimal] = useState();
  const [vip, setVip] = useState(false);
  const token = Cookies.get("token");
  const toast = useToast();

  const {
    isOpen: isOpenBecome,
    onOpen: onOpenBecome,
    onClose: onCloseBecome,
  } = useDisclosure();
  const {
    isOpen: isOpenStop,
    onOpen: onOpenStop,
    onClose: onCloseStop,
  } = useDisclosure();

  const uploader = Uploader({
    apiKey: "free",
  });

  const options = { multi: false };

  useEffect(() => {
    async function fetchData() {
      await UserManage.getUser().then((res) => {
        const u = res.data;
        setUser(u);
        setName(u.name);
        setSurname(u.surname);
        setPhoto(u.photo);
        setBirth(u.birth);
        setEmail(u.email);
        setPassword(u.password);
        setFavanimal(u.favanimal);
        setVip(u.vip);
      });
    }
    if (!token) {
      navigate("/");
    } else {
      fetchData();
    }
  }, []);

  async function resetData() {
    await UserManage.getUser().then((res) => {
      const usr = res.data;
      document.querySelector("#newName").value = usr.name;
      setName(usr.name);
      document.querySelector("#newSurname").value = usr.surname;
      setSurname(usr.surname);
      document.querySelector("#newBirth").value = user.birth.substring(0, 10);
      setBirth(usr.birth);
      document.querySelector("#newEmail").value = usr.email;
      setEmail(usr.email);
      document.querySelector("#newPassword").value = usr.password;
      setPassword(usr.password);
      document.querySelector("#newFavanimal").value = usr.favanimal;
      setFavanimal(usr.favanimal);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newUsr = {
      name: name,
      surname: surname,
      photo: photo,
      birth: birth,
      email: email,
      password: password,
      favanimal: favanimal,
      vip: vip,
    };
    const msg = await UserManage.updateUser(newUsr);

    if (msg.status === 200) {
      setUser(newUsr);
      toast({
        title: "Profile updated successfully!",
        status: "success",
        duration: 3000,
        variant: "subtle",
        position: "top-center",
      });
      document.querySelector("#saveBtn").hidden = true;
      document.querySelector("#resetInfoBtn").hidden = true;
      document.querySelector("#changeInfoBtn").hidden = false;

      var changeElements = document.querySelectorAll(".changeInfo");
      changeElements.forEach((element) => {
        element.hidden = true;
      });
      var actualElements = document.querySelectorAll(".actualInfo");
      actualElements.forEach((element) => {
        element.hidden = false;
      });
    } else
      toast({
        title: "Ops something went wrong!",
        description: "If you can't proceed updating try to re-access.",
        status: "error",
        duration: 3000,
        variant: "subtle",
        position: "top-center",
      });
  }

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
      <div
        className="flex flex-1"
        style={{ height: "4rem", maxHeight: "4rem" }}
      >
        <Navbar />
      </div>

      <div className="sm:hidden flex flex-col">
        <div className="flex w-full justify-evenly">
          <Sidebar />
        </div>
      </div>

      <div className="sm:flex sm:static sm:inline-flex">
        <div className="hidden sm:flex inline-block">
          <Sidebar />
        </div>

        <div
          className="sm:flex sm:flex-1 sm:inline-block"
          style={{ height: "auto" }}
        >
          <form className="flex flex-1" style={{ height: "auto" }}>
            <div
              className="overflow-hidden bg-white shadow"
              style={{ width: "100%" }}
            >
              <div className="px-4 py-5 px-6 bg-indigo-400">
                <h3
                  className="text-lg font-medium leading-6 text-black font-bold"
                  style={{ fontSize: "200%" }}
                >
                  Your Profile Information
                </h3>
                <p className="mt-1 max-w-2xl text-lg text-indigo-900">
                  Personal details
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-indigo-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                    <dt className="text-lg font-medium text-gray-500">Photo</dt>
                    <dd className="text-lg text-gray-900 col-span-2 mt-0">
                      <Image
                        hidden={false}
                        src={user?.photo}
                        borderRadius="full"
                        className="actualInfo"
                        boxSize="150px"
                        alt="propic"
                      />

                      <UploadButton
                        uploader={uploader} // Required.
                        options={options} // Optional.
                        onComplete={(files) => {
                          // Optional.
                          if (files.length === 0) {
                            console.log("No files selected.");
                          } else {
                            console.log("Files uploaded:");
                            console.log(files.map((f) => setPhoto(f.fileUrl)));
                          }
                        }}
                      >
                        {({ onClick }) => (
                          <div className="flex flex-1">
                            <button
                              hidden={true}
                              className="changeInfo"
                              onClick={onClick}
                            >
                              <Image
                                id="newPhoto"
                                hidden={true}
                                src={photo}
                                borderRadius="full"
                                className="changeInfo"
                                boxSize="150px"
                                alt="propic"
                                opacity={"0.5"}
                              />
                            </button>
                          </div>
                        )}
                      </UploadButton>
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                    <dt className="text-lg font-medium text-gray-500">Name</dt>
                    <dd className="text-lg text-gray-900 col-span-2 mt-0">
                      <span hidden={false} className="actualInfo ml-1">
                        {user?.name}
                      </span>
                      <input
                        hidden={true}
                        id="newName"
                        type="text"
                        name="new-name"
                        defaultValue={user?.name}
                        placeholder="Type your new name here"
                        className="changeInfo bg-indigo-50 px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </dd>
                  </div>
                  <div className="bg-indigo-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                    <dt className="text-lg font-medium text-gray-500">
                      Surname
                    </dt>
                    <dd className="text-lg text-gray-900 col-span-2 mt-0">
                      <span hidden={false} className="actualInfo ml-1">
                        {user?.surname}
                      </span>
                      <input
                        hidden={true}
                        type="text"
                        name="new-surname"
                        id="newSurname"
                        defaultValue={user?.surname}
                        placeholder="Type your new surname here"
                        className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                    <dt className="text-lg font-medium text-gray-500">
                      Birthday
                    </dt>
                    <dd className="text-lg text-gray-900 col-span-2 mt-0">
                      <span hidden={false} className="actualInfo ml-1">
                        {user?.birth
                          ? user?.birth.substring(5, 7) +
                            "/" +
                            user?.birth.substring(8, 10) +
                            "/" +
                            user?.birth.substring(0, 4)
                          : user?.birth}
                      </span>
                      <input
                        hidden={true}
                        type="date"
                        name="new-birth"
                        id="newBirth"
                        defaultValue={
                          user?.birth
                            ? user?.birth.substring(0, 10)
                            : user?.birth
                        }
                        placeholder="Type your new birthday here"
                        style={{ fontSize: "98%", minHeight: "0px" }}
                        className="changeInfo bg-indigo-50 px-1 py-0 m-0 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        onChange={(e) => setBirth(e.target.value)}
                      />
                    </dd>
                  </div>
                  <div className="bg-indigo-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                    <dt className="text-lg font-medium text-gray-500">Email</dt>
                    <dd className="text-lg text-gray-900 col-span-2 mt-0">
                      <span hidden={false} className="actualInfo ml-1">
                        {user?.email}
                      </span>
                      <input
                        hidden={true}
                        type="text"
                        name="new-email"
                        id="newEmail"
                        defaultValue={user?.email}
                        placeholder="Type your new email here"
                        className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                    <dt className="text-lg font-medium text-gray-500">
                      Password
                    </dt>
                    <dd className="text-lg text-gray-900 col-span-2 mt-0">
                      <span hidden={false} className="actualInfo ml-1">
                        {user?.password
                          ? "*".repeat(user?.password.length)
                          : user?.password}
                      </span>
                      <input
                        hidden={true}
                        type="text"
                        name="new-password"
                        id="newPassword"
                        defaultValue={user?.password}
                        placeholder="Type your new password here"
                        className="changeInfo bg-indigo-50 px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </dd>
                  </div>
                  <div className="bg-indigo-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                    <dt className="text-lg font-medium text-gray-500">
                      Favourite Animal
                    </dt>
                    <dd className="text-lg text-gray-900 col-span-2 mt-0">
                      <span hidden={false} className="actualInfo ml-1">
                        {user?.favanimal}
                      </span>
                      <input
                        hidden={true}
                        type="text"
                        name="new-favanimal"
                        id="newFavanimal"
                        defaultValue={user?.favanimal}
                        placeholder="Type your new favourite animal here"
                        className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        onChange={(e) => setFavanimal(e.target.value)}
                      />
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                    <dt className="text-lg font-medium text-gray-500 flex">
                      <svg
                        className="mr-1"
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
                      Vip status
                    </dt>
                    <dd className="text-lg text-gray-900 col-span-2 mt-0">
                      <span className="ml-1">{vip ? "True" : "False"}</span>
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-1 flex-auto justify-center my-4">
                  <button
                    hidden={true}
                    id="saveBtn"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    save
                  </button>

                  <input
                    hidden={false}
                    defaultValue="change information"
                    id="changeInfoBtn"
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      document.querySelector("#saveBtn").hidden = false;
                      document.querySelector("#resetInfoBtn").hidden = false;
                      document.querySelector("#changeInfoBtn").hidden = true;

                      var changeElements =
                        document.querySelectorAll(".changeInfo");
                      changeElements.forEach((element) => {
                        element.hidden = false;
                      });
                      var actualElements =
                        document.querySelectorAll(".actualInfo");
                      actualElements.forEach((element) => {
                        element.hidden = true;
                      });
                    }}
                  />

                  <input
                    hidden={true}
                    defaultValue="reset"
                    id="resetInfoBtn"
                    type="button"
                    className="btn btn-ghost ml-4 bg-indigo-100"
                    onClick={() => {
                      resetData();
                    }}
                  />

                  {vip ? (
                    <Button
                      className="ml-3 btn btn-secondary flex"
                      onClick={onOpenStop}
                    >
                      <svg
                        className="mr-1 pb-1"
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
                      Stop vip
                    </Button>
                  ) : (
                    <Button
                      className="ml-3 btn btn-secondary flex"
                      onClick={onOpenBecome}
                    >
                      <svg
                        className="mr-1 pb-1"
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
                      BECOME VIP
                    </Button>
                  )}

                  <Modal isOpen={isOpenBecome} onClose={onCloseBecome}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Become a vip user</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Benefits:
                        <ul className="list-disc list-inside">
                          <li>Buy exclusive merch on the store</li>
                          <li>Unlimited access to new services</li>
                          <li>Possibility to book an appointment online</li>
                        </ul>
                        At only{" "}
                        <span className="badge badge-warning badge-lg">
                          14.99
                        </span>{" "}
                        per month!
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="yellow"
                          onClick={async () => {
                            const ret = await UserManage.enableVip();
                            if (ret.status === 200)
                              toast({
                                title:
                                  "VIP membership subscribed successfully!",
                                status: "success",
                                duration: 3500,
                                variant: "subtle",
                                position: "top-center",
                              });
                            else
                              toast({
                                title: "Ops something went wrong!",
                                description:
                                  "If you can't proceed subscribing your VIP membership try to re-access.",
                                status: "error",
                                duration: 3500,
                                variant: "subtle",
                                position: "top-center",
                              });
                            setVip(true);
                            onCloseBecome();
                            setTimeout(() => {
                              window.location.reload();
                            }, 3500);
                          }}
                        >
                          YES
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  <Modal isOpen={isOpenStop} onClose={onCloseStop}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Stop beeing a vip user</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        You will immediatly no longer receive the benefits of a
                        vip user. Click Ok if you want to procede.
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="red"
                          onClick={async () => {
                            const ret = await UserManage.disableVip();
                            if (ret.status.toString() === "200")
                              toast({
                                title: "VIP membership deleted successfully!",
                                status: "success",
                                duration: 3500,
                                variant: "subtle",
                                position: "top-center",
                              });
                            else
                              toast({
                                title: "Ops something went wrong!",
                                description:
                                  "If you can't proceed deleting your VIP membership try to re-access.",
                                status: "error",
                                duration: 3500,
                                variant: "subtle",
                                position: "top-center",
                              });
                            setVip(false);
                            onCloseStop();
                            window.location = window.location;
                          }}
                        >
                          Ok
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
