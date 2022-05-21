const {AEMHeadless} = require('@adobe/aem-headless-client-js');

// environment variable REACT_APP_GRAPHQL_ENDPOINT is used to point to endpoint in AEM
const {
    REACT_APP_HOST_URI,
    REACT_APP_GRAPHQL_ENDPOINT,
  } = process.env;

// Use the AEM Headless SDK to make the GraphQL requests
const aemHeadlessClient = new AEMHeadless({
      serviceURL: REACT_APP_HOST_URI,
      endpoint: REACT_APP_GRAPHQL_ENDPOINT
})

export const getAllAdventures = async function() {
    const persistedQueryPath = 'wknd/adventures-all';
    let data;
    let errors;

    try {
        // AEM GraphQL queries are asynchronous, either await their return or use Promise-based .then(..) { ... } syntax
        const response = await aemHeadlessClient.runPersistedQuery(persistedQueryPath);
        // The GraphQL data is stored on the response's data field
        data = response.data;
        errors = mapErrors(response.errors);
    } catch (e) {
        console.error(e.toJSON());
        errors = e;
    }

    return {data, errors}; 
}

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
 function mapErrors(errors) {
    return errors.map((error) => error.message).join(",");
}