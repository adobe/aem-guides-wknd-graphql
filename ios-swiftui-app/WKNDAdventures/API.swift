// @generated
//  This file was automatically generated and should not be edited.

import Apollo
import Foundation

public final class AdventureListQuery: GraphQLQuery {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    query AdventureList {
      adventureList {
        __typename
        items {
          __typename
          _path
          adventureTitle
          adventurePrice
          adventureActivity
          adventureDescription {
            __typename
            plaintext
            markdown
          }
          adventureDifficulty
          adventureTripLength
          adventurePrimaryImage {
            __typename
            ... on ImageRef {
              _authorUrl
              _publishUrl
              _path
            }
          }
        }
      }
    }
    """

  public let operationName: String = "AdventureList"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["QueryType"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("adventureList", type: .nonNull(.object(AdventureList.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(adventureList: AdventureList) {
      self.init(unsafeResultMap: ["__typename": "QueryType", "adventureList": adventureList.resultMap])
    }

    /// Get multiple `adventure` objects
    public var adventureList: AdventureList {
      get {
        return AdventureList(unsafeResultMap: resultMap["adventureList"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "adventureList")
      }
    }

    public struct AdventureList: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["AdventureModelResults"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("items", type: .nonNull(.list(.object(Item.selections)))),
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(items: [Item?]) {
        self.init(unsafeResultMap: ["__typename": "AdventureModelResults", "items": items.map { (value: Item?) -> ResultMap? in value.flatMap { (value: Item) -> ResultMap in value.resultMap } }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var items: [Item?] {
        get {
          return (resultMap["items"] as! [ResultMap?]).map { (value: ResultMap?) -> Item? in value.flatMap { (value: ResultMap) -> Item in Item(unsafeResultMap: value) } }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Item?) -> ResultMap? in value.flatMap { (value: Item) -> ResultMap in value.resultMap } }, forKey: "items")
        }
      }

      public struct Item: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["AdventureModel"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("_path", type: .scalar(GraphQLID.self)),
            GraphQLField("adventureTitle", type: .scalar(String.self)),
            GraphQLField("adventurePrice", type: .scalar(String.self)),
            GraphQLField("adventureActivity", type: .scalar(String.self)),
            GraphQLField("adventureDescription", type: .object(AdventureDescription.selections)),
            GraphQLField("adventureDifficulty", type: .scalar(String.self)),
            GraphQLField("adventureTripLength", type: .scalar(String.self)),
            GraphQLField("adventurePrimaryImage", type: .object(AdventurePrimaryImage.selections)),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(_path: GraphQLID? = nil, adventureTitle: String? = nil, adventurePrice: String? = nil, adventureActivity: String? = nil, adventureDescription: AdventureDescription? = nil, adventureDifficulty: String? = nil, adventureTripLength: String? = nil, adventurePrimaryImage: AdventurePrimaryImage? = nil) {
          self.init(unsafeResultMap: ["__typename": "AdventureModel", "_path": _path, "adventureTitle": adventureTitle, "adventurePrice": adventurePrice, "adventureActivity": adventureActivity, "adventureDescription": adventureDescription.flatMap { (value: AdventureDescription) -> ResultMap in value.resultMap }, "adventureDifficulty": adventureDifficulty, "adventureTripLength": adventureTripLength, "adventurePrimaryImage": adventurePrimaryImage.flatMap { (value: AdventurePrimaryImage) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var _path: GraphQLID? {
          get {
            return resultMap["_path"] as? GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "_path")
          }
        }

        public var adventureTitle: String? {
          get {
            return resultMap["adventureTitle"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "adventureTitle")
          }
        }

        public var adventurePrice: String? {
          get {
            return resultMap["adventurePrice"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "adventurePrice")
          }
        }

        public var adventureActivity: String? {
          get {
            return resultMap["adventureActivity"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "adventureActivity")
          }
        }

        public var adventureDescription: AdventureDescription? {
          get {
            return (resultMap["adventureDescription"] as? ResultMap).flatMap { AdventureDescription(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "adventureDescription")
          }
        }

        public var adventureDifficulty: String? {
          get {
            return resultMap["adventureDifficulty"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "adventureDifficulty")
          }
        }

        public var adventureTripLength: String? {
          get {
            return resultMap["adventureTripLength"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "adventureTripLength")
          }
        }

        public var adventurePrimaryImage: AdventurePrimaryImage? {
          get {
            return (resultMap["adventurePrimaryImage"] as? ResultMap).flatMap { AdventurePrimaryImage(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "adventurePrimaryImage")
          }
        }

        public struct AdventureDescription: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["MultiFormatString"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("plaintext", type: .scalar(String.self)),
              GraphQLField("markdown", type: .scalar(String.self)),
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(plaintext: String? = nil, markdown: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "MultiFormatString", "plaintext": plaintext, "markdown": markdown])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var plaintext: String? {
            get {
              return resultMap["plaintext"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "plaintext")
            }
          }

          public var markdown: String? {
            get {
              return resultMap["markdown"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "markdown")
            }
          }
        }

        public struct AdventurePrimaryImage: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["PageRef", "ImageRef", "MultimediaRef", "ArchiveRef", "DocumentRef", "ArticleModel", "AdventureModel"]

          public static var selections: [GraphQLSelection] {
            return [
              GraphQLTypeCase(
                variants: ["ImageRef": AsImageRef.selections],
                default: [
                  GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                ]
              )
            ]
          }

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makePageRef() -> AdventurePrimaryImage {
            return AdventurePrimaryImage(unsafeResultMap: ["__typename": "PageRef"])
          }

          public static func makeMultimediaRef() -> AdventurePrimaryImage {
            return AdventurePrimaryImage(unsafeResultMap: ["__typename": "MultimediaRef"])
          }

          public static func makeArchiveRef() -> AdventurePrimaryImage {
            return AdventurePrimaryImage(unsafeResultMap: ["__typename": "ArchiveRef"])
          }

          public static func makeDocumentRef() -> AdventurePrimaryImage {
            return AdventurePrimaryImage(unsafeResultMap: ["__typename": "DocumentRef"])
          }

          public static func makeArticleModel() -> AdventurePrimaryImage {
            return AdventurePrimaryImage(unsafeResultMap: ["__typename": "ArticleModel"])
          }

          public static func makeAdventureModel() -> AdventurePrimaryImage {
            return AdventurePrimaryImage(unsafeResultMap: ["__typename": "AdventureModel"])
          }

          public static func makeImageRef(_authorUrl: String? = nil, _publishUrl: String? = nil, _path: GraphQLID? = nil) -> AdventurePrimaryImage {
            return AdventurePrimaryImage(unsafeResultMap: ["__typename": "ImageRef", "_authorUrl": _authorUrl, "_publishUrl": _publishUrl, "_path": _path])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var asImageRef: AsImageRef? {
            get {
              if !AsImageRef.possibleTypes.contains(__typename) { return nil }
              return AsImageRef(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsImageRef: GraphQLSelectionSet {
            public static let possibleTypes: [String] = ["ImageRef"]

            public static var selections: [GraphQLSelection] {
              return [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("_authorUrl", type: .scalar(String.self)),
                GraphQLField("_publishUrl", type: .scalar(String.self)),
                GraphQLField("_path", type: .scalar(GraphQLID.self)),
              ]
            }

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(_authorUrl: String? = nil, _publishUrl: String? = nil, _path: GraphQLID? = nil) {
              self.init(unsafeResultMap: ["__typename": "ImageRef", "_authorUrl": _authorUrl, "_publishUrl": _publishUrl, "_path": _path])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var _authorUrl: String? {
              get {
                return resultMap["_authorUrl"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "_authorUrl")
              }
            }

            public var _publishUrl: String? {
              get {
                return resultMap["_publishUrl"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "_publishUrl")
              }
            }

            public var _path: GraphQLID? {
              get {
                return resultMap["_path"] as? GraphQLID
              }
              set {
                resultMap.updateValue(newValue, forKey: "_path")
              }
            }
          }
        }
      }
    }
  }
}
