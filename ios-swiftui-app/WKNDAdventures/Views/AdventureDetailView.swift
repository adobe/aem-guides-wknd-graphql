//
// Copyright 2021 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  AdventureDetailView.swift
//  WKNDAdventures
//

import SwiftUI
import SDWebImageSwiftUI

// Displays the details of a single adventure
struct AdventureDetailView: View {
    var adventure: Adventure
    
    var body: some View {
        ScrollView {
            
            // background color
            Rectangle()
                .foregroundColor(Color(.systemGray5))
                .ignoresSafeArea(edges: .top)
                .frame(height: 250.0)
                
            AdventureDetailImage(imageUrl: adventure.adventurePrimaryImageUrl)
                .offset(y: -230)
                .padding(.bottom, -230)
            
            VStack(alignment: .leading) {
                Text(adventure.adventureTitle)
                    .font(.title)
                HStack {
                    Text(adventure.adventureActivity)
                        .font(.subheadline)
                    Spacer()
                    Text(adventure.adventurePrice)
                        .font(.subheadline)
                        .foregroundColor(.green)
                }
                .font(.subheadline)
                .foregroundColor(.secondary)
                
                Divider()
                Spacer()

                Text("About \(adventure.adventureTitle)")
                        .font(.title2)
                
                Spacer()
                
                Text(adventure.adventureDescription)
                
                Spacer()
            }
            .padding()
        }
        .navigationTitle(adventure.adventureTitle)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct AdventureDetailImage: View {
    var imageUrl: String
    
    var body: some View {
        WebImage(url: URL(string: imageUrl))
            .resizable()
            .placeholder {
                Rectangle().foregroundColor(.gray)
            }
            .indicator(.activity) // Activity Indicator
            .transition(.fade(duration: 0.5)) // Fade Transition with duration
            .aspectRatio(contentMode: .fill)
            .frame(width: 300, height:300, alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/)
            .clipShape(/*@START_MENU_TOKEN@*/Circle()/*@END_MENU_TOKEN@*/)
            .overlay(Circle().stroke(Color.white, lineWidth:4))
            .shadow(radius: 7)
    }
}

struct AdventureDetailView_Previews: PreviewProvider {
    static var previews: some View {
        AdventureDetailView(adventure: TestData.adventures[0])
    }
}
