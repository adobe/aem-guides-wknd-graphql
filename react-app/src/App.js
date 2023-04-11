/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import logo from "./images/wknd-logo-dk.svg";
import Home from "./components/Home";
import AdventureDetail from "./components/AdventureDetail";
import { Link } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <header>
        <Link to={"/"}>
          <img src={logo} className="logo" alt="WKND Logo"/>
        </Link>        
        <hr />
        </header>
        <Routes>
          <Route path='/adventure/:slug' element={<AdventureDetail />}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
