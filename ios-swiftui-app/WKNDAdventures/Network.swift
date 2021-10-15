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
    
    private(set) lazy var apollo: ApolloClient = {
        // The cache is necessary to set up the store, which we're going to hand to the provider
        let cache = InMemoryNormalizedCache()
        let store = ApolloStore(cache: cache)
  
        let client = URLSessionClient()
        let provider = DefaultInterceptorProvider(client: client, shouldInvalidateClientOnDeinit: true, store: store)
        let url = Connection.baseURL // from Configx.xcconfig 

        // no additional headers, public instances by default require no additional authentication
        let requestChainTransport = RequestChainNetworkTransport(interceptorProvider: provider, endpointURL: url)
        
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


enum Configuration {
    enum Error: Swift.Error {
        case missingKey, invalidValue
    }

    static func value<T>(for key: String) throws -> T where T: LosslessStringConvertible {
        guard let object = Bundle.main.object(forInfoDictionaryKey:key) else {
            throw Error.missingKey
        }

        switch object {
        case let value as T:
            return value
        case let string as String:
            guard let value = T(string) else { fallthrough }
            return value
        default:
            throw Error.invalidValue
        }
    }
}

// Reads properties from Config.xcconfig
enum Connection {
    static var baseURL: URL {
        
        let host: String = try! Configuration.value(for: "AEM_HOST")

        // use http for localhost
        if(host.contains("localhost")) {
            return try! URL(string:  "http://" + host + Configuration.value(for: "AEM_GRAPHQL_ENDPOINT") )!
        }
        
        return try! URL(string: "https://" + host + Configuration.value(for: "AEM_GRAPHQL_ENDPOINT"))!
    }
}
