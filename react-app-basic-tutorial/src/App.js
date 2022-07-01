/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./images/wknd-icon.svg";
import Home from "./components/Home";
import Person from "./components/Person";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to={"/"}>
            <img src={logo} className="logo" alt="WKND Logo" />
          </Link>
          <hr />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/person/:fullName" element={<Person />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
