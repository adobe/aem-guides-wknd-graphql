/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);