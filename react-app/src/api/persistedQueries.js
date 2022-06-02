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
 * Queries a list of all Adventures using the persisted path "wknd/adventures-all"
 * @returns {data, errors}
 */
export const getAllAdventures = async function() {
    return executePersistedQuery('wknd/adventures-all');
}
/**
 * Filters a list of adventures by activity 
 * using the persisted path 'wknd/adventures-by-activity'
 * @param {*} activityType 
 * @returns 
 */
export const getAdventuresByActivity = async function(activityType) {
    const queryVariables = { 'activity': activityType }; // expected query variables
    return executePersistedQuery('wknd/adventures-by-activity', queryVariables);
}

/**
 * Queries a single adventure based on its slug to a content fragment
 * uses persisted path 'wknd/adventure-by-slug'
 * @param {*} adventurePath 
 * @returns 
 */
 export const getAdventureBySlug = async function(adventureSlug) {
    const queryVariables = {'slug': adventureSlug};
    return executePersistedQuery('wknd/adventure-by-slug', queryVariables);
}

/**
 * Queries a single adventure based on a path to a content fragment
 * uses persisted path 'wknd/adventures-by-path'
 * @param {*} adventurePath 
 * @returns 
 */
export const getAdventureByPath = async function(adventurePath) {
    const queryVariables = {'adventurePath': adventurePath};
    return executePersistedQuery('wknd/adventures-by-path', queryVariables);
}
