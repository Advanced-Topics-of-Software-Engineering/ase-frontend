import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import AskConfirmationBeforeSave from "./pages/account/Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/account" element={<AskConfirmationBeforeSave />} />
      </Routes>
    </Router>
  );
}

export default App;
