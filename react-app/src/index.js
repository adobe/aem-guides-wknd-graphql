/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ModelManager } from "@adobe/aem-spa-page-model-manager";

import { CustomModelClient } from './server/CustomModelClient';

const { REACT_APP_HOST_URI, REACT_APP_AUTHORIZATION } = process.env;

const modelClient = new CustomModelClient(REACT_APP_HOST_URI, REACT_APP_AUTHORIZATION);
ModelManager.initializeAsync({
    modelClient
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
