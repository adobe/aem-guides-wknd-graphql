const fetch = require('cross-fetch');

const {
  AEM_GRAPHQL_ACTIONS,
  REACT_APP_AUTHORIZATION,
  REACT_APP_GRAPHQL_ENDPOINT,
  REACT_APP_HOST_URI
} = require('./config');

const host = typeof window === 'undefined' ? REACT_APP_HOST_URI : '';

async function postQuery(query, postEndpoint = REACT_APP_GRAPHQL_ENDPOINT, options = {}, auth = REACT_APP_AUTHORIZATION) {
  return await handleRequest(postEndpoint, JSON.stringify({query}), options, auth);
}

async function saveQuery(saveEndpoint, query, options = {}, auth = REACT_APP_AUTHORIZATION) {
  const url = `${AEM_GRAPHQL_ACTIONS.persist}/${saveEndpoint}`;
  return await handleRequest(url, query, { method: 'PUT', ...options}, auth);
}

async function getQuery(getEndpoint, options = {}, auth = REACT_APP_AUTHORIZATION) {
  const url = `${AEM_GRAPHQL_ACTIONS.execute}/${getEndpoint}`;
  return await handleRequest(url, null, { method: 'GET', ...options}, auth);
}

async function listQueries(options = {}, auth = REACT_APP_AUTHORIZATION) {
  return await handleRequest(AEM_GRAPHQL_ACTIONS.list, null, { method: 'GET', ...options}, auth);
}

async function handleRequest(url, data, options, auth) {
  const requestOptions = getRequestOptions(data, options, auth);

  let result;

  try {
    result = await fetch(`${host}${url}`, requestOptions)
      .then(response => response.json())
  } catch (e) {
    result = e;
  }

  return result;
}

const addAuthHeader = (auth) => {
  const headers = {};
  if (auth) {
    const token = Buffer.from(auth, 'utf8').toString('base64');
    headers['Authorization'] = `Basic ${token}`
  }

  return headers;
};

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
    body: data,
    ...requestOptions,
    ...options
  };
};

module.exports = {
  postQuery,
  saveQuery,
  getQuery,
  listQueries
};
