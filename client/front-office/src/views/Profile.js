import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { PaperClipIcon } from '@heroicons/react/20/solid'

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
        <form className="flex flex-1" style={{ height: "auto" }} onSubmit={handleSubmit}>
          <div className="overflow-hidden bg-white shadow rounded-lg" style={{width: "100%"}}>
            <div className="px-4 py-5 px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Your Profile Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualName}</span>
                      <input
                        hidden={true}
                        id="newName"
                        type="text"
                        name="new-name"
                        defaultValue={actualName}
                        placeholder="Type your new name here"
                        className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        onChange={(e) => setName(e.target.value)}
                      />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-sm font-medium text-gray-500">Surname</dt>
                  <dd className="text-sm text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualSurname}</span>
                    <input
                      hidden={true}
                      type="text"
                      name="new-surname"
                      id="newSurname"
                      defaultValue={actualSurname}
                      placeholder="Type your new surname here"
                      className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                  <dd className="text-sm text-gray-900 col-span-2 mt-0">
                    {/*<span hidden={false} className="actualInfo ml-1">{actualBirth}</span>*/}
                    <span hidden={false} className="actualInfo ml-1">{actualBirth?actualBirth.substring(5,7)+"/"+actualBirth.substring(8,10)+"/"+actualBirth.substring(0,4):actualBirth}</span>
                    <input
                      hidden={true}
                      type="date"
                      name="new-birth"
                      id="newBirth"
                      //da modificare
                      defaultValue={actualBirth?actualBirth.substring(0,10):actualBirth}
                      placeholder="Type your new birthday here"
                      className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      onChange={(e) => setBirth(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualEmail}</span>
                    <input
                      hidden={true}
                      type="text"
                      name="new-email"
                      id="newEmail"
                      defaultValue={actualEmail}
                      placeholder="Type your new email here"
                      className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-sm font-medium text-gray-500">Password</dt>
                  <dd className="text-sm text-gray-900 col-span-2 mt-0">{/*'*'.repeat(actualPassword.len)*/}
                    <span hidden={false} className="actualInfo ml-1">******</span>
                    <input
                      hidden={true}
                      type="text"
                      name="new-password"
                      id="newPassword"
                      defaultValue={actualPassword}
                      placeholder="Type your new password here"
                      className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4 px-6">
                  <dt className="text-sm font-medium text-gray-500">Favourite Animal</dt>
                  <dd className="text-sm text-gray-900 col-span-2 mt-0">
                    <span hidden={false} className="actualInfo ml-1">{actualFavanimal}</span>
                    <input
                      hidden={true}
                      type="text"
                      name="new-favanimal"
                      id="newFavanimal"
                      defaultValue={actualFavanimal}
                      placeholder="Type your new favourite animal here"
                      className="changeInfo px-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      onChange={(e) => setFavanimal(e.target.value)}
                    />
                  </dd>
                </div>
              </dl>
              <div className="flex flex-1 flex-auto justify-center my-2">
                <button hidden={true} id="saveBtn" type="submit" className="btn btn-primary" onClick={()=>{
                  //ho commentato queste righe perche tanto se non si ricarica la pagina non si vedono i dati aggiornati
                  //document.querySelector("#saveBtn").hidden = true;
                  //document.querySelector("#changeInfoBtn").hidden = false;

                  //var changeElements = document.querySelectorAll(".changeInfo");
                  //changeElements.forEach(element => {element.hidden = true});
                  //var actualElements = document.querySelectorAll(".actualInfo");
                  //actualElements.forEach(element => {element.hidden = false});
                  window.location.reload();
                }}>save</button>

                <input hidden={false} defaultValue="change information" id="changeInfoBtn" className="btn btn-secondary" onClick={()=>{
                  document.querySelector("#saveBtn").hidden = false;
                  document.querySelector("#changeInfoBtn").hidden = true;

                  var changeElements = document.querySelectorAll(".changeInfo");
                  changeElements.forEach(element => {element.hidden = false});
                  var actualElements = document.querySelectorAll(".actualInfo");
                  actualElements.forEach(element => {element.hidden = true});
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
