import React from 'react';

import Adventures from './Adventures';
import { AEMText } from './AEMText';
import AEMPage from './AEMPage';

/***
 * Displays a grid of current adventures
 */
function Home() {
  return (
    <div className="Home">
      <h2>Current Adventures</h2>
      <AEMPage
        pagePath='/content/wknd-spa-react/us/en/home' />
      <Adventures />
      <AEMText
        pagePath='/content/wknd-spa-react/us/en/home'
        itemPath='/root/responsivegrid/text20' />
    </div>
  );
}

export default Home;
