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

// Initialize the ModelManager before invoking ReactDOM.render(...).
ModelManager.initializeAsync();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
