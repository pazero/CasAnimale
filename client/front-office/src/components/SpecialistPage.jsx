import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Review from "../components/ReviewItem";
import PrenotationManage from "../services/PrenotationManage";
import CompanyManage from "../services/CompanyManage";
import UserManage from "../services/UserManage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import Select from "react-select";
import vetclinic from "../assets/vet-clinic.png";
import { Checkbox, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Divider } from "@chakra-ui/react";

const SpecialistPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [companyPrenotation, setCompanyPrenotation] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [company, setCompany] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [cities, setCities] = useState([]);
  const [rcities, setRCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [user, setUser] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const ret = await UserManage.getUser();
        setUser(ret.data);
      } catch (e) {
        console.log(e);
        setUser(null);
      }

      CompanyManage.getCompany(params.id).then(async (res) => {
        if (res.data.photo === undefined) res.data.photo = vetclinic;

        res.data.review = await Promise.all(
          res.data.review.map(async (item) => {
            const { data: userReviewData } = await UserManage.getUser(
              item.user
            );
            return {
              user: userReviewData,
              content: item.content,
              date: item.date,
            };
          })
        );

        setCompany(res.data);
      });

      PrenotationManage.getPrenotations({ company: params.id }).then((res) => {
        setCompanyPrenotation(res.data);
      });
    }
    fetchData();
    calcSlot(getDateString(new Date()));
  }, []);

  useEffect(() => {
    if (company?.cities) {
      var arr = {};
      Object.keys(company.cities).forEach((key) => {
        if (!arr[company.cities[key]]) arr[company.cities[key]] = [];
        arr[company.cities[key]].push(key);
      });
      setCities(arr);

      var arr2 = [];
      Object.keys(arr).forEach((v) => {
        arr2.push({ value: v, label: v });
      });
      setRCities(arr2);
    }
  }, [company]);

  function chooseTime(e) {
    let time = e.value;
    let len = time.length;
    let moment = time[len - 2] + time[len - 1];
    let hours = "";

    hours += time[0] + (len > 3 ? time[1] : "");
    time = moment === "pm" ? +hours + 12 : +hours;
    time += ":00";
    setStartTime(time);
  }

  const newDate = (s) => {
    return new Date(s);
  };

  const getDateTimeString = (s) => {
    var d = newDate(s);
    return (
      d.getFullYear().toString() +
      "/" +
      ((d.getMonth() + 1).toString().length === 2
        ? (d.getMonth() + 1).toString()
        : "0" + (d.getMonth() + 1).toString()) +
      "/" +
      (d.getDate().toString().length === 2
        ? d.getDate().toString()
        : "0" + d.getDate().toString()) +
      " " +
      (d.getHours().toString().length === 2
        ? d.getHours().toString()
        : "0" + d.getHours().toString()) +
      ":" +
      ((parseInt(d.getMinutes() / 5) * 5).toString().length === 2
        ? (parseInt(d.getMinutes() / 5) * 5).toString()
        : "0" + (parseInt(d.getMinutes() / 5) * 5).toString())
    );
  };

  //formato mese/giorno/anno
  const getDateString = (s) => {
    var d = newDate(s);
    return (
      ((d.getMonth() + 1).toString().length === 2
        ? (d.getMonth() + 1).toString()
        : "0" + (d.getMonth() + 1).toString()) +
      "/" +
      (d.getDate().toString().length === 2
        ? d.getDate().toString()
        : "0" + d.getDate().toString()) +
      "/" +
      d.getFullYear().toString()
    );
  };
  //restituisce solo l'ora dato che gli slot vanno di ora in ora
  const getHoursString = (s) => {
    var d = newDate(s);
    return d.getHours().toString();
  };

  useEffect(() => {
    const array = [];
    companyPrenotation?.forEach((item) => {
      array.push(getDateTimeString(item.start));
    });
  }, [companyPrenotation]);

  const bookSlot = async (isOnline, companyId, start) => {
    var res;
    if (isOnline) {
      res = await PrenotationManage.newPrenotation({
        place: "online",
        company: companyId,
        start: start,
        duration: 1,
      });
    } else {
      res = await PrenotationManage.newPrenotation({
        place: selectedCity,
        company: companyId,
        start: start,
        duration: 1,
      });
    }
    alert(res.data.message);
    window.location.reload();
  };

  function calcSlot(slotDay) {
    let start = company.business_hours?.start;
    let end = company.business_hours?.end;
    let interval = end - start;
    if (interval <= 0) alert("It is not possible to book an appointment");
    let slots = [];
    const booked = [];
    companyPrenotation?.forEach((item) => {
      //seleziono solo le prenotazioni fatte nella data selezionata
      if (getDateString(item.start).localeCompare(slotDay) === 0)
        booked.push(getHoursString(item.start));
    });
    let actual_time = getHoursString(new Date());

    for (let i = 0; i < interval; i++) {
      //se lo slot non è incluso lo aggiungo a availableSlots che poi userò per riempire il select
      if (!booked.includes((start + i).toString())) {
        if (slotDay.localeCompare(getDateString(new Date())) === 0) {
          if (+actual_time >= +(start + i).toString()) {
            continue;
          }
        }
        let start_app =
          start + i > 12 ? ((start + i) % 12) + "pm" : start + i + "am";
        let end_app =
          start + i + 1 > 12
            ? ((start + i + 1) % 12) + "pm"
            : start + i + 1 + "am";

        let moment = start_app + " - " + end_app;
        slots.push({ value: start_app, label: moment });
      }
    }
    setAvailableSlots(slots);
  }
  const setFilter = (date) => {
    if(date === 1 && selectedCity === company.cities?.monday) return true;
    if(date === 2 && selectedCity === company.cities?.tuesday) return true;
    if(date === 3 && selectedCity === company.cities?.wednesday) return true;
    if(date === 4 && selectedCity === company.cities?.thursday) return true;
    if(date === 5 && selectedCity === company.cities?.friday) return true;
    return false;
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
          id="specialistName"
          className="my-4 md:mt-6 md:mb-5 self-center text-center text-3xl font-semibold sm:text-5xl md:text-6xl uppercase"
        >
          {company.name}
        </div>
        <div className="md:text-center sm:text-lg">
          <div id="companyPhoto" className="flex justify-center shrink-0 pb-5">
            <img
              src={company.photo}
              alt=""
              className="max-w-full h-auto rounded-full"
              resizemode="cover"
              style={{ aspectRatio: 1, height: "10rem", width: "10rem" }}
            ></img>
          </div>

          <div id="presentation">
            {company.owner !== undefined ? (
              <span className="py-1">
                {company.type === "vet" || company.type === "psy" ? (
                  <span>The experienced Doctor </span>
                ) : company.type === "groomer" ? (
                  <span>The expert grommer </span>
                ) : (
                  <span>The expert pet sitter </span>
                )}
                <span id="ownerName" className="font-bold">
                  {company.owner}
                </span>
              </span>
            ) : (
              <div id="ownerName" className="ml-4">
                Specialist {company._id}
              </div>
            )}
            <span> will take care of your pet.</span>
            {company.main_pets !== undefined ? (
              company.main_pets.length !== 0 ? (
                <div className="py-1">
                  They are mainly specialized in{" "}
                  <span>
                    {company.main_pets?.map((item, i) => (
                      <span key={i}>
                        <span className="font-bold">{item}</span>
                        {company.main_pets.length !== i + 1 ? ", " : "."}
                      </span>
                    ))}
                  </span>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {company.study_info !== undefined ? (
              company.study_info?.length !== 0 ? (
                <div className="py-1">
                  Their study carrer includes{" "}
                  <span>
                    {company.study_info?.map((item, i) => (
                      <span key={i}>
                        <span className="font-bold">{item}</span>
                        {company.study_info.length !== i + 1 ? ", " : "."}
                      </span>
                    ))}
                  </span>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {company.professional_experience !== undefined ? (
              company.professional_experience.length !== 0 ? (
                <div className="py-1">
                  {company.owner} has got many skills through their working
                  experience as{" "}
                  <span>
                    {company.professional_experience?.map((item, i) => (
                      <span key={i}>
                        <span className="font-bold">{item}</span>
                        {company.professional_experience.length !== i + 1
                          ? ", "
                          : "."}
                      </span>
                    ))}
                  </span>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {company.actual_jobs !== undefined ? (
              company.actual_jobs?.length !== 0 ? (
                <div className="py-1">
                  Moreover,{" "}
                  <span>
                    {company.actual_jobs?.map((item, i) => (
                      <span key={i}>
                        <span className="font-bold">{item}</span>
                        {company.actual_jobs?.length === i + 2
                          ? " and "
                          : company.actual_jobs?.length === i + 1
                          ? " "
                          : ", "}
                      </span>
                    ))}
                    is what {company.owner} is actually practicing.
                  </span>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {
              <div className="py-1">
                {Object.keys(cities).length === 1 ? (
                  <span>At the moment, {company.owner} only work in </span>
                ) : (
                  <span>Actual cities where {company.owner} work are </span>
                )}
                {Object.keys(cities).map((value, i) => {
                  return (
                    <span key={i}>
                      <span className="font-bold"> {value}</span>
                      {Object.keys(cities).length !== i + 1 ? ", " : "."}
                    </span>
                  );
                })}
              </div>
            }

            {company.cost_per_hour !== undefined ? (
              <div>
                <span>
                  Appointment cost per hour is{" "}
                  <span id="cost" className="font-bold">
                    {company.cost_per_hour}€/h
                  </span>
                  .
                </span>
              </div>
            ) : (
              ""
            )}
            {company.online !== undefined && (
              <div>
                Takes appointment <span className="font-bold">online</span>{" "}
                also, but only if you are a vip user!
              </div>
            )}

            <div className="hidden sm:flex mt-6 mb-0 flex justify-center grow-0">
              <TableContainer className="border rounded">
                <Table variant="simple" className="">
                  <Thead>
                    <Tr>
                      <Th>Monday</Th>
                      <Th>Tuesday</Th>
                      <Th>Wednesday</Th>
                      <Th>Thursday</Th>
                      <Th>Friday</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{company.cities?.monday}</Td>
                      <Td>{company.cities?.tuesday}</Td>
                      <Td>{company.cities?.wednesday}</Td>
                      <Td>{company.cities?.thursday}</Td>
                      <Td>{company.cities?.friday}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            <div className="flex sm:hidden mt-6 mb-0 flex flex-col justify-center mx-2 ">
              <TableContainer className="border rounded">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr className="">
                      <Th>Monday</Th>
                      <Th>Tuesday</Th>
                      <Th>Wednesday</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr className="">
                      <Td>{company.cities?.monday}</Td>
                      <Td>{company.cities?.tuesday}</Td>
                      <Td>{company.cities?.wednesday}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <TableContainer className="border rounded mt-2 mx-12">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Thursday</Th>
                      <Th marginRight={"1rem"}>Friday</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{company.cities?.thursday}</Td>
                      <Td>{company.cities?.friday}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

        {token ? (
          <div className="flex flex-1 justify-center py-6 md:pt-10">
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="btn btn-secondary mt-2 mb-4"
            >
              Book an appointment
            </button>
          </div>
        ) : (
          <div className="flex flex-1 justify-center py-6 md:pt-10">
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in to book an appointment
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
                    <h3 className="text-3xl font-semibold">
                      Book an appointment!
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {user.vip && company.online !== undefined ? (
                      <Checkbox
                        className="mb-2"
                        size="lg"
                        colorScheme="orange"
                        onChange={() => {
                          setIsOnline(!isOnline);
                        }}
                      >
                        Online
                      </Checkbox>
                    ) : (
                      ""
                    )}

                    {!isOnline && (
                      <div className="mb-2">
                        <span className="font-bold">Place:</span>
                        <Select
                          options={rcities}
                          onChange={(e) => setSelectedCity(e.value)}
                        />
                      </div>
                    )}

                    {/*<BookVetVisit style={{ display: "flex", height: "100%" }} />*/}
                    <div className="font-bold">Data</div>
                    <div>
                      <DatePicker
                        id="slotDay"
                        className="text-center border-solid border-4 rounded-lg px-1"
                        selected={startDate}
                        placeholderText="Select a day"
                        onChange={(date) => {
                          setStartDate(date);
                          calcSlot(getDateString(date));
                        }}
                        minDate={new Date()}
                        filterDate={(date) => {
                          if(!isOnline)
                            return setFilter(date.getDay()) && date.getDay() !== 0 && date.getDay() !== 6;
                          else return date.getDay() !== 0 && date.getDay() !== 6;
                        }}
                      />
                    </div>
                    <div className="font-bold">
                      Schedule
                      <div id="slotSelect" className="font-normal">
                        <Select
                          options={availableSlots}
                          onChange={chooseTime}
                        />
                      </div>
                    </div>
                    <div className="font-bold">
                      Duration <span className="font-normal">1 hour</span>
                    </div>
                    <div className="font-bold">
                      Total price{" "}
                      <span className="font-normal">
                        €{company.cost_per_hour}
                      </span>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="btn-primary rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        if (startTime) {
                          bookSlot(
                            isOnline,
                            params.id,
                            new Date(
                              document.getElementById("slotDay").value +
                                " " +
                                startTime
                            )
                          );
                          setShowModal(false);
                        } else {
                          alert("You must schedule your appointment");
                        }
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {setShowModal(false); setIsOnline(false); setStartDate(); setSelectedCity(); setStartTime()}}
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
        <div className="flex justify-center my-1 md:my-4">
          <Divider orientation='horizontal' width='80%' justify='center' border='0.2rem' borderColor='gray.300' />
        </div>
        <div className="flex justify-center">
          <Review data={company} user={user} />
        </div>
      </div>
      <div className="flex flex-1" style={{ height: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default SpecialistPage;
