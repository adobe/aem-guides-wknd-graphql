/*
Copyright 2022 Adobe
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
 * Queries a list of all Adventures using the persisted path "wknd-shared/adventures-all"
 * @returns {data, errors}
 */
export const getAllAdventures = async function() {
    return executePersistedQuery('wknd-shared/adventures-all');
}

/**
 * Queries a single adventure based on its slug to a content fragment
 * uses persisted path 'wknd-shared/adventure-by-slug'
 * @param {*} adventurePath 
 * @returns 
 */
 export const getAdventureBySlug = async function(adventureSlug) {
    const queryVariables = {'slug': adventureSlug};
    return executePersistedQuery('wknd-shared/adventure-by-slug', queryVariables);
}

/**
 * Filters a list of adventures by activity 
 * using the persisted path 'wknd-shared/adventures-by-activity'
 * @param {*} activityType 
 * @returns 
 */
export const getAdventuresByActivity = async function(activityType) {
    const queryVariables = { 'activity': activityType }; // expected query variables
    return executePersistedQuery('wknd-shared/adventures-by-activity', queryVariables);
}

/**
 * Queries a single adventure based on a path to a content fragment
 * uses persisted path 'wknd-shared/adventures-by-path'
 * @param {*} adventurePath 
 * @returns 
 */
export const getAdventureByPath = async function(adventurePath) {
    const queryVariables = {'adventurePath': adventurePath};
    return executePersistedQuery('wknd-shared/adventures-by-path', queryVariables);
}

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
