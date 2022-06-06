//
// Copyright 2022 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  Models.swift
//  WKNDAdventures
//

import Foundation

/// # Models
/// This file contains the Swift structs that map to the JSON objects in the AEM Headless responses used by this iOS application.
///
/// ```
/// {                                   // Adventures
///    data: {                          // Data
///      adventureList: {               // AdventuresList
///        items: [
///          {                          // Adventure
///            title: "My Adventure"
///            slug: "my-adventure"
///            ...
///          }
///        ]
///      }
///    }
/// }
/// ```

struct Adventures: Decodable {
    let data: Data
}

struct Data: Decodable {
    let adventureList: AdventureList
}

struct AdventureList: Decodable {
    let items: [Adventure]
}

/// # Adventure
/// Models a WKND adventure from the JSON response.
/// This is a common model used for both the resulting data of the `wknd/adventures-all` and `wknd/adventure-by-slug` persisted queries, therefore some field are options.
class Adventure: Identifiable, Decodable {
    
    enum CodingKeys: String, CodingKey {
        case title
        case slug
        case price
        case tripLength
        case activity
        case difficulty
        case description
        case itinerary
        case primaryImage
    }
    
    private let primaryImage: Image
    private let descriptionMultiLine: MultiLine?
    private let itineraryMultiLine: MultiLine?
    
    let id: UUID = UUID()
    let title: String
    let slug: String
    let tripLength: String
    let activity: String?
    let difficulty: String?

    var price: Double?

    var description: String {
        return descriptionMultiLine?.plaintext ?? ""
    }
    
    var itinerary: String {
        return itineraryMultiLine?.plaintext ?? ""
    }
    
    func image() -> String {
        if !self.primaryImage._path.isEmpty  {
            return self.primaryImage._path
        }
        
        return ""
    }
    
    func isEmpty() -> Bool {
        return slug.isEmpty
    }
    
    required init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        
        // Required fields
        title = try values.decode(String.self, forKey: .title)
        slug = try values.decode(String.self, forKey: .slug)
        price = try values.decode(Double.self, forKey: .price)
        tripLength = try values.decode(String.self, forKey: .tripLength)
        primaryImage = try values.decode(Image.self, forKey: .primaryImage)

        // Optional fields
        activity = try values.decodeIfPresent(String.self, forKey: .activity)
        difficulty = try values.decodeIfPresent(String.self, forKey: .difficulty)
        descriptionMultiLine = try values.decodeIfPresent(MultiLine.self, forKey: .description)
        itineraryMultiLine = try values.decodeIfPresent(MultiLine.self, forKey: .itinerary)
    }
    
    init(title: String, slug: String, price: Double, tripLength: String, activity: String, difficulty: String, descriptionMultiLine: MultiLine?, itineraryMultiLine: MultiLine?, primaryImage: Image) {
        self.title = title
        self.slug = slug
        self.price = price
        self.tripLength = tripLength
        self.activity = activity
        self.difficulty = difficulty
        self.descriptionMultiLine = descriptionMultiLine
        self.itineraryMultiLine = itineraryMultiLine
        self.primaryImage = primaryImage
    }
           
    static func empty() -> Adventure {
        return Adventure(title: "", slug: "", price: 0, tripLength: "", activity: "", difficulty: "", descriptionMultiLine: nil, itineraryMultiLine: nil, primaryImage: Image(_path: "", mimeType: "", width: 0, height: 0))
    }
}

struct Image: Decodable {
    let _path: String
    let mimeType: String
    let width: Int
    let height: Int
}

struct MultiLine: Decodable {
    let plaintext: String?
    let html: String?
}
