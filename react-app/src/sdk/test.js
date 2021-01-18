const {
  postQuery,
  saveQuery,
  getQuery,
  listQueries
} = require('./api');

const queryString = `
 {
  personList {
    items {
      _path
      name
      firstName
      _metadata {
        stringMetadata {
          name
          value
        }
      }
    }
  }
}
`;

(async () => {
  const postRegular = await postQuery(queryString);
  const list = await listQueries();
  const savePersist = await saveQuery(queryString, 'wknd/plain-article-query5');
  const getPersist = await getQuery('wknd/plain-article-query5');

  console.log('postRegular', JSON.stringify(postRegular, null, 2));
  console.log('list', JSON.stringify(list, null, 2));
  console.log('savePersist', JSON.stringify(savePersist, null, 2));
  console.log('getPersist', JSON.stringify(getPersist, null, 2));
})();
