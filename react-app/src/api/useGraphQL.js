/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import {useState, useEffect} from 'react';
const {AEMHeadless} = require('@adobe/aem-headless-client-js')


// environment variable REACT_APP_GRAPHQL_ENDPOINT is used to point to endpoint in AEM
const { REACT_APP_GRAPHQL_ENDPOINT } = process.env;

/**
 * Custom React Hook to perform a GraphQL query
 * @param query - GraphQL query
 * @param path - Persistent query path
 */
function useGraphQL(query, path) {
    let [data, setData] = useState(null);
    let [errorMessage, setErrors] = useState(null);

    useEffect(() => {
      const sdk = new AEMHeadless(REACT_APP_GRAPHQL_ENDPOINT)
      const request = query ? sdk.postQuery.bind(sdk) : sdk.getQuery.bind(sdk);

      request(query || path)
        .then(({ data, errors }) => {
          //If there are errors in the response set the error message
          if(errors) {
            setErrors(mapErrors(errors));
          }
          //If data in the response set the data as the results
          if(data) {
            setData(data);
          }
        })
        .catch((error) => {
          setErrors(error);
        });
    }, [query, path]);

    return {data, errorMessage}
}

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
function mapErrors(errors) {
    return errors.map((error) => error.message).join(",");
}

export default useGraphQL
