import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import RestorePass from "./views/RestorePass";
import Profile from "./views/Profile";
import ProfilePets from "./views/ProfilePets";
import ProfilePrenotations from "./views/ProfilePrenotations";
import Login from "./components/Login";
import Forum from "./views/Forum";
import HelpMe from "./views/HelpMe";
import FindPartner from "./views/FindPartner";
import ECommerce from "./views/eCommerce";
import Leaderboard from "./views/Leaderboard";
import Cart from "./views/Cart";
import Thread from "./views/Thread";
import CompanyList from "./views/CompanyList";
import Cookies from "js-cookie";
import SpecialistPage from "./components/SpecialistPage";
import NotificationItem from "./views/Notifications";
import { useToast } from "@chakra-ui/react";

const App = () => {
  const toast = useToast();

  useEffect(() => {
    const token = Cookies.get("tokenback");
    if (token) {
      toast({
        title: "Log out from back office first!",
        status: "error",
        duration: 3000,
        variant: "subtle",
      });
      window.location.href = "http://localhost:5000/b/views/home.html";
    }
  }, []);

  return (
    <>
      <Router basename="/f">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restore" element={<RestorePass />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/pets" element={<ProfilePets />} />
          <Route
            path="/profile/prenotations"
            element={<ProfilePrenotations />}
          />
          <Route path="/profile/notifications" element={<NotificationItem />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/helpme" element={<HelpMe />} />
          <Route path="/findpartner" element={<FindPartner />} />
          <Route path="/compra" element={<ECommerce />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/vet" element={<CompanyList type="vet" />} />
          <Route path="/petsitter" element={<CompanyList type="petsitter" />} />
          <Route path="/psychologist" element={<CompanyList type="psy" />} />
          <Route path="/grooming" element={<CompanyList type="groomer" />} />
          <Route path="/boards" element={<Leaderboard />} />
          <Route path="/specialistpage/:id" element={<SpecialistPage />} />
          <Route path="/thread/:id" element={<Thread />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
