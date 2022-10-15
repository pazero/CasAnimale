import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [actualName, setActualName] = useState();
  const [surname, setSurname] = useState();
  const [actualSurname, setActualSurname] = useState();
  const [birth, setBirth] = useState();
  const [actualBirth, setActualBirth] = useState();
  const [email, setEmail] = useState();
  const [actualEmail, setActualEmail] = useState();
  const [password, setPassword] = useState();
  const [actualPassword, setActualPassword] = useState();
  const [favanimal, setFavanimal] = useState();
  const [actualFavanimal, setActualFavanimal] = useState();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  async function fetchData() {
    await UserManage.getUser().then(  (res) => {
      const user = res.data;
      setActualName(user.name);
      setActualSurname(user.surname);
      setActualBirth(user.birth);
      setActualEmail(user.email);
      setActualPassword(user.password);
      setActualFavanimal(user.favanimal);
      console.log(res.data);
    })
  }
  async function resetData() {
    await UserManage.getUser().then(  (res) => {
      const user = res.data;
      document.querySelector("#newName").value = user.name;
      setName(user.name);
      document.querySelector("#newSurname").value = user.surname;
      setSurname(user.surname);
      //document.querySelector("#newBirth").value = (user.birth).substring(0,10);
      //setBirth((user.birth).substring(0,10));
      document.querySelector("#newEmail").value = user.email;
      setEmail(user.email);
      document.querySelector("#newPassword").value = user.password;
      setPassword(user.password);
      document.querySelector("#newFavanimal").value = user.favanimal;
      setFavanimal(user.favanimal);
    })
  }

  fetchData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = await UserManage.updateUser({
      name,
      surname,
      birth,
      email,
      password,
      favanimal,
    });
    alert(msg.data.message);
  };

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
      <div className="flex flex-1" style={{ height: "4rem", maxHeight: "4rem" }}>
        <Navbar />
      </div>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <form className="flex flex-1" style={{ height: "auto"}} onSubmit={handleSubmit}>
          <div className="overflow-hidden bg-white shadow" style={{width: "100%"}}>
            <div className="px-4 py-5 px-6 bg-indigo-400">
              <h3 className="text-lg font-medium leading-6 text-black font-bold" style={{fontSize:"200%"}}>Your Profile Information</h3>
              <p className="mt-1 max-w-2xl text-lg text-indigo-900">Personal details</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-lg font-medium text-gray-500">Name</dt>
                  <dd className="text-lg text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualName}</span>
                      <input
                        hidden={true}
                        id="newName"
                        type="text"
                        name="new-name"
                        defaultValue={actualName}
                        placeholder="Type your new name here"
                        className="changeInfo bg-indigo-50 px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        onChange={(e) => setName(e.target.value)}
                      />
                  </dd>
                </div>
                <div className="bg-indigo-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-lg font-medium text-gray-500">Surname</dt>
                  <dd className="text-lg text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualSurname}</span>
                    <input
                      hidden={true}
                      type="text"
                      name="new-surname"
                      id="newSurname"
                      defaultValue={actualSurname}
                      placeholder="Type your new surname here"
                      className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-lg font-medium text-gray-500">Birthday</dt>
                  <dd className="text-lg text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualBirth?actualBirth.substring(5,7)+"/"+actualBirth.substring(8,10)+"/"+actualBirth.substring(0,4):actualBirth}</span>
                    <input
                      hidden={true}
                      type="date"
                      name="new-birth"
                      id="newBirth"
                      defaultValue={actualBirth?actualBirth.substring(0,10):actualBirth}
                      placeholder="Type your new birthday here"
                      style={{fontSize:"98%", minHeight:"0px"}}
                      className="changeInfo bg-indigo-50 px-1 py-0 m-0 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      onChange={(e) => setBirth(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-indigo-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-lg font-medium text-gray-500">Email</dt>
                  <dd className="text-lg text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualEmail}</span>
                    <input
                      hidden={true}
                      type="text"
                      name="new-email"
                      id="newEmail"
                      defaultValue={actualEmail}
                      placeholder="Type your new email here"
                      className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-lg font-medium text-gray-500">Password</dt>
                  <dd className="text-lg text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualPassword?'*'.repeat(actualPassword.length):actualPassword}</span>
                    <input
                      hidden={true}
                      type="text"
                      name="new-password"
                      id="newPassword"
                      defaultValue={actualPassword}
                      placeholder="Type your new password here"
                      className="changeInfo bg-indigo-50 px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-indigo-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-lg font-medium text-gray-500">Favourite Animal</dt>
                  <dd className="text-lg text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualFavanimal}</span>
                    <input
                      hidden={true}
                      type="text"
                      name="new-favanimal"
                      id="newFavanimal"
                      defaultValue={actualFavanimal}
                      placeholder="Type your new favourite animal here"
                      className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      onChange={(e) => setFavanimal(e.target.value)}
                    />
                  </dd>
                </div>
              </dl>
              <div className="flex flex-1 flex-auto justify-center my-4">
                <button hidden={true} id="saveBtn" type="submit" className="btn btn-primary" onClick={()=>{
                  window.location.reload();
                }}>save</button>

                <input hidden={false} defaultValue="change information" id="changeInfoBtn" type="button" className="btn btn-secondary" onClick={()=>{
                  document.querySelector("#saveBtn").hidden = false;
                  document.querySelector("#resetInfoBtn").hidden = false;
                  document.querySelector("#changeInfoBtn").hidden = true;

                  var changeElements = document.querySelectorAll(".changeInfo");
                  changeElements.forEach(element => {element.hidden = false});
                  var actualElements = document.querySelectorAll(".actualInfo");
                  actualElements.forEach(element => {element.hidden = true});
                }}/>

                <input hidden={true} defaultValue="reset" id="resetInfoBtn" type="button" className="btn btn-ghost ml-4 bg-indigo-100" onClick={()=>{
                  console.log({actualName});
                  resetData();
                }}/>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
