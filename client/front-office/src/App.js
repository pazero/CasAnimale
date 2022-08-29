import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
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
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <h1>CasAnimale</h1>
      <h5>Dove il tuo amico animale si sente a casa</h5>

      <div>
        <ul className="list-inside list-disc">
          {users.map((user, key) => (
            <li id={key.toString()}>{user}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default App;
