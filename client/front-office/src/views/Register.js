import React, { useEffect, useState } from "react";
import UserManage from "../services/UserManage";
import '../output.css'

const Footer = () => {
  const sendData = async (data) => {
    if (data) {
      console.log(data);
      data.preventDefault();
      await UserManage.addUser(data).then((res) => {
        console.log(res);
        alert(res.message);
      });
    }
    else{
      console.log("caconi");
    }
  };

  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const [password, setPassword] = useState([]);
  const [birthDate, setBithDate] = useState([]);
  const [email, setEmail] = useState([]);

  return (
    <div data-theme="lemonade" className="flex flex-1 justify-center">
      <div className="flex justify-center" style={{flex:"0 1 70%",alignItems:"center"}}>
        <form className="flex justify-center" style={{flex:"1 0 auto"}} onSubmit={sendData}>
          <div className=" flex flex-shrink-0 justify-center w-full shadow-2xl bg-base-100">
            <div className="card-body text-center">
              <div className="card-title justify-center">Sign in!</div>
              <div className="form-control flex flex-row">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Mario"
                  className="input input-bordered"
                  onChange={(e) => setName(e.target.value)}
                  style={{flex:"1 0 auto"}}
                />
                <label className="label">
                  <span className="label-text">Surname</span>
                </label>
                <input
                  type="text"
                  placeholder="Draghi"
                  className="input input-bordered"
                  onChange={(e) => setSurname(e.target.value)}
                  style={{flex:"1 0 auto"}}
                />

              </div>
              <div className="form-control">
                {/* <label className="label">
                  <span className="label-text">Surname</span>
                </label>
                <input
                  type="text"
                  placeholder="Draghi"
                  className="input input-bordered"
                  onChange={(e) => setSurname(e.target.value)}
                /> */}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Birth Date</span>
                </label>
                <input
                  type="text"
                  placeholder="31/12/2000"
                  className="input input-bordered"
                  onChange={(e) => setBithDate(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Favourite animal</span>
                </label>
                <input
                  type="text"
                  placeholder="platypus"
                  className="input input-bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="example@email.org"
                  className="input input-bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn-primary m-1" type="submit">Register</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Footer;
