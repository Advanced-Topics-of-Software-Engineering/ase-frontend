import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import Dispatcher from "./pages/dispatcher/Dispatcher";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/dispatcher" element={<Dispatcher />} />
      </Routes>
    </Router>
  );
}

export default App;
