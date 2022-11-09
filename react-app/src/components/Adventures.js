/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React from "react";
import CurrencyFormat from 'react-currency-format';
import { Link } from "react-router-dom";
import { useAllAdventures } from "../api/usePersistedQueries";
import './Adventures.scss';
import Error from "./Error";
import Loading from "./Loading";



function Adventures({ adventureActivity }) {

    const { adventures, error } = useAllAdventures(adventureActivity);

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

    //Must have title, path, and image
    if (!title || !title || !primaryImage) {
        return null;
    }
    return (
        <li className="adventure-item">
            <Link to={`/adventure/${slug}`}>
                <img className="adventure-item-image" src={primaryImage._path}
                    alt={title} />
            </Link>
            <div className="adventure-item-length-price">
                <div className="adventure-item-length">{tripLength}</div>
                <div className="adventure-item-price">
                    <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
            </div>
            <div className="adventure-item-title">{title}</div>
        </li>
    );
}

export default Adventures;