export function heroteaserByPath(_path) {
  return `{
    heroteaserByPath(_path: "${_path}") {
      item {
        title
        description {
          html
        }
        image {
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
