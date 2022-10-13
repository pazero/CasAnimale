import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import RestorePass from "./views/RestorePass";
import Profile from "./views/Profile";
import Login from "./components/Login";
import Forum from "./views/Forum";
import ECommerce from "./views/eCommerce";

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
        </Routes>
      </Router>
    </>
  );
};

export default App;
