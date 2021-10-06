//
// Copyright 2021 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  Adventure.swift
//  WKNDAdventures
//

import Foundation

// use typealias to shorten the definition
typealias AdventureData = AdventureListQuery.Data.AdventureList.Item

// Wrapper class to deal with optional and incomplete data from graphql query
struct Adventure: Identifiable {
    let id: String
    let adventureTitle: String
    let adventurePrice: String
    let adventureDescription: String
    let adventureActivity: String
    let adventurePrimaryImageUrl: String
    
    init(adventureData: AdventureData) {
        // use path as unique idenitifer, otherwise
        self.id = adventureData._path ?? UUID().uuidString
        self.adventureTitle = adventureData.adventureTitle ?? "Untitled"
        self.adventurePrice = adventureData.adventurePrice ?? "Free"
        self.adventureActivity = adventureData.adventureActivity ?? ""
        
        if let adventureText = adventureData.adventureDescription?.plaintext {
            self.adventureDescription = adventureText
        } else {
            self.adventureDescription = ""
        }
       
        // Use the Publish URL for our image
        // can add logic to switch between _authorUrl or _publishUrl
        if let imageUrl = adventureData.adventurePrimaryImage?.asImageRef?._publishUrl {
            self.adventurePrimaryImageUrl = imageUrl
        } else {
            self.adventurePrimaryImageUrl = ""
        }
        
    }
    
}
