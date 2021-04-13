export function heroteaserByPath(_path) {
  return `{
    adventureByPath(_path: "${_path}") {
      item {
        adventureTitle
        adventureDescription {
          html
        }
        adventurePrimaryImage {
          ... on ImageRef {
            _path
            width
            height
          }
        }
      }
    }
  }
`
}
