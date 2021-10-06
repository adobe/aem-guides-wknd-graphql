//
// Copyright 2021 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  WKNDAdventuresApp.swift
//  WKNDAdventures
//

import SwiftUI
import SDWebImage

@main
struct WKNDAdventuresApp: App {
    
    // instantiates an observable object that can be passed to subsequent views
    @StateObject private var dataModel = AdventuresDataModel()
    
    var body: some Scene {
        WindowGroup {
            
            AdventureListView(adventures: dataModel.adventures)
                .onAppear {
                    // fetch results using apollo graphQL query
                    dataModel.fetchAdventures()
                }
            
            // include a button to easily refresh the data
            Button("Refresh Data") {
                
                // clear the apollo graphql cache
                dataModel.clearCache()
                
                // clear the image cache
                SDImageCache.shared.clearMemory()
                SDImageCache.shared.clearDisk()
                
                // re-fetch the adventure content
                dataModel.fetchAdventures()
            }
        }
    }
    
  
}
