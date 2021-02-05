/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import {useState, useEffect} from 'react';

const { REACT_APP_HOST_URI, REACT_APP_GRAPHQL_ENDPOINT, REACT_APP_AUTHORIZATION } = process.env;

/*
    Custom React Hook to perform a GraphQL query
    query paramter is a GraphQL query
    environment variable REACT_APP_GRAPHQL_ENDPOINT is used to point to endpoint in AEM
*/
function useGraphQL(query, skipCall) {

    let [data, setData] = useState(null);
    let [errorMessage, setErrors] = useState(null);

    useEffect(() => {
        if(!skipCall) {
            window.fetch(
            REACT_APP_HOST_URI + REACT_APP_GRAPHQL_ENDPOINT,
            {
                method: 'POST',
                headers: getHttpHeaders(),
                body: JSON.stringify({query}),
            }
            ).then(response => response.json())
            .then(({data, errors}) => {
                //If there are errors in the response set the error message
                if(errors) {
                    setErrors(mapErrors(errors));
                }
                //Otherwise if data in the response set the data as the results
                if(data) {
                    setData(data);
                }
            })
            .catch((error) => {
                setErrors(error);
            });
        }
    }, [query, skipCall]);

    return {data, errorMessage}
}

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
function mapErrors(errors) {
    return errors.map((error) => error.message).join(",");
}

function getHttpHeaders() {
    // set headers and include authorization if authorization set
    let httpHeaders = new Headers();
    httpHeaders.append('Content-Type', 'application/json');
    if(REACT_APP_AUTHORIZATION) {
        httpHeaders.append('Authorization', 'Basic ' + btoa(REACT_APP_AUTHORIZATION))
    }
    return httpHeaders;
}

export default useGraphQL
