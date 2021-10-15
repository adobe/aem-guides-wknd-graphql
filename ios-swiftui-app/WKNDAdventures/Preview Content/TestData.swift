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
import Apollo

// Static test data to power preview
struct TestData {
    static var adventures: [Adventure] = {
        return [
            Adventure(adventureData:
                            AdventureData(
                                _path: "/content/dam/wknd/en/adventures/bali-surf-camp/bali-surf-camp",
                                adventureTitle: "Bali Surf Camping",
                                adventurePrice: "$5000 USD",
                                adventureActivity: "Surfing",
                                adventureDescription: AdventureData.AdventureDescription(plaintext:
                                                       "Surfing in Bali is on the bucket list of every surfer - whether you're a beginner or someone who's been surfing for decades, there will be a break to cater to your ability. Bali offers warm water, tropical vibes, awesome breaks and low cost expenses."),
                                adventureDifficulty: "Beginner",
                                adventureTripLength: "6 Days",
                                adventurePrimaryImage: AdventureData.AdventurePrimaryImage.makeImageRef(_authorUrl: "http://localhost:4502/content/dam/wknd/en/adventures/bali-surf-camp/AdobeStock_175749320.jpg", _publishUrl: "http://localhost:4503/content/dam/wknd/en/adventures/bali-surf-camp/AdobeStock_175749320.jpg")
                                )
                         ),
            Adventure(adventureData:
                            AdventureData(
                                _path: "/content/dam/wknd/en/adventures/climbing-new-zealand/climbing-new-zealand",
                                adventureTitle: "Climbing New Zealand",
                                adventurePrice: "$900 USD",
                                adventureActivity: "Rock Climbing",
                                adventureDescription: AdventureData.AdventureDescription(plaintext:
                                                       "Let us take you on a spectacular climbing experience unique to New Zealand\n\nFeel the raw adventure and excitement of our guided rock climbing experience. Reach new heights under our professional instruction and feel your body and mind work together in harmony. Come join us for a guided rock climbing adventure in the mountains that trained Sir Edmund Hilary. Whether it is your first time thinking of putting on climbing shoes or you are an old hand looking for some new challenges, our guides can make your climbing adventure a trip you won’t soon forget. New Zealand has countless climbing routes to choose from and is known as one of the premiere climbing destinations in the world. With so many different routes and areas to choose from our guides can tailor each trip to your exact specifications. Let us help you make your New Zealand climbing vacation a memory you will cherish forever!"),
                                adventureDifficulty: "Intermediate",
                                adventureTripLength: "2 Days",
                                adventurePrimaryImage: AdventureData.AdventurePrimaryImage.makeImageRef(_authorUrl: "http://localhost:4502/content/dam/wknd/en/adventures/climbing-new-zealand/AdobeStock_140634652.jpeg", _publishUrl: "http://localhost:4503/content/dam/wknd/en/adventures/climbing-new-zealand/AdobeStock_140634652.jpeg")
                                )
                         )
        ]
    }()
}
