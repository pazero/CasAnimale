import React, { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setUsers(jsonRes.users);
      })
  }, [])

  return (
    <div data-theme="cupcake" className="App">
      <Navbar />
      <Header />

      <div>
        <ul className="list-inside list-disc">
          {users.map((user, key) => (
            <li id={key.toString()}>{user}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default Home;
