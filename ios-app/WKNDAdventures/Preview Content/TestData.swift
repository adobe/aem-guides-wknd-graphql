//
// Copyright 2021 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  TestData.swift
//  WKNDAdventures
//

import Foundation

struct TestAdventuresAll {
    static func get() -> [Adventure] {
        let json = """
            {
            "data": {
              "adventureList": {
                "items": [
                  {
                    "_path": "/content/dam/wknd/en/adventures/bali-surf-camp/bali-surf-camp",
                    "title": "Bali Surf Camp",
                    "slug": "bali-surf-camp",
                    "price": "5000.00",
                    "tripLength": "6 Days",
                    "primaryImage": {
                      "_dynamicUrl": "/content/dam/wknd/en/adventures/bali-surf-camp/AdobeStock_175749320.jpg"
                    }
                  },
                  {
                    "_path": "/content/dam/wknd/en/adventures/beervana-portland/beervana-in-portland",
                    "title": "Beervana in Portland",
                    "slug": "beervana-portland",
                    "price": "300.00",
                    "tripLength": "1 Day",
                    "primaryImage": {
                      "_dynamicUrl": "/content/dam/wknd/en/adventures/beervana-portland/AdobeStock_279232449.jpeg"
                    }
                  }]
              }
            }
            """.data(using: .utf8)!
        
            let adventures = try! JSONDecoder().decode(Adventures.self, from: json)
            return adventures.data.adventureList.items
    }
}


struct TestAdventureBySlug {
    static func get() -> Adventure {
        let json = """
            {
              "data": {
                "adventureList": {
                  "items": [
                    {
                      "_path": "/content/dam/wknd/en/adventures/bali-surf-camp/bali-surf-camp",
                      "title": "Bali Surf Camp",
                      "slug": "bali-surf-camp",
                      "activity": "Surfing",
                      "adventureType": "Overnight Trip",
                      "price": "5000.00",
                      "tripLength": "6 Days",
                      "groupSize": 6,
                      "difficulty": "Beginner",
                      "primaryImage": {
                        "_dynamicUrl": "/content/dam/wknd/en/adventures/bali-surf-camp/AdobeStock_175749320.jpg"
                      },
                      "description": {
                        "plaintext": "Surfing in Bali is on the bucket list of every surfer - whether you're a beginner or someone who's been surfing for decades, there will be a break to cater to your ability. Bali offers warm water, tropical vibes, awesome breaks and low cost expenses."
                      },
                      "itinerary": {
                        "plaintext": "Keramas\n\nThe most famous break in Bali is home to a WSL stop and features a fast barrelling right-hand reef break. One of Bali's most consistent waves, you'll have fun on waves from 2ft to 20 ft.\n\nNusa Dua\n\nHome to the best right handers in Bali, Nusa Dua is famous for big wave surfing and is suitable for the advanced surfers in the group. The Nusa Dua reef has numerous waves that break on different tides and slightly different conditions.\n\nSanur\n\nLocated on the East coast, Sanur only breaks when there is a big swell and is at it's best when it's well overhead. Waves break over a very sharp reef so be prepared to leave some skin behind."
                      }
                    }
                  ]
                }
              }
            }
            """.data(using: .utf8)!
        
            let adventures =  try! JSONDecoder().decode(Adventures.self, from: json)
            return adventures.data.adventureList.items[0]
    }
}
