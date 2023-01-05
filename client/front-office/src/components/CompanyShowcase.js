import React from "react";
import { useNavigate } from "react-router-dom";

const Company = (props) => {
  const navigate = useNavigate();
  return (
    <div
      data-theme="lemonade"
      id={props.data._id}
      className="flex flex-col p-2 m-4  bg-[#eeeeee] hover:bg-[#b9b9ff] rounded-lg"
      style={{ border: "solid 1px #191A3E", color: "#191A3E" }}
    >
      <div className="mb-2 rounded font-semibold text-2xl text-center" style={{color: "#191A3E"}}>{props.data.name} </div>
      <div className="mb-2 mx-2">
        <p className=" font-semibold">Description: </p>
        <p className="ml-4">{props.data.description}</p>
      </div>
      <div className="mb-2 mx-2">
        <p className=" font-semibold">Doctor: </p>
         <p className="ml-4">{props.data.owner}</p>
      </div>
      <div className="mb-2 mx-2">
      <p className="font-semibold">Cities: </p>
      <ul className="ml-4"> {props.data.cities.map((item) => (<li>{item}</li>))}</ul>
      </div>


      <div className="flex flex-row mb-2 mx-2 font-semibold">
        <div className="mr-4 self-center">Opened from {props.data.business_hours.start} to {props.data.business_hours.end}</div>
        <div className="px-2 py-1 rounded flex self-center justify-center flex-start font-semibold bg-[#191A3E]" style={{color:"#b9b9ff"}}>
          {props.data.cost_per_hour} € / h
        </div>
      </div>
    </div>
  );
};

export default Company;