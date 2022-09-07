import React, { useEffect, useState } from "react";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserManage.getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div data-theme="cupcake" className="App">
      <Navbar />
      <Header />
      <div>
        <ul className="list-inside list-disc">
          {users.map((user) => (
            <li key={user._id}>{user.name} {user.surname}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
