/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { useParams } from "react-router-dom";
import { useAdventureBySlug } from "../api/usePersistedQueries";
import Error from "./Error";
import Loading from "./Loading";


function AdventureDetail() {

    // Read the slug value which is the parameter used to query for the adventure's details
    const { slug } = useParams();

    // Query AEM for the Adventures's details, using the `slug`
    const { currentAdventure, error } = useAdventureBySlug(slug);

    // Handle error and loading conditions
    if (error) {
        return <Error errorMessage={error} />;
    } else if (!currentAdventure) {
        return <Loading />;
    }

    return (
        <h3>AdventureDetail coming soon</h3>
    );
}

export default AdventureDetail;
