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
import { mapJsonRichText } from '../utils/renderRichText';
import './AdventureDetail.scss';


function AdventureDetail(props) {

    //parse the content fragment from the url
    const contentFragmentPath = props.location.pathname.substring(props.match.url.length);

    //Use a custom React Hook to execute the GraphQL query
    const { data, errorMessage } = useGraphQL(adventureDetailQuery(contentFragmentPath));

    //If there is an error with the GraphQL query
    if(errorMessage) return <Error errorMessage={errorMessage} />;

    //If data is null then return a loading icon...
    if(!data) return <Loading />;

    //Set adventure properties variable based on graphQL response
    const {_path, 
           adventureTitle, 
           adventurePrimaryImage, 
           adventureActivity,
           adventureType, 
           adventureTripLength,
           adventureGroupSize,
           adventureDifficulty,
           adventurePrice,
           adventureDescription,
           adventureItinerary,
           adventureContributor } = data.adventureByPath.item;
    
    // set references of current adventure
    const references = data.adventureByPath._references;

    //Must have title, path, and image
    if(!_path || !adventureTitle || !adventurePrimaryImage) {
      return (
        <div className="adventure-detail">
          <Link className="adventure-detail-close-button" to={"/"}>
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
          </Link>
          <Error errorMessage="Missing data, adventure could not be rendered." />
        </div>
      );
    }
    
    return (
        <div className="adventure-detail">
          <Link className="adventure-detail-close-button" to={"/"}>
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
          </Link>
          <h1 className="adventure-detail-title">{adventureTitle}</h1>
          <div className="adventure-detail-info">
            <div className="adventure-detail-info-label">Activity</div>
            <div className="adventure-detail-info-description">{adventureActivity}</div>
            <div className="adventure-detail-info-label">Type</div>
            <div className="adventure-detail-info-description">{adventureType}</div>
            <div className="adventure-detail-info-label">Trip Length</div>
            <div className="adventure-detail-info-description">{adventureTripLength}</div>
            <div className="adventure-detail-info-label">Group Size</div>
            <div className="adventure-detail-info-description">{adventureGroupSize}</div>
            <div className="adventure-detail-info-label">Difficulty</div>
            <div className="adventure-detail-info-description">{adventureDifficulty}</div>
            <div className="adventure-detail-info-label">Price</div>
            <div className="adventure-detail-info-description">{adventurePrice}</div>
          </div>
          <div className="adventure-detail-content">
            <img className="adventure-detail-primaryimage"
                 src={adventurePrimaryImage._path} alt={adventureTitle}/>
            <div>{mapJsonRichText(adventureDescription.json, customRenderOptions(references))}</div>
            <h2>Itinerary</h2>
            <hr />

            {/* Render the itinerary without any custom render options (just use defaults) */}
            <div className="adventure-detail-itinerary">{mapJsonRichText(adventureItinerary.json)}</div>
            <Contributer {...adventureContributor} />
          </div>

        </div>
    );
}

/**
 * Example of using a custom render for in-line references in a multi line field
 */
function customRenderOptions(references) {

    const renderReference = {
        // node contains merged properties of the in-line reference and _references object
        'ImageRef': (node) => {
            // when __typename === ImageRef
           return <img src={node._path} alt={'in-line reference'} /> 
        },
        'AdventureModel': (node) => {
            // when __typename === AdventureModel
            return <Link to={`/adventure:${node._path}`}>{`${node.adventureTitle}: ${node.adventurePrice}`}</Link>;
        }
    };

    return {
        nodeMap: {
            'reference': (node, children) => {

                // variable for reference in _references object
                let reference;
                
                // asset reference
                if(node.data.path) {
                    // find reference based on path
                    reference = references.find( ref => ref._path === node.data.path);
                }
                // Fragment Reference
                if(node.data.href) {
                    // find in-line reference within _references array based on href and _path properties
                    reference = references.find( ref => ref._path === node.data.href);
                }

                // if reference found return render method of it
                return reference ? renderReference[reference.__typename]({...reference, ...node}) : null;
            }
        },
    };
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
            json
          }
          adventureItinerary {
            json
          }
      }
      _references {
        ...on ImageRef {
          _path
          __typename
          width
          height
        }
        ...on AdventureModel {
          _path
          __typename
          adventureTitle
          adventurePrice
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
