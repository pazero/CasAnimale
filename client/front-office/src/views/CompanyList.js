import React, { useEffect, useState } from "react";
import CompanyManage from "../services/CompanyManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CompanyShowcase from "../components/CompanyShowcase";

const CompanyList = (props) => {
  const [company, setCompany] = useState([]);
  let title = props.type==="vet" ? "Veterinary":"Pet sitter"
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
      <div id="listTitle" class="font-bold">
          {title}
      </div>
      <div className="flex flex-1" style={{ height: "auto" }}>
        {company.map((product) => (
          <CompanyShowcase data={product}/>
        ))}
      </div>

      <div className="flex">
        <Footer />
      </div>
    </div>
  );
};

export default CompanyList;
