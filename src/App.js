import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import Dispatcher from "./pages/dispatcher/Dispatcher";
import Customer from "./pages/customer/Customer";
import Deliverer from "./pages/deliverer/Deliverer";
import Deliveries from "./pages/deliveries/Deliveries";
import PickupBoxes from "./pages/pickup-boxes/PickupBoxes";
import Register from "./pages/register/Register";
import Dispatcher from "./pages/dispatcher/Dispatcher";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/dispatcher" element={<Dispatcher />} />
        <Route exact path="/dispatchers" element={<Dispatcher />} />
        <Route exact path="/customers" element={<Customer />} />
        <Route exact path="/deliverers" element={<Deliverer />} />
        <Route exact path="/deliveries" element={<Deliveries />} />
        <Route exact path="/pickup-boxes" element={<PickupBoxes />} />
        <Route exact path="/sign-up" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
