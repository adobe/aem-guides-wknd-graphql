/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AdventureDetail from './components/AdventureDetail';
import Home from './components/Home';
import logo from './images/wknd-logo-dk.svg';

import './App.scss';

const { REACT_APP_PUBLIC_URI } = process.env;

function App() {

  return (
    <Router>
      <div className="App">
        <header>
          <Link to={"/"}>
            <img src={REACT_APP_PUBLIC_URI + '/' + logo} className="logo" alt="WKND Logo" />
          </Link>
          <hr />
        </header>
        <Switch>
          <Route path='/adventure:path'>
            <AdventureDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;