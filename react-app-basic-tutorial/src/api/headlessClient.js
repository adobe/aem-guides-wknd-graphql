/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

// Use the AEM Headless SDK to make the GraphQL requests
const { AEMHeadless } = require('@adobe/aem-headless-client-js');

// environment variable for confguring the headless client
const {
    REACT_APP_HOST_URI,
    REACT_APP_GRAPHQL_ENDPOINT,
    REACT_APP_USE_PROXY,
    REACT_APP_AUTH_METHOD,
    REACT_APP_DEV_TOKEN,
    REACT_APP_BASIC_AUTH_USER,
    REACT_APP_BASIC_AUTH_PASS
} = process.env;



// In a production application the serviceURL should be set to the production AEM Publish environment
// In development the serviceURL can be set to '/' which will be a relative proxy is used (see ../authMethods.js) to avoid CORS issues
const serviceURL = REACT_APP_USE_PROXY === 'true' ? '/' : REACT_APP_HOST_URI;

// Get authorization based on environment variables
// authorization is not needed when connecting to Publish environments
const setAuthorization = function () {
    if (REACT_APP_AUTH_METHOD === 'basic') {
        return [REACT_APP_BASIC_AUTH_USER, REACT_APP_BASIC_AUTH_PASS];
    } else if (REACT_APP_AUTH_METHOD === 'dev-token') {
        return REACT_APP_DEV_TOKEN;
    } else {
        // no authentication set
        return;
    }
}

export const aemHeadlessClient = new AEMHeadless({
    serviceURL: serviceURL,
    endpoint: REACT_APP_GRAPHQL_ENDPOINT,
    auth: setAuthorization()
});

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
export const mapErrors = function (errors) {
    return errors.map((error) => error.message).join(",");
}