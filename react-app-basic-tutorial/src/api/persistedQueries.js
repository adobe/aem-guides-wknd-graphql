/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

/**
 * persistedQueries.js - provides a wrapper utility of persisted queries that are expected to be available on the AEM environment
 */
import { aemHeadlessClient , mapErrors} from "./headlessClient";

/**
 * Uses the AEM Headless SDK to execute a query besed on a persistedQueryPath and optional query variables
 * @param {*} persistedQueryPath 
 * @param {*} queryVariables 
 * @returns 
 */
 const executePersistedQuery = async function(persistedQueryPath, queryVariables) {

    let data;
    let errors;

    try {
        // AEM GraphQL queries are asynchronous, either await their return or use Promise-based .then(..) { ... } syntax
        const response = await aemHeadlessClient.runPersistedQuery(persistedQueryPath, queryVariables);
        // The GraphQL data is stored on the response's data field
        data = response.data;
        errors = response.errors ? mapErrors(response.errors) : undefined;
    } catch (e) {
        console.error(e.toJSON());
        errors = e;
    }

    return {data, errors}; 

}

/**
 * Queries the list of teams using the persisted path "my-project/all-teams"
 * @returns {data, errors}
 */
 export const getAllTeams = async function() {
    return executePersistedQuery('my-project/all-teams');
}

/**
 * Queries a list of all persons using the persisted path "my-project/all-persons"
 * @returns {data, errors}
 */
export const getAllPersons = async function() {
    return executePersistedQuery('my-project/all-persons');
}

export const getPersonByName = async function(name) {
    const queryVariables = { 'name': name }; // expected query variables
    return executePersistedQuery('my-project/person-by-name', queryVariables);
}
/**
 * Filters a list of persons by occupation
 * using the persisted path 'my-project/person-by-occupation'
 * @param {*} occupation 
 * @returns 
 */
export const getPersonByOccupation = async function(occupation) {
    const queryVariables = { 'occupation': occupation }; // expected query variables
    return executePersistedQuery('my-project/person-by-occupation', queryVariables);
}