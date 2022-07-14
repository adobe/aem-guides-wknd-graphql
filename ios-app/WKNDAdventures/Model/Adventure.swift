//
//  Adventure.swift
//  WKNDAdventures
//
//  Created by Daniel Gordon on 9/29/21.
//

import Foundation

struct Adventure: Decodable {
    var _path: String
    var adventureTitle: String
    var adventureDifficulty: String
    
    init(_ adventureData: AdventureData?) {
        self._path = adventureData?._path ?? ""
        self.adventureTitle = adventureData?.adventureTitle ?? ""
        self.adventureDifficulty = adventureData?.adventureDifficulty ?? ""
    }
}

struct Wrapper<T: Decodable>: Decodable {
    let items: [T]
}

