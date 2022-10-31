/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useState} from 'react';
import Adventures from './Adventures';

/***
 * Displays a grid of current adventures
 */
 function Home() {
    const [adventureActivity, setAdventureActivity] = useState('');

    return (
      <div className="Home">
        <h2>Current Adventures</h2>
        <Adventures adventureActivity={adventureActivity} />
    </div>
    );
}

export default Home;
