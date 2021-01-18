const { AEM_AUTHORIZATION, AEM_GRAPHQL_ENDPOINT, AEM_HOST_URI } = process.env;

const AEM_GRAPHQL_ACTIONS = {
  persist: '/graphql/persist.json',
  execute: '/graphql/execute.json',
  list: '/graphql/list.json'
};

module.exports = {
  AEM_GRAPHQL_ACTIONS,
  AEM_GRAPHQL_ENDPOINT,
  AEM_AUTHORIZATION,
  AEM_HOST_URI
};

