/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import { useState, useEffect } from "react";
import { aemHeadlessClient, mapErrors } from "./headlessClient";

/**
 * Custom React Hook to perform a GraphQL query using POST
 * Executing a GraphQL query directly using POST should ONLY be done during development.
 * For production always use Persisted Queries see persistedQueries.js
 *
 * @param query - GraphQL query
 */
export default function useGraphQL(query) {
  let [data, setData] = useState(null);
  let [errors, setErrors] = useState(null);

  useEffect(() => {
    async function runGraphQLQuery() {
      try {
        const response = await aemHeadlessClient.runQuery(query);

        if (response.errors) setErrors(mapErrors(response.errors));
        if (response.data) setData(response.data);
      } catch (e) {
        console.error(e.toJSON());
        setErrors(e);
      }
    }

    if (query && query !== "") {
      runGraphQLQuery();
    }
  }, [query]);

  return { data, errors };
}
