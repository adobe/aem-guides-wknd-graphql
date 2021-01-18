/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Adventures from './components/Adventures/Adventures';
import AdventureDetail from './components/AdventureDetail/AdventureDetail';
import Header from './components/Header/Header';
import './App.scss';

function App() {

  return (
    <Router>
      <div className="App">
        <Header alt="WKND logo"/>
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

/***
 * Displays a grid of current adventures
 */
function Home() {
  return (
    <div className="Home">
      <h2>Current Adventures</h2>
      <Adventures />
  </div>
  );
}


export default App;
