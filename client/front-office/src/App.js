import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import RestorePass from "./views/RestorePass";
import Profile from "./views/Profile";
import Login from "./components/Login";
import Forum from "./views/Forum";
import ECommerce from "./views/eCommerce";
import SingleVet from "./views/singleVet";
import BookVetVisit from "./views/bookVetVisit";
import Cart from "./views/Cart";
import CompanyList from "./views/CompanyList";

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
          <Route path="/forum" element={<Forum />} />
          <Route path="/compra" element={<ECommerce />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/vet" element={<CompanyList type="vet" />} />
          <Route path="/petsitter" element={<CompanyList type="petsitter" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
