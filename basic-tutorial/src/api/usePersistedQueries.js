/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import aemHeadlessClient from "./aemHeadlessClient";
import { useEffect, useState } from "react";

/**
 * This file contains the React useEffect custom hooks that:
 * 1. Are called by the React components
 * 2. To get data from AEM GraphQL persisted queries
 *
 * Each custom hook maps to a persisted query and is responsible for:
 * 1. Calling the AEM persisted query
 * 2. Collecting and transforming the returned data into the format expected by the React view components
 * 3. Setting and returning any error state
 */

/**
 *  
 */

/**
 * Private, shared function that invokes the AEM Headless client.
 * 
 * @param {String} persistedQueryName the fully qualified name of the persisted query
 * @param {*} queryParameters an optional JavaScript object containing query parameters
 * @returns the GraphQL data or an error message 
 */
async function fetchPersistedQuery(persistedQueryName, queryParameters) {
  //*********************************
  // TODO :: Implement this by following the steps from AEM Headless Tutorial ==> Implement to run AEM GraphQL persisted queries
  // https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/multi-step/graphql-and-react-app.html#implement-to-run-aem-graphql-persisted-queries
  //*********************************
}

/**
 * Custom hook that calls the 'my-project/all-teams' persisted query.
 *
 * @returns an array of Team JSON objects, and array of errors
 */
export function useAllTeams() {

  //*********************************
  // TODO :: Implement this by following the steps from AEM Headless Tutorial ==> Implement Teams functionality
  // https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/multi-step/graphql-and-react-app.html#implement-teams-functionality
  //*********************************
}

/**
 * Calls the 'my-project/person-by-name' and provided the {fullName} as the persisted query's `name` parameter.
 *
 * @param {String!} fullName the full
 * @returns a JSON object representing the person
 */
export function usePersonByName(fullName) {

  //*********************************
  // TODO :: Implement this by following the steps from AEM Headless Tutorial ==> Implement Person functionality
  // https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/multi-step/graphql-and-react-app.html#implement-person-functionality
  //*********************************

}
