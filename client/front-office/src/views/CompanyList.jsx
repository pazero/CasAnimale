import React, { useEffect, useState } from "react";
import CompanyManage from "../services/CompanyManage";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";

const CompanyList = (props) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [company, setCompany] = useState([]);
  const [filteredCompany, setFilteredCompany] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(); // lasciare senza niente sennò rompe tutto
  const [liveFilters, setLiveFilters] = useState([]);
  const [cityNumbered, setCityNumbered] = useState([]);

  const setFiltersModal = (filterName) => {
    var isInList = liveFilters.includes(filterName);

    if (isInList) {
      const newlist = liveFilters.filter((item) => item !== filterName);
      setLiveFilters(newlist);
    } else {
      setLiveFilters((last) => [...last, filterName]);
    }
  };

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

      // set filters
      var filt = {};
      companies.forEach((c) => {
        var alreadyInsert = [];
        Object.keys(c.cities).forEach((el) => {
          if (filt[c.cities[el]] && !alreadyInsert.includes(c.cities[el]))
            filt[c.cities[el]] += 1;
          else filt[c.cities[el]] = 1;
          alreadyInsert.push(c.cities[el]);
        });
      });
      setCityNumbered(filt);

      setCompany(companies);
      setFilteredCompany(companies);

      const { data } = await UserManage.getUser();
      setUser(data);
      setLiveFilters([]); // lasciare, fixa un bug strano
    }
    fetchData();

    switch (props.type) {
      case "vet":
        setTitle("Veterinaries");
        break;
      case "petsitter":
        setTitle("Pet Sitters");
        break;
      case "psy":
        setTitle("Psychologists");
        break;
      case "groomer":
        setTitle("Groomers");
        break;
      default:
        setTitle("Groomers");
    }
  }, [props]);

  useEffect(() => {
    if (user) {
      if (!user.vip && (props.type === "vet" || props.type === "psy"))
        navigate("/");
    }
  }, [user, props.type, navigate]);

  useEffect(() => {
    if (liveFilters) {
      const newlist = company.filter((el) => {
        var ret = false;
        liveFilters.forEach((filter) => {
          Object.keys(el.cities).forEach((key) => {
            if (el.cities[key] === filter) ret = true;
          });
        });
        return ret;
      });
      setFilteredCompany(newlist);
    }
    if (liveFilters.length === 0) setFilteredCompany(company);
  }, [company, liveFilters, props]);

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
        <h1
          id="listTitle"
          className="m-2 mt-4 md:mt-8 text-4xl md:text-6xl self-center font-semibold uppercase"
        >
          {title}
        </h1>
        <Button className="mx-auto" onClick={onOpen}>
          Filters
        </Button>
        <div
          className="flex flex-wrap justify-center h-full"
          style={{ flex: "0 1 auto" }}
        >
          {filteredCompany.map((comp, i) => (
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
              {/*Opened from {comp.business_hours.start % 12}
                    {comp.business_hours.start > 12 ? "pm" : "am"} to{" "}
                    {comp.business_hours.end % 12}
                    {comp.business_hours.end > 12 ? "pm" : "am"}*/}
              <div className="flex items-end flex-1">
                <div className="flex justify-between mb-2 mx-2 font-semibold">
                  <div className="mr-6 self-center">
                    Opened from {comp.business_hours.start === 12 ? "12pm" : comp.business_hours.start === 0 ? "12am" :comp.business_hours.start > 12 ? ((comp.business_hours.start) % 12) + "pm" : comp.business_hours.start + "am"}{" "}
                    to{" "}{comp.business_hours.end === 12 ? "12pm" : comp.business_hours.end === 0 ? "12am" : comp.business_hours.end > 12 ? ((comp.business_hours.end) % 12) + "pm" : comp.business_hours.end + "am"}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col mb-2">
            Group every service by checking the place which is better for you!
            {Object.entries(cityNumbered).map((key, i) => {
              return (
                <Checkbox
                  isChecked={liveFilters.indexOf(key[0]) !== -1}
                  className={"checkbox-tag"}
                  colorScheme="red"
                  onChange={() => {
                    setFiltersModal(key[0]);
                  }}
                >
                  {key[0]} ({key[1]})
                </Checkbox>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompanyList;
