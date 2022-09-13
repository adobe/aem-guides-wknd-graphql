/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, {useState} from 'react';
import Adventures from './Adventures';
import { ResponsiveGrid } from '@adobe/aem-react-editable-components';
import EditableTitle from './editable/EditableTitle';
// The following need to be imported, so that MapTo is run for the components
import EditableText from './editable/EditableText';
import EditableImage from './editable/EditableImage';

/***
 * Displays a grid of current adventures
 */
function Home(){

    const[adventureActivity, setAdventureActivity] = useState('');

    return(
        <div className="Home">
        <ResponsiveGrid
            pagePath='/content/wknd-app/us/en/home'
            itemPath='root/responsivegrid'/>

        <EditableTitle
            pagePath='/content/wknd-app/us/en/home'
            itemPath='root/title'/>

        <div className="adventure-nav">
          <button onClick={()=> setAdventureActivity('')}>All</button>
          <button onClick={()=> setAdventureActivity('Camping')}>Camping</button>
          <button onClick={()=> setAdventureActivity('Surfing')}>Surfing</button>
        </div>

      <Adventures adventureActivity={adventureActivity}/>
  </div>
    );
}

export default Home;
