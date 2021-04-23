/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { withRouter, Link} from "react-router-dom";
import useGraphQL from '../api/useGraphQL';
import backIcon from '../images/icon-close.svg';
import Error from './Error';
import Loading from './Loading';
import AEMResponsiveGrid from '../components/aem/AEMResponsiveGrid';

import './AdventureDetail.scss';

const {  REACT_APP_PUBLIC_URI } = process.env;

function AdventureDetail(props) {

    //parse the content fragment from the url
    const contentFragmentPath = props.location.pathname.substring(props.match.url.length);

    //Use a custom React Hook to execute the GraphQL query
    const { data, errorMessage } = useGraphQL(adventureDetailQuery(contentFragmentPath));

    //If there is an error with the GraphQL query
    if(errorMessage) return <Error errorMessage={errorMessage} />;

    //If data is null then return a loading icon...
    if(!data) return <Loading />;

    //Set adventureData variable based on graphQL response
    let adventureData = data.adventureByPath.item;

    // Get the last segment of the Adventure Content Fragment path to used to generate the pagePath for the AEMResponsiveGrid
    const adventureName = adventureData._path.split('/').pop();

    //Must have title, path, and image
    if(!adventureData || !adventureData._path || !adventureData.adventureTitle || !adventureData.adventurePrimaryImage ) {
      return (
        <div className="adventure-detail">
          <Link className="adventure-detail-close-button" to={"/"}>
            <img className="Backbutton-icon" src={REACT_APP_PUBLIC_URI + '/' +backIcon} alt="Return" />
          </Link>
          <Error errorMessage="Missing data, adventure could not be rendered." />
        </div>
      );
    }
    
    return (
        <div className="adventure-detail">
          <Link className="adventure-detail-close-button" to={"/"}>
            <img className="Backbutton-icon" src={REACT_APP_PUBLIC_URI + '/' + backIcon} alt="Return" />
          </Link>
          <h1 className="adventure-detail-title">{adventureData.adventureTitle}</h1>
          <div className="adventure-detail-info">
            <div className="adventure-detail-info-label">Activity</div>
            <div className="adventure-detail-info-description">{adventureData.adventureActivity}</div>
            <div className="adventure-detail-info-label">Type</div>
            <div className="adventure-detail-info-description">{adventureData.adventureType}</div>
            <div className="adventure-detail-info-label">Trip Length</div>
            <div className="adventure-detail-info-description">{adventureData.adventureTripLength}</div>
            <div className="adventure-detail-info-label">Group Size</div>
            <div className="adventure-detail-info-description">{adventureData.adventureGroupSize}</div>
            <div className="adventure-detail-info-label">Difficulty</div>
            <div className="adventure-detail-info-description">{adventureData.adventureDifficulty}</div>
            <div className="adventure-detail-info-label">Price</div>
            <div className="adventure-detail-info-description">{adventureData.adventurePrice}</div>
          </div>
          <div className="adventure-detail-content">
            <img className="adventure-detail-primaryimage"
                 src={adventureData.adventurePrimaryImage._path} alt={adventureData.adventureTitle}/>
            <div dangerouslySetInnerHTML={{__html: adventureData.adventureDescription.html}}></div>
            
            <AEMResponsiveGrid 
                pagePath={`/content/wknd-app/us/en/home/adventure/${adventureName}`}
                itemPath="root/responsivegrid"/>

            <h2>Itinerary</h2>
            <hr />
            <div className="adventure-detail-itinerary"
                 dangerouslySetInnerHTML={{__html: adventureData.adventureItinerary.html}}></div>
            <Contributer {...adventureData.adventureContributor} />
          </div>

        </div>
    );
}

function adventureDetailQuery(_path) {
  return `{
    adventureByPath (_path: "${_path}") {
      item {
        _path
          adventureTitle
          adventureActivity
          adventureType
          adventurePrice
          adventureTripLength
          adventureGroupSize
          adventureDifficulty
          adventurePrice
          adventurePrimaryImage {
            ... on ImageRef {
              _path
              mimeType
              width
              height
            }
          }
          adventureDescription {
            html
          }
          adventureItinerary {
            html
          }
      }
    }
  }
  `;
}

function Contributer(props) {

  if(!props) {
    return null;
  }
  let pictureReference = null;
  if(props.pictureReference) {
     pictureReference =  <img className="contributor-image" src={props.pictureReference._path} alt={props.fullName} />
  }

  return (
    <div className="contributor">
      <hr className="contributor-separator" />
      {pictureReference}
      <h3 className="contributor-name">{props.fullName}</h3>
      <h4 className="contributor-occupation">{props.occupation}</h4>
    </div>);
}


export default withRouter(AdventureDetail);
