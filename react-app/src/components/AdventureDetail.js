/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import { useAdventureBySlug } from "../api/usePersistedQueries";
import { addAemHost } from "../api/aemHeadlessClient";

import backIcon from '../images/icon-close.svg';
import { mapJsonRichText } from '../utils/renderRichText';
import './AdventureDetail.scss';
import Error from "./Error";
import Loading from "./Loading";

function AdventureDetail() {

    // Read the slug value which is the parameter used to query for the adventure's details
    const { slug } = useParams();
    const queryParameters = useMemo(() => ({ format: 'JPG', preferWebp: true, width: 1200}), []);
    // Query AEM for the Adventures's details, using the `slug`
    const { adventure, references, error } = useAdventureBySlug(slug, queryParameters);

    // Handle error and loading conditions
    if (error) {
        return <Error errorMessage={error} />;
    } else if (!adventure) {
        return <Loading />;
    }

    return (<div className="adventure-detail">
        <Link className="adventure-detail-close-button"  to="/">
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
        </Link>
        <AdventureDetailRender {...adventure} references={references} />
    </div>);

}

function AdventureDetailRender({ title,
    primaryImage,
    activity,
    adventureType,
    tripLength,
    groupSize,
    difficulty,
    price,
    description,
    itinerary,
    references }) {

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
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
            </div>
        </div>
        <div className="adventure-detail-content">
            <img className="adventure-detail-primaryimage"
                src={addAemHost(primaryImage._dynamicUrl || primaryImage._path)} alt={title} />
            <div>{mapJsonRichText(description.json, customRenderOptions(references))}</div>
            <h2>Itinerary</h2>
            <hr />

            {/* Render the itinerary without any custom render options (just use defaults) */}
            <div className="adventure-detail-itinerary">{mapJsonRichText(itinerary.json)}</div>
        </div>
    </>
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
            return <Link to={`/adventure:${node.slug}`}>{`${node.title}: ${node.price}`}</Link>;
        }
    };

    return {
        nodeMap: {
            'reference': (node, children) => {

                // variable for reference in _references object
                let reference;

                // asset reference
                if (references && node.data.path) {
                    // find reference based on path
                    reference = references.find(ref => ref._path === node.data.path);
                }
                // Fragment Reference
                if (references && node.data.href) {
                    // find in-line reference within _references array based on href and _path properties
                    reference = references.find(ref => ref._path === node.data.href);
                }

                // if reference found return render method of it
                return reference ? renderReference[reference.__typename]({ ...reference, ...node }) : null;
            }
        },
    };
}

export default AdventureDetail;
