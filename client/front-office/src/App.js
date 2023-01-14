import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import RestorePass from "./views/RestorePass";
import Profile from "./views/Profile";
import ProfilePets from "./views/ProfilePets";
import Login from "./components/Login";
import Forum from "./views/Forum";
import ECommerce from "./views/eCommerce";
import Leaderboard from "./views/Leaderboard";
import Cart from "./views/Cart";
import CompanyList from "./views/CompanyList";
import SpecialistPage from "./components/SpecialistPage";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restore" element={<RestorePass />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/pets" element={<ProfilePets />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/compra" element={<ECommerce />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/vet" element={<CompanyList type="vet" />} />
          <Route path="/petsitter" element={<CompanyList type="petsitter" />} />
          <Route path="/psychologist" element={<CompanyList type="psy" />} />
          <Route path="/grooming" element={<CompanyList type="groomer" />} />
          <Route path="/boards" element={<Leaderboard />} />
          <Route path="/specialistpage/:id" element={<SpecialistPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
