//
// Copyright 2022 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  AdventureRow.swift
//  WKNDAdventures
//

import SwiftUI
import SDWebImageSwiftUI

// display a single adventure in a row
struct AdventureRowView: View {
    @EnvironmentObject private var aem: Aem

    var adventure: Adventure
    
    var body: some View {
        HStack {
            AdventureRowImage(imageUrl: aem.imageUrl(path: adventure.image()))
            Text(adventure.title)
            Spacer()
        }
    }
}

struct AdventureRowImage: View {
    var imageUrl: URL
    
    var body: some View {
        WebImage(url: imageUrl)
                .resizable()
                .placeholder {
                    Rectangle().foregroundColor(.gray)
                }
                .indicator(.activity) // load activity Indicator
                .transition(.fade(duration: 0.5)) // Fade Transition with duration
                .aspectRatio(contentMode: .fill)
                .frame(width: 50, height: 50)
                .clipped()
    }
}

struct AdventureRow_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            AdventureRowView(adventure: TestAdventuresAll.get()[0])
        }
        .previewLayout(.fixed(width:500, height: 70))
    }
}
