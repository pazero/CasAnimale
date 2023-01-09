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

const SpecialistPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [companyPrenotation, setCompanyPrenotation] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [company, setCompany] = useState([]);
  const token = Cookies.get("token");
  useEffect(() => {
    async function fetchData() {
      await CompanyManage.getCompany(params.id).then((res) => {
        setCompany(res.data);
      });

      await PrenotationManage.getPrenotations({ company: params.id }).then(
        (res) => {
          setCompanyPrenotation(res.data);
        }
      );
    }
    fetchData();
  }, []);
  const newDate = (s) => {
    return new Date(s);
  };
  const getDateTimeString = (s) => {
    var d = newDate(s);
    return (
      d.getFullYear().toString() +
      "-" +
      ((d.getMonth() + 1).toString().length == 2
        ? (d.getMonth() + 1).toString()
        : "0" + (d.getMonth() + 1).toString()) +
      "-" +
      (d.getDate().toString().length == 2
        ? d.getDate().toString()
        : "0" + d.getDate().toString()) +
      " " +
      (d.getHours().toString().length == 2
        ? d.getHours().toString()
        : "0" + d.getHours().toString()) +
      ":" +
      ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
        ? (parseInt(d.getMinutes() / 5) * 5).toString()
        : "0" + (parseInt(d.getMinutes() / 5) * 5).toString())
    );
  };
  //formato mese-giorno-anno
  const getDateString = (s) => {
    var d = newDate(s);
    return (
      ((d.getMonth() + 1).toString().length == 2
        ? (d.getMonth() + 1).toString()
        : "0" + (d.getMonth() + 1).toString()) +
      "-" +
      (d.getDate().toString().length == 2
        ? d.getDate().toString()
        : "0" + d.getDate().toString()) +
      "-" +
      d.getFullYear().toString()
    );
  };
  const getHoursString = (s) => {
    var d = newDate(s);
    return d.getHours().toString();
  };
  useEffect(() => {
    const array = [];
    companyPrenotation?.map((item) => {
      array.push(getDateTimeString(item.start));
    });
    console.log("companyPrenotation: " + array);
  }, [companyPrenotation]);

  const bookSlot = async (companyId, start) => {
    const res = await PrenotationManage.newPrenotation({
      company: companyId,
      start: start,
      duration: 1,
    });
    alert(res.message);
  };

  function calcSlot() {
    console.log("iniziamo calcSlot");
    let slotDay = document.getElementById("slotDay").value;
    let start = company.business_hours.start;
    let end = company.business_hours.end;
    let interval = end - start;
    if (interval <= 0) alert("It is not possible to book a slot");
    let slots = [];
    //slots.push(getDateTimeString(item.start))
    const booked = [];
    companyPrenotation?.map((item) => {
      console.log("prenotation date: " + getDateString(item.start));
      console.log("selected date: " + slotDay);
      //seleziono solo le prenotazioni fatte nella data selezionata
      if (getDateString(item.start).localeCompare(slotDay) === 0)
        booked.push(getHoursString(item.start));
    });
    console.log("booked: " + booked);
    for (let i = 0; i < interval; i++) {
      //se lo slot non è incluso lo aggiungo a availableSlots che poi userò per riempire il select
      if (!booked.includes(start + i)) {
        let moment = (start + i > 12) ? "pm" : "am";
        availableSlots.push(((start + i) % 12) + moment);
      }
    }
  }

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
        calcSlot
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
                        //onCalendarOpen={calcSlot}
                        id="slotDay"
                        className="text-center border-solid border-4 rounded-lg px-1"
                        selected={startDate}
                        placeholderText="Select a day"
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        filterDate={(date) => {
                          return date.getDay() !== 0 && date.getDay() !== 6;
                        }}
                      />
                    </div>
                    <div className="font-bold">
                      Orario
                      <div id="slotSelect"></div>
                    </div>
                    <div className="font-bold">Costo totale</div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="btn-primary rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        console.log(
                          "start: " +
                            company.business_hours.start +
                            " end: " +
                            company.business_hours.end
                        );
                        console.log(
                          "slotDay: " + document.getElementById("slotDay").value
                        );
                        bookSlot(
                          params.id,
                          new Date(
                            document.getElementById("slotDay").value + " 11:00"
                          )
                        );
                        setShowModal(false);
                      }}
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
