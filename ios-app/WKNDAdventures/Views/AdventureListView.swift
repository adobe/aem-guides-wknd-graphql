//
// Copyright 2022 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  AdventureListView.swift
//  WKNDAdventures
//

import SwiftUI
import SDWebImage

struct AdventureListView: View {
    @EnvironmentObject private var aem: Aem
    @State var adventures: [Adventure] = []
    
    private func loadAdventures() {
        aem.getAdventures( completion: { (adventures) in
            self.adventures = adventures
        })
    }
    
    var body: some View {
        
        NavigationView {
            List(adventures) { adventure in
                // Define the view list of adventures that link to Adventure Detail views
                NavigationLink(destination: AdventureDetailView(slug: adventure.slug)) {
                    AdventureListItemView(adventure: adventure)
                }
            }
            .onAppear {
                loadAdventures()
            }.refreshable {
                SDImageCache.shared.clearMemory()
                SDImageCache.shared.clearDisk()
                loadAdventures()
            }.navigationTitle("WKND Adventures")
        }
    }
}

struct AdventureListView_Previews: PreviewProvider {
    static var previews: some View {
        AdventureListView(adventures: TestAdventuresAll.get())
    }
}
