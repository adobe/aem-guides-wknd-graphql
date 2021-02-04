/**
 * Path to saved query for all Adventures
 */
const persistentPath = 'wknd/adventures-all';
/**
 * Query for all Adventures
 */
const allAdventuresQuery = `
  {
    adventureList {
      items {
        _path
        adventureTitle
        adventurePrice
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            _path
            mimeType
            width
            height
          }
        }
      }
    }
  }
`;

module.exports = {
  allAdventuresQuery,
  persistentPath
}
