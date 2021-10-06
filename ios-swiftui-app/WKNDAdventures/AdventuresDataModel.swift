//
// Copyright 2021 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  AdventuresDataModel.swift
//  WKNDAdventures
//
//
// Uses an Apollo client to execute the graphQL query (AdventureList.graphql)
// Returns an array of AdventureData items

import Foundation
import Apollo

final class AdventuresDataModel: ObservableObject {
    
    // drive the UI based on any changes to the adventure data
    @Published private(set) var adventures: [Adventure] = []
    
    func fetchAdventures() {
        Network.shared.apollo
           .fetch(query: AdventureListQuery()) { [weak self] result in
           
             guard let self = self else {
               return
             }
                   
             switch result {
             case .success(let graphQLResult):
                print("Success AdventureListQuery() from: \(graphQLResult.source)")

                if let adventureDataItems =  graphQLResult.data?.adventureList.items {
                    // map graphQL items to an array of Adventure objects
                    self.adventures = adventureDataItems.compactMap { Adventure(adventureData: $0!) }
                }
                
                if let errors = graphQLResult.errors {
                  let message = errors
                        .map { $0.localizedDescription }
                        .joined(separator: "\n")
                  print("GraphQL Error(s) \(message)")
                }
                
             case .failure(let error):
                print("Network Error \(error.localizedDescription)")
             }
         }
    }
    
    // Utility function to ensure fresh data is fetched
    func clearCache() {
        Network.shared.apollo.clearCache()
    }
}
