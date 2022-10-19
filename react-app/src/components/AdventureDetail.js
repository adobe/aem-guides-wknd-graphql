/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
import backIcon from '../images/icon-close.svg';
import Error from './Error';
import Loading from './Loading';
import { mapJsonRichText } from '../utils/renderRichText';
import './AdventureDetail.scss';
import { getAdventureBySlug } from '../api/persistedQueries';

function AdventureDetail() {

    // params hook from React router
    const { slug } = useParams();
    const navigate = useNavigate();
    const [response, setResponse] = useState();

    useEffect(() => {
        // set response to null on change
        setResponse();
        //parse the adventure slug from the substring
        const adventureSlug = slug.substring(1);
        // execute persisted query based on the adventure slug
        getAdventureBySlug(adventureSlug)
            .then(response => setResponse(response));
    }, [slug]);
    

    //If query response is null then return a loading icon...
    if(!response) return <Loading />;

    //If there is an error with the GraphQL query
    if(response && response.errors) return <Error errorMessage={response.errors} />;


    //Set adventure properties variable based on graphQL response
    const currentAdventure = getAdventure(response);
    
    // set references of current adventure
    const references = response.data.adventureList._references;

    //Must have title, path, and image
    if( !currentAdventure) {
      return <NoAdventureFound />;
    }
    
    return (<div className="adventure-detail">
        <button className="adventure-detail-close-button" onClick={() => navigate(-1)} >
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
        </button>
        <AdventureDetailRender {...currentAdventure} references={references}/>
    </div>);
}

function AdventureDetailRender({title, 
                                primaryImage, 
                                activity,
                                adventureType, 
                                tripLength,
                                groupSize,
                                difficulty,
                                price,
                                description,
                                itinerary,
                                contributor, references}) {

    return (<>
            <h1 className="adventure-detail-title">{title}</h1>
            <div className="adventure-detail-info">
                <div className="adventure-detail-info-label">Activity</div>
                <div className="adventure-detail-info-description">{activity}</div>
                <div className="adventure-detail-info-label">Type</div>
                <div className="adventure-detail-info-description">{adventureType}</div>
                <div className="adventure-detail-info-label">Trip Length</div>
                <div className="adventure-detail-info-description">{tripLength}</div>
                <div className="adventure-detail-info-label">Group Size</div>
                <div className="adventure-detail-info-description">{groupSize}</div>
                <div className="adventure-detail-info-label">Difficulty</div>
                <div className="adventure-detail-info-description">{difficulty}</div>
                <div className="adventure-detail-info-label">Price</div>
                <div className="adventure-detail-info-description">
                    <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
            </div>
            <div className="adventure-detail-content">
                <img className="adventure-detail-primaryimage"
                    src={primaryImage._path} alt={title}/>
            <div>{mapJsonRichText(description.json, customRenderOptions(references))}</div>
            <h2>Itinerary</h2>
            <hr />

            {/* Render the itinerary without any custom render options (just use defaults) */}
            <div className="adventure-detail-itinerary">{mapJsonRichText(itinerary.json)}</div>
            <Contributer {...contributor} />
            </div>
    </>
    );

}

function NoAdventureFound() {
    return (
    <div className="adventure-detail">
        <Link className="adventure-detail-close-button" to={"/"}>
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
        </Link>
        <Error errorMessage="Missing data, adventure could not be rendered." />
  </div>
  );
}

/**
 * Helper function to get the first adventure from the response
 * @param {*} response 
 */
function getAdventure(response) {

    if(response && response.data && response.data.adventureList && response.data.adventureList.items) {
        // expect there only to be a single adventure in the array
        if(response.data.adventureList.items.length === 1) {
            return response.data.adventureList.items[0];
        }
    }
    return undefined;
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
            return <Link to={`/adventure:${node.slug}`}>{`${node.title}: ${node.price}`}</Link>;
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


export default AdventureDetail;
