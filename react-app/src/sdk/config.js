const { REACT_APP_AUTHORIZATION, REACT_APP_GRAPHQL_ENDPOINT, REACT_APP_HOST_URI } = process.env;

const AEM_GRAPHQL_ACTIONS = {
  persist: '/graphql/persist.json',
  execute: '/graphql/execute.json',
  list: '/graphql/list.json'
};

module.exports = {
  AEM_GRAPHQL_ACTIONS,
  REACT_APP_AUTHORIZATION,
  REACT_APP_GRAPHQL_ENDPOINT,
  REACT_APP_HOST_URI
};
