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
      <AEMText
      pagePath='/content/wknd-spa/home'
      itemPath='/root/responsivegrid/text' />
      <AEMPage
        pagePath='/content/wknd-spa/home' />
      <Adventures />

    </div>
  );
}

export default Home;
