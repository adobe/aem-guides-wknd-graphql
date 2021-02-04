/**
 * Path to saved query for all Adventures
 */
export const persistentPath = 'wknd/adventures-all';
/**
 * Query for all Adventures
 */
export const allAdventuresQuery = `
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

/**
 * Returns a query for Adventures filtered by activity
 */
export function filterQuery(activity) {
  return `
    {
      adventureList (filter: {
        adventureActivity: {
          _expressions: [
            {
              value: "${activity}"
            }
          ]
        }
      }){
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
}
