import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [birth, setBirth] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [favanimal, setFavanimal] = useState();
  const token = Cookies.get("token");

    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    });


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
      className="App flex h-screen flex-1"
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

      <div className="flex flex-1" style={{ height: "auto" }}>
        {/* form per modificare le informazioni personali */}
        <div class="flex flex-col mt-10 sm:mt-0">
          <div class="p-2">
            <div class="p-2 md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
              </div>
            </div>

            <div class="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit}>
                <div class="overflow-hidden shadow sm:rounded-md">
                  <div class="bg-white px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autocomplete="given-name"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autocomplete="family-name"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-4">
                        <label
                          for="email-address"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autocomplete="email"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-4">
                        <label
                          for="password"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          type="text"
                          name="password"
                          id="password"
                          autocomplete="password"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="birth"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Birth Date
                        </label>
                        <input
                          type="date"
                          name="birth"
                          id="birth"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setBirth(e.target.value)}
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          for="animal"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Favourite animal
                        </label>
                        <input
                          type="text"
                          name="animal"
                          id="animal"
                          autocomplete="address-level1"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => setFavanimal(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
