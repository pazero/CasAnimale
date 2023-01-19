import React, { useEffect, useState } from "react";
import CompanyManage from "../services/CompanyManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CompanyList = (props) => {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);

  let title = "";

  switch (props.type) {
    case "vet":
      title = "Veterinaries";
      break;
    case "petsitter":
      title = "Pet Sitters";
      break;
    case "psy":
      title = "Psychologists";
      break;
    case "groomer":
      title = "Groomers";
      break;
    default:
      title = "Groomers";
  }

  useEffect(() => {
    async function fetchData() {
      const ret = await CompanyManage.getCompanies(props);
      var companies = ret.data;

      companies.forEach((item) => {
        var arr = {};
        Object.keys(item.cities).forEach((key) => {
          if (!arr[item.cities[key]]) arr[item.cities[key]] = [];
          arr[item.cities[key]].push(key);
        });
        item["rcities"] = arr;
      });

      setCompany(companies);
    }
    fetchData();
  }, [props]);

  return (
    <div
      data-theme="lemonade"
      className="flex h-full flex-1 flex-col justify-start"
      style={{
        maxHeight: "100%",
      }}
    >
      <div
        className="flex flex-1 self-place-start"
        style={{ height: "4rem", maxHeight: "4rem" }}
      >
        <Navbar />
      </div>
      <div className="flex flex-col" style={{ flex: "1 1 auto" }}>
        <div
          id="listTitle"
          className="m-2 my-4 md:my-8 text-4xl md:text-6xl self-center font-bold uppercase"
        >
          {title}
        </div>
        <div
          className="flex flex-wrap justify-center h-full"
          style={{ flex: "0 1 auto" }}
        >
          {company.map((comp, i) => (
            <div
              key={i}
              id={comp._id}
              className="flex flex-col flex-wrap p-2 sm:p-3 m-4 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100"
              style={{
                color: "#191A3E",
                minWidth: "20rem",
              }}
              onClick={() => {
                navigate("/specialistpage/" + comp._id);
              }}
            >
              <div>
                <div className="mb-2 mt-3 font-semibold text-2xl text-center text-blue-800 ">
                  {comp.name}
                </div>

                <div className="mb-2 mx-2">
                  <p className=" font-semibold">Doctor: </p>
                  <p
                    className="ml-4"
                    style={{ overflowWrap: "break-word", inlineSize: "20rem" }}
                  >
                    {comp.owner}
                  </p>
                </div>

                <div className="mb-2 mx-2">
                  <p className="font-semibold">Description: </p>
                  <div
                    className="ml-4"
                    style={{ overflowWrap: "break-word", inlineSize: "20rem" }}
                  >
                    {comp.description}
                  </div>
                </div>

                <div className="mb-2 mx-2">
                  <p className="font-semibold">Cities: </p>
                  <ul
                    className="ml-4"
                    style={{ overflowWrap: "break-word", inlineSize: "20rem" }}
                  >
                    {" "}
                    {comp?.rcities &&
                      Object.keys(comp.rcities).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-end flex-1">
                <div className="flex justify-between mb-2 mx-2 font-semibold">
                  <div className="mr-6 self-center">
                    Opened from {comp.business_hours.start % 12}
                    {comp.business_hours.start > 12 ? "pm" : "am"} to{" "}
                    {comp.business_hours.end % 12}
                    {comp.business_hours.end > 12 ? "pm" : "am"}
                  </div>
                  <div className="ml-2 px-2 py-1 rounded text-lg flex flex-wrap self-center font-semibold bg-blue-200 text-blue-700">
                    {comp.cost_per_hour} € / h
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <Footer />
      </div>
    </div>
  );
};

export default CompanyList;
