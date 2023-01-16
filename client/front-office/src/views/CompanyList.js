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
      await CompanyManage.getCompanies(props).then((res) => {
        setCompany(res.data);
      });
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
          className="my-4 md:my-8 text-4xl md:text-6xl self-center font-bold uppercase"
        >
          {title}
        </div>
        <div
          className="flex flex-wrap justify-center h-full"
          style={{ flex: "0 1 auto" }}
        >
          {company.map((product, i) => (
            <div
              key={i}
              id={product._id}
              className="flex flex-col flex-wrap p-2 m-4 mt-0 bg-[#f0f2f3] hover:bg-[#b9b9ff] rounded-lg"
              style={{
                border: "solid 1px #191A3E",
                color: "#191A3E",
                minWidth: "20rem",
              }}
              onClick={() => {
                navigate("/specialistpage/" + product._id);
              }}
            >
              <div>
                <div
                  className="mb-2 rounded font-semibold text-2xl text-center"
                  style={{ color: "#191A3E" }}
                >
                  {product.name}
                </div>

                <div className="mb-2 mx-2">
                  <p className="font-semibold">Description: </p>
                  <div
                    className="ml-4"
                    style={{ overflowWrap: "break-word", inlineSize: "20rem" }}
                  >
                    {product.description}
                  </div>
                </div>

                <div className="mb-2 mx-2">
                  <p className=" font-semibold">Doctor: </p>
                  <p
                    className="ml-4"
                    style={{ overflowWrap: "break-word", inlineSize: "20rem" }}
                  >
                    {product.owner}
                  </p>
                </div>

                <div className="mb-2 mx-2">
                  <p className="font-semibold">Cities: </p>
                  <ul
                    className="ml-4"
                    style={{ overflowWrap: "break-word", inlineSize: "20rem" }}
                  >
                    {" "}
                    {product.cities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-end flex-1">
                <div className="flex flex-row mb-2 mx-2 font-semibold">
                  <div className="mr-4 self-center">
                    Opened from {product.business_hours.start % 12}
                    {product.business_hours.start > 12 ? "pm" : "am"} to{" "}
                    {product.business_hours.end % 12}
                    {product.business_hours.end > 12 ? "pm" : "am"}
                  </div>
                  <div
                    className="px-2 py-1 rounded flex self-center justify-center flex-start font-semibold bg-[#191A3E]"
                    style={{ color: "#b9b9ff" }}
                  >
                    {product.cost_per_hour} € / h
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
