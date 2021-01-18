1. Import SDK
```javascript
const {
  postQuery,
  saveQuery,
  getQuery,
  listQueries
} = require('@adobe/aem-graphql-sdk');
```
2. POST query
```javascript
/**
 * Returns a Promise that resolves with a POST request JSON data.
 *
 * @param {string} query - the query string
 * @param {string} [endpoint] - GraphQL endpoint, default env.AEM_GRAPHQL_ENDPOINT
 * @param {object} [options] - additional POST request options, default {}
 * @param {string} [auth] - user:pass auth string
 * @returns {Promise<any>} - the response body wrapped inside a Promise
 */
async function postQuery(query, endpoint = AEM_GRAPHQL_ENDPOINT, options = {}, auth) {}
```
EG:
```javascript
(async () => {
    const postRegular = await postQuery(queryString);
})();
```
3. SAVE persistent query
* Not supported via Webpack Dev Server Proxy. Use NodeJS script or custom NodeJS server.
```javascript
/**
 * Returns a Promise that resolves with a PUT request JSON data.
 *
 * @param {string} query - the query string
 * @param {string} endpoint - AEM path to save query, format: /<configuration name>/<endpoint name>
 * @param {object} [options] - additional PUT request options, default {}
 * @param {string} [auth] - user:pass auth string
 * @returns {Promise<any>} - the response body wrapped inside a Promise
 */
async function getQuery(endpoint, options = {}, auth) {}
```
EG:
```javascript
(async () => {
    const savePersist = await saveQuery(queryString, queryPath);
})();
```
4. LIST all saved queries
```javascript
/**
 * Returns a Promise that resolves with a GET request JSON data.
 *
 * @param {object} [options] additional GET request options, default {}
 * @param {string} [auth] user:pass auth string
 * @returns {Promise<any>} the response body wrapped inside a Promise
 */
async function listQueries(options = {}, auth) {}
```
EG:
```javascript
(async () => {
    const list = await listQueries();
})();
```
5. GET persisted query
```javascript
/**
 * Returns a Promise that resolves with a GET request JSON data.
 *
 * @param {string} endpoint - AEM path for persisted query, format: /<configuration name>/<endpoint name>
 * @param {object} [options] - additional GET request options, default {}
 * @param {string} [auth] - user:pass auth string
 * @returns {Promise<any>} - the response body wrapped inside a Promise
 */
async function getQuery(endpoint, options = {}, auth) {}
```
EG:
```javascript
(async () => {
    const getPersist = await getQuery(queryPath);
})();
```