import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserManage from "../services/UserManage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

const SingleVet = () => {
    const navigate = useNavigate();
    return(
        <div
            data-theme="lemonade"
            className="flex h-screen flex-1"
            style={{
                flexDirection: "column",
                justifyContent: "space-between",
                maxHeight: "100%",
            }}
        >
            <div className="flex flex-1" style={{ height: "4rem", maxHeight: "4rem" }}>
                <Navbar />
            </div>

            <div className="flex flex-1 flex-col m-3" style={{ height: "auto" }}>
                <div id="vetName" className="text-3xl font-bold sm:text-5xl md:text-7xl">Name Surname</div>
                <div id="mainPetInfo" className="mt-3 ml-2"><span class="font-bold sm:text-xl">Main pet of interest:</span>
                    <ul id="mainPetList" className="ml-4">
                        <li>Gatto</li>
                        <li>Cane</li>
                        <li>Anatra</li>
                    </ul>
                </div>
                <div id="studyInfo" className="mt-3 ml-2"><span class="font-bold sm:text-xl">Study info:</span>
                    <ul id="studyList" className="ml-4">
                        <li>Laurea in veterinaria presso Alma Mater Studiorum</li>
                        <li>Laurea sugli uccelli</li>
                    </ul>
                </div>
                <div id="experienceInfo" className="mt-3 ml-2"><span class="font-bold sm:text-xl">Professional experience:</span>
                    <ul id="experienceList" className="ml-4">
                        <li>Clinica animali storti di Correggio</li>
                        <li>Ambulatorio di riconversione per gattini omosessuali</li>
                        <li>Ospedale per guarire becchi rotti degli ornitorinchi</li>
                    </ul>
                </div>
                <div id="jobInfo" className="mt-3 ml-2"><span class="font-bold sm:text-xl">Actual jobs:</span>
                    <ul id="jobList" className="ml-4">
                        <li>Anestesia e terapia del dolore</li>
                        <li>Chirurgia tessuti molli (e meno molli...)</li>
                        <li>Neurologia</li>
                    </ul>
                </div>
                <div id="locationInfo" className="mt-3 ml-2"><span class="font-bold sm:text-xl">Workplaces:</span>
                    <ul id="locationList" className="ml-4">
                        <li>Bologna</li>
                        <li>Corticella</li>
                        <li>Mordano</li>
                    </ul>
                </div>
                <div id="bookBtn" className="flex flex-1 justify-center">
                    <button className="btn btn-primary" onClick={navigate("/bookVetVisit")}>Book a visit</button>
                </div>
            </div>
            <div className="flex flex-1" style={{ height: "auto" }}>
                <Footer />
            </div>
        </div>
    );
};

export default SingleVet;