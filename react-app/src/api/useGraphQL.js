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
const {
    REACT_APP_HOST_URI,
    REACT_APP_GRAPHQL_ENDPOINT,
  } = process.env;

// Use the AEM Headless SDK to make the GraphQL requests
const sdk = new AEMHeadless({
      serviceURL: REACT_APP_HOST_URI,
      endpoint: REACT_APP_GRAPHQL_ENDPOINT
  })

/**
 * Custom React Hook to perform a Persisted GraphQL query
 * uses the AEM Headless SDK to execute the query
 * Persisted queries should be the ONLY queries used in a production app
 * @param persistedPath - the short path to the persisted query
 * @param fragmentPathParam - optional parameters object that can be passed in for parameterized persistent queries
 */
 export function useGraphQLPersisted(persistedPath, fragmentPathVariable) {
    let [data, setData] = useState(null);
    let [errors, setErrors] = useState(null);

    useEffect(() => {


        let queryVariables = {};

        // we pass in a primitive fragmentPathVariable (String) and then construct the object {fragmentPath: fragmentPathParam} to pass as query params to the persisted query
        // It is simpler to pass a primitive into a React hooks, as comparing the state of a dependent object can be difficult. 
        //see https://reactjs.org/docs/hooks-faq.html#can-i-skip-an-effect-on-updates
        if(fragmentPathVariable) {
            queryVariables = {fragmentPath: fragmentPathVariable};
        }

        sdk.runPersistedQuery(persistedPath, queryVariables)
            .then(({ data, errors }) => {
            if (errors) setErrors(mapErrors(errors));
            if (data) setData(data);
        })
        .catch((error) => {
          setErrors(error);
        });
  }, [persistedPath, fragmentPathVariable]);

  return { data, errors }
}

/**
 * Custom React Hook to perform a GraphQL query using POST
 * Executing a GraphQL query directly using POST should ONLY be done during development
 * for production use cases use Persisted Queries
 * 
 * @param query - GraphQL query
 */
 export function useGraphQL(query) {
    let [data, setData] = useState(null);
    let [errors, setErrors] = useState(null);
  
    useEffect(() => {
      sdk.runQuery(query)
          .then(({ data, errors }) => {
            if (errors) setErrors(mapErrors(errors));
            if (data) setData(data);
          })
          .catch((error) => {
            setErrors(error);
          });
    }, [query]);
  
    return { data, errors }
  }

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
function mapErrors(errors) {
    return errors.map((error) => error.message).join(",");
}
