import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import PrenotationManage from "../services/PrenotationManage";
import CompanyManage from "../services/CompanyManage";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Cookies from "js-cookie";

//import BookVetVisit from "./bookVetVisit";

const SpecialistPage = (propsingle) => {
  const params = useParams();
  const [companyPrenotation, setCompanyPrenotation ] = useState(false);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await CompanyManage.getCompany(params.id).then((res) => {
        setCompany(res.data);
      });

      await PrenotationManage.getPrenotations({company : params.id}).then((res) => {
        setCompanyPrenotation(res.data);
      });
    }
    fetchData();
  }, []);

  useEffect(()=> {
    console.log(companyPrenotation)
  }, [companyPrenotation])

  
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const token = Cookies.get("token");
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

      <div className="flex flex-1 flex-col m-3" style={{ height: "auto" }}>
        <div
          id="vetName"
          className="text-3xl font-bold sm:text-5xl md:text-7xl"
        >
          {company.name}
        </div>
        <div id="owner" className="mt-3 ml-2">
          <span className="font-bold sm:text-xl">Doctor:</span>
          <div id="ownerName" className="ml-4">
            {company.owner}
          </div>
        </div>
        <div id="mainPetInfo" className="mt-3 ml-2">
          <span className="font-bold sm:text-xl">Main pet of interest:</span>
          <ul id="mainPetList" className="ml-4">
            {company.main_pets?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div id="studyInfo" className="mt-3 ml-2">
          <span className="font-bold sm:text-xl">Study info:</span>
          <ul id="studyList" className="ml-4">
            {company.study_info?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div id="experienceInfo" className="mt-3 ml-2">
          <span className="font-bold sm:text-xl">Professional experience:</span>
          <ul id="experienceList" className="ml-4">
            {company.professional_experience?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div id="jobInfo" className="mt-3 ml-2">
          <span className="font-bold sm:text-xl">Actual jobs:</span>
          <ul id="jobList" className="ml-4">
            {company.actual_jobs?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div id="locationInfo" className="mt-3 ml-2">
          <span className="font-bold sm:text-xl">Workplaces:</span>
          <ul id="locationList" className="ml-4">
            {company.cities?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div id="costPerHour" className="mt-3 ml-2">
          <span className="font-bold sm:text-xl">Cost per hour:</span>
          <div id="cost" className="ml-4">
            {company.cost_per_hour}€/h
          </div>
        </div>

        {token ? (
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="btn btn-secondary mt-2 mb-4"
            >
              Book a slot
            </button>
          </div>
        ) : (
          <div className="flex flex-1 justify-center">
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in to book a visit
            </button>
          </div>
        )}

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Book a slot!</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {/*<BookVetVisit style={{ display: "flex", height: "100%" }} />*/}
                    <div className="font-bold">Data</div>
                    <div>
                      <DatePicker
                        id="slotDay"
                        className="text-center border-solid border-4 rounded-lg px-1"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        filterDate = {(date) => {return date.getDay() !== 0 && date.getDay() !== 6}}
                      />
                    </div>
                    <div className="font-bold">Orario</div>
                    <div className="font-bold">Costo totale</div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="btn-primary rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() =>{
                        console.log(document.getElementById("slotDay").value); 
                        setShowModal(false)}
                    }
                    >
                      Confirm
                    </button>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};
export default SpecialistPage;
