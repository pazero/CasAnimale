import React from "react";
import UserManage from "../services/UserManage";

const Footer = () => {
  const sendData = async (data) => {
    data.preventDefault();
    UserManage.register(data).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="">
      <form onSubmit={sendData}>
        <h1>Form di registrazione</h1>
      </form>
    </div>
  );
};

export default Footer;
