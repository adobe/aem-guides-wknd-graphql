/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAdventuresByActivity } from "../api/usePersistedQueries";
import { addAemHost } from "../api/aemHeadlessClient";
import Error from "./Error";
import Loading from "./Loading";
import './Adventures.scss';

function Adventures({ adventureActivity }) {
    const queryParameters = useMemo(() => ({ format: 'JPG', preferWebp: true, size: { width: 240, height: 200 } }), []);
    const { adventures, error } = useAdventuresByActivity(adventureActivity, queryParameters);

    // Handle error and loading conditions
    if (error) {
        return <Error errorMessage={error} />;
    } else if (!adventures) {
        return <Loading />;
    }

    return (
        <div className="adventures">
            <ul className="adventure-items">
                {adventures.map((adventure, index) => {
                    return <AdventureListItem key={index} {...adventure} />
                })}
            </ul>
        </div>
    );
}

// Render individual Adventure item
function AdventureListItem({ title, slug, primaryImage, tripLength, price }) {
    // Must have title, path, and image
    if (!title || !title || !primaryImage) {
        return null;
    }

    return (
        <li className="adventure-item">
            <Link to={`/adventure/${slug}`}>
                <img className="adventure-item-image" src={addAemHost(primaryImage._dynamicUrl || primaryImage._path)}
                    alt={title} />
            </Link>
            <div className="adventure-item-length-price">
                <div className="adventure-item-length">{tripLength}</div>
                <div className="adventure-item-price">
                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price)}
                </div>
            </div>
            <div className="adventure-item-title">{title}</div>
        </li>
    );
}

export default Adventures;