//
// Copyright 2021 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  AdventureListView.swift
//  WKNDAdventures
//

import SwiftUI


struct AdventureListView: View {
    
    // array of adventures to display
    var adventures: [Adventure]
    
    var body: some View {
        
        NavigationView {
            List(adventures) { adventure in
                NavigationLink(destination: AdventureDetailView(adventure: adventure)) {
                    AdventureRowView(adventure: adventure)
                }
            }
            .navigationTitle("WKND Adventures")
        }
    }
}

struct AdventureListView_Previews: PreviewProvider {
    static var previews: some View {
        AdventureListView(adventures: TestData.adventures)
    }
}
