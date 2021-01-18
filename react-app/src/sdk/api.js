/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const fetch = require('cross-fetch');

const {
  AEM_GRAPHQL_ACTIONS,
  AEM_AUTHORIZATION,
  AEM_GRAPHQL_ENDPOINT,
  AEM_HOST_URI
} = require('./config');

/**
 * Returns a Promise that resolves with a POST request JSON data.
 *
 * @param {string} query - the query string
 * @param {string} [endpoint] - GraphQL endpoint, default env.AEM_GRAPHQL_ENDPOINT
 * @param {object} [options] - additional POST request options, default {}
 * @param {string} [auth] - user:pass auth string
 * @returns {Promise<any>} - the response body wrapped inside a Promise
 */
async function postQuery(query, endpoint = AEM_GRAPHQL_ENDPOINT, options = {}, auth) {
  return await handleRequest(endpoint, JSON.stringify({query}), options, auth);
}

/**
 * Returns a Promise that resolves with a PUT request JSON data.
 *
 * @param {string} query - the query string
 * @param {string} endpoint - AEM path to save query, format: /<configuration name>/<endpoint name>
 * @param {object} [options] - additional PUT request options, default {}
 * @param {string} [auth] - user:pass auth string
 * @returns {Promise<any>} - the response body wrapped inside a Promise
 */
async function saveQuery(query, endpoint, options = {}, auth) {
  const url = `${AEM_GRAPHQL_ACTIONS.persist}/${endpoint}`;
  return await handleRequest(url, query, { method: 'PUT', ...options}, auth);
}

/**
 * Returns a Promise that resolves with a GET request JSON data.
 *
 * @param {string} endpoint - AEM path for persisted query, format: /<configuration name>/<endpoint name>
 * @param {object} [options] - additional GET request options, default {}
 * @param {string} [auth] - user:pass auth string
 * @returns {Promise<any>} - the response body wrapped inside a Promise
 */
async function getQuery(endpoint, options = {}, auth) {
  const url = `${AEM_GRAPHQL_ACTIONS.execute}/${endpoint}`;
  return await handleRequest(url, '', { method: 'GET', ...options}, auth);
}

/**
 * Returns a Promise that resolves with a GET request JSON data.
 *
 * @param {object} [options] additional GET request options, default {}
 * @param {string} [auth] user:pass auth string
 * @returns {Promise<any>} the response body wrapped inside a Promise
 */
async function listQueries(options = {}, auth) {
  return await handleRequest(AEM_GRAPHQL_ACTIONS.list, '', { method: 'GET', ...options}, auth);
}

/**
 * Returns a Promise that resolves with a PUT request JSON data.
 *
 * @param {string} endpoint Request endpoint
 * @param {string} data the query string
 * @param {object} [options] Request options
 * @param {string} [auth] user:pass auth string, default env.AEM_AUTHORIZATION
 * @returns {Promise<any>} the response body wrapped inside a Promise
 */
async function handleRequest(endpoint, data, options, auth = AEM_AUTHORIZATION) {
  const requestOptions = getRequestOptions(data, options, auth);
  const url = getUrl(endpoint);
  let result;

  try {
    result = await fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
  } catch (e) {
    result = e;
  }

  return result;
}

/**
 * Returns request Header object with Basic auth.
 *
 * @param {string} auth user:pass auth string
 * @returns {object} request Header object with Basic auth set
 */
const addAuthHeader = (auth) => {
  const headers = {};
  if (auth) {
    const token = Buffer.from(auth, 'utf8').toString('base64');
    headers['Authorization'] = `Basic ${token}`
  }

  return headers;
};

/**
 * Returns an object for Request options
 *
 * @param {string} data - Request body
 * @param {object} [options] Additional Request options
 * @param {string} [auth] user:pass auth string
 * @returns {object} the Request options object
 */
const getRequestOptions = (data, options, auth) => {
  const { method = 'POST' } = options;

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (auth) {
    requestOptions.headers = {
      ...requestOptions.headers,
      ...addAuthHeader(auth)
    };
    requestOptions.credentials = 'include';
  }

  return {
    method,
    ...data ? { body: data } : {},
    ...requestOptions,
    ...options
  };
};

/**
 * Returns valid url or path.
 *
 * @param {string} path
 * @returns {string} valid url for nodeJs or path for a Browser
 */
const getUrl = (path) => {
  const host = typeof window === 'undefined' ? AEM_HOST_URI : '';
  let url = {};
  try {
    url = new URL(path)
  } catch (e) {}

  if (url.hostname) {
    return url;
  }

  return `${host}${path}`;
};

module.exports = {
  postQuery,
  saveQuery,
  getQuery,
  listQueries
};
