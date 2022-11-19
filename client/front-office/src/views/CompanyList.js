import React, { useEffect, useState } from "react";
import CompanyManage from "../services/CompanyManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CompanyShowcase from "../components/CompanyShowcase";

const CompanyList = (props) => {
  const [company, setCompany] = useState([]);

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

      <div className="flex flex-1" style={{ height: "auto" }}>
        {company.map((product) => (
          <CompanyShowcase
            name={product.name}
            description={product.description}
            cost_per_hour={product.cost_per_hour}
            owner={product.owner}
            cities={product.cities}
            business_hours={product.business_hours}
          />
        ))}
      </div>

      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default CompanyList;
