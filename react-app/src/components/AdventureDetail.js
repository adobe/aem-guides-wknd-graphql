/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
import backIcon from '../images/icon-close.svg';
import Error from './Error';
import Loading from './Loading';
import { mapJsonRichText } from '../utils/renderRichText';
import './AdventureDetail.scss';
import { getAdventureByPath } from '../api/persistedQueries';
import AEMResponsiveGrid from './aem/AEMResponsiveGrid';

const { REACT_APP_PUBLIC_URI } = process.env;

function AdventureDetail() {

    const location = useLocation();

    //parse the content fragment from the url location
    const contentFragmentPath = location.pathname.substring(`/adventure:`.length);

    // useHistory as react-router-dom is still on old version to avoid conflict with aem-core-components-react-XX upstream dependencies
    const history = useHistory();
    const [response, setResponse] = useState();

    useEffect(() => {
        // set response to null on change
        setResponse();

        // execute persisted query based on the adventure slug
        getAdventureByPath(contentFragmentPath)
            .then(response => setResponse(response));
    }, [contentFragmentPath]);


    //If query response is null then return a loading icon...
    if (!response) return <Loading />;

    //If there is an error with the GraphQL query
    if (response && response.errors) return <Error errorMessage={response.errors} />;

    //Set adventure properties variable based on graphQL response
    const currentAdventure = getAdventure(response);

    //Must have title, path, and image
    if (!currentAdventure) {
        return <NoAdventureFound />;
    }

    return (
        <AdventureDetailRender {...currentAdventure}  history={history}/>
    );
}

function AdventureDetailRender({ _path,
    title,
    primaryImage,
    activity,
    adventureType,
    tripLength,
    groupSize,
    difficulty,
    price,
    description,
    itinerary,
    contributor, history }) {


    // Get the last segment of the Adventure Content Fragment path to used to generate the pagePath for the AEMResponsiveGrid
    const adventureName = _path.split('/').pop();
    return (<div className="adventure-detail">
        <button className="adventure-detail-close-button" onClick={() => history.goBack()}>
            <img className="Backbutton-icon" src={REACT_APP_PUBLIC_URI + '/' + backIcon} alt="Return" />
        </button>
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
                src={primaryImage._path} alt={title} />
            <div dangerouslySetInnerHTML={{ __html: description.html }}></div>

            <AEMResponsiveGrid
                pagePath={`/content/wknd-app/us/en/home/adventure/${adventureName}`}
                itemPath="root/responsivegrid" />

            <h2>Itinerary</h2>
            <hr />

            <div className="adventure-detail-itinerary"
                dangerouslySetInnerHTML={{ __html: itinerary.html }}></div>
        </div>
    </div>
    );

}

function NoAdventureFound() {
    return (
        <div className="adventure-detail">
            <Link className="adventure-detail-close-button" to={"/"}>
                <img className="Backbutton-icon" src={REACT_APP_PUBLIC_URI + '/' + backIcon} alt="Return" />
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

    if (response && response.data && response.data.adventureByPath && response.data.adventureByPath.item) {
        return response.data.adventureByPath.item;
    }
    return undefined;
}

export default AdventureDetail;
