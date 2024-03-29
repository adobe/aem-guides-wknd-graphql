//
// Copyright 2022 Adobe
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
    @EnvironmentObject private var aem: Aem
    @State var adventure: Adventure = Adventure.empty()
        
    let slug: String
    
    private func loadAdventure(slug: String) {
        aem.getAdventureBySlug( slug: slug, completion: { (adventure) in
            self.adventure = adventure
        })
    }

    var body: some View {
        ScrollView {
            if (!adventure.isEmpty()) {
                AdventureDetailBgImage(imageUrl: aem.imageUrl(path: adventure.image()))
                    .foregroundColor(Color(.systemGray5))
                    .ignoresSafeArea(edges: .top)
                    .offset(y: 30)
                    .frame(height: 250.0)

                AdventureDetailImage(imageUrl: aem.imageUrl(path: adventure.image()))
                    .offset(y: -230)
                    .padding(.bottom, -230)
                
                VStack(alignment: .leading) {
                    
                    Text(adventure.title).font(.title)
                    
                    HStack {
                        Text(adventure.activity ?? "")
                            .font(.subheadline)
                        Spacer()
                        
                        TextField("FREE!", value: $adventure.price, formatter: getNumberFormatter())
                            .multilineTextAlignment(.trailing)
                            .font(Font.headline.weight(.bold))
                            .foregroundColor(.black)
                    
                    }
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    
                    Divider()
                    Spacer()

                    Text("About \(adventure.title)").font(.title2)
                    
                    Spacer()
                    
                    Text(adventure.description)
                    
                    Spacer()
                }
                .padding()
            }
        }
        .onAppear {
            // Fetch adventure by slug from AEM using GraphQL
            loadAdventure(slug: slug)
        }
        .navigationTitle(adventure.title)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct AdventureDetailImage: View {
    var imageUrl: URL
    
    var body: some View {
        WebImage(url: imageUrl)
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

struct AdventureDetailBgImage: View {
    var imageUrl: URL
    
    var body: some View {
        WebImage(url: imageUrl)
            .resizable()
            .placeholder {
                Rectangle().foregroundColor(.gray)
            }
            .transition(.fade(duration: 0.5)) // Fade Transition with duration
            .aspectRatio(contentMode: .fill)
            .frame(height:250, alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/)
            .opacity(0.45)
            .blur(radius: 1.5)
    }
}

private func getNumberFormatter() -> NumberFormatter {
    let numberFormatter = NumberFormatter()
    numberFormatter.numberStyle = .currency
    numberFormatter.maximumFractionDigits = 2
    
    return numberFormatter;
}


struct AdventureDetailView_Previews: PreviewProvider {
    static var previews: some View {
        AdventureDetailView(adventure: TestAdventureBySlug.get(), slug: "bali-surf-camp")
    }
}
