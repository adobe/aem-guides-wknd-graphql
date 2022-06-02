/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

// Use the AEM Headless SDK to make the GraphQL requests
const {AEMHeadless} = require('@adobe/aem-headless-client-js');

// environment variable REACT_APP_GRAPHQL_ENDPOINT is used to point to endpoint in AEM
const {
    REACT_APP_HOST_URI,
    REACT_APP_GRAPHQL_ENDPOINT,
    NODE_ENV
  } = process.env;



// In a production application the serviceURL should be set to the production AEM Publish environment
// In development the serviceURL is relative proxy is used (see ../authMethods.js) to avoid CORS issues
const serviceURL = NODE_ENV === 'development' ? '/' : REACT_APP_HOST_URI;

// In development a relative URL request and proxy (see ../authMethods.js)
// This avoids CORS issues see https://create-react-app.dev/docs/proxying-api-requests-in-development/
export const aemHeadlessClient = new AEMHeadless({
    serviceURL: serviceURL,
    endpoint: REACT_APP_GRAPHQL_ENDPOINT
});

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
export const mapErrors = function(errors) {
    return errors.map((error) => error.message).join(",");
}