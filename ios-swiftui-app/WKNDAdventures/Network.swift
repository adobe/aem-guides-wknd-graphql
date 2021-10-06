//
// Copyright 2021 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  Network.swift
//  WKNDAdventures
//

import Foundation
import Apollo

class Network {
    
    static let shared = Network()
    
    // AEM Host, a domain exception for unsecure http request for 'localhost' has been added to the project's Info.plist
    private var aemHost: String = "http://localhost:4503"
    // GraphQL endpoint for WKND-specific queries
    private var graphQLEndpoint: String = "/content/cq:graphql/wknd/endpoint.json"
    
    private(set) lazy var apollo: ApolloClient = {
        // The cache is necessary to set up the store, which we're going to hand to the provider
        let cache = InMemoryNormalizedCache()
        let store = ApolloStore(cache: cache)
  
        let client = URLSessionClient()
        let provider = DefaultInterceptorProvider(client: client, shouldInvalidateClientOnDeinit: true, store: store)
        let url = URL(string: aemHost + graphQLEndpoint)

        // no additional headers, public instances by default require no additional authentication
        let requestChainTransport = RequestChainNetworkTransport(interceptorProvider: provider, endpointURL: url!)
        
        /*
          // Client using Basic auth (admin:admin)
          // useful for developing against a local author instance
        
        let requestChainTransport = RequestChainNetworkTransport(interceptorProvider: provider, endpointURL: url!, additionalHeaders: ["Authorization": "Basic YWRtaW46YWRtaW4="])
        */
        
        /*
         // Client using developer access token
         // see for more details https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/authentication/overview.html
         
        let bearerToken = "<developer access token here>"
        let requestChainTransport = RequestChainNetworkTransport(interceptorProvider: provider, endpointURL: url!,
                                                       additionalHeaders: ["Authorization": "Bearer \(bearerToken)"])
         */
        
        // Remember to give the store you already created to the client so it
        // doesn't create one on its own
        return ApolloClient(networkTransport: requestChainTransport,store: store)
    }()
}
