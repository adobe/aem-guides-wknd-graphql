//
// Copyright 2022 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  Aem.swift
//  WKNDAdventures
//

import SwiftUI
import SDWebImage

/// #Aem object
///
/// Acts as a service object for managing concerns with connecting to AEM Headless.
///
/// + Making calls to AEM's GraphQL endpoints using persisted queries
/// + Adding specified authentication to GraphQL requests
/// + Adding specified authentication to the Image requests
/// + Adjusting relative images paths to source from AEM
///
class Aem: ObservableObject {
    let scheme: String
    let host: String
    var username: String?
    var password: String?
    var token: String?
    
    /// # No-authorization init
    /// Used when accessing AEM Publish when no authorization is required
    init(scheme: String, host: String) {
        self.scheme = scheme
        self.host = host
    }
    
    /// # Basic authentication init
    /// Used when authenticating to AEM using local accounts (basic auth)
    convenience init(scheme: String, host: String, username: String, password: String) {
        self.init(scheme: scheme, host: host)
        
        self.username = username
        self.password = password
        
        // Add basic auth headers to all Image requests, as they are (likely) protected as well
        SDWebImageDownloader.shared.setValue("Basic \(encodeBasicAuth(username: username, password: password))", forHTTPHeaderField: "Authorization")
    }
    
    /// # Token authentication init
    ///  Used when authenticating to AEM using token authentication (Dev Token or access token generated from Service Credentials)
    convenience init(scheme: String, host: String, token: String) {
        self.init(scheme: scheme, host: host)
        
        self.token = token
        
        // Add token auth headers to all Image requests, as they are (likely) protected as well
        SDWebImageDownloader.shared.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
    }
    
    /// # getAdventures()
    /// Returns all WKND adventures using the `wknd/adventures-all` persisted query.
    /// For this func call to work, the `wknd/adventures-all` query must be deployed to the AEM environment/service specified by the host
    func getAdventures(completion: @escaping ([Adventure]) ->  ()) {
               
        let request = makeRequest(persistedQueryName: "wknd-shared/adventures-all")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if ((error) != nil) {
                print("Unable to connect to AEM GraphQL endpoint")
                completion([])
            }
                                    
            if (!data!.isEmpty) {
                let adventures = try! JSONDecoder().decode(Adventures.self, from: data!)
                DispatchQueue.main.async {
                    completion(adventures.data.adventureList.items)
                }
            }
        }.resume();
    }
    
    
    /// # getAdventureBySlug()
    /// Return a single WKND adventure using the `wknd/adventure-by-slug` persisted query.
    /// 'slug`is a unique field, so this `adventureList` should have 0 or 1 results.
    /// For this func call to work, the `wknd/adventure-by-slug` query must be deployed to the AEM environment/service specified by the host
    func getAdventureBySlug(slug: String, completion: @escaping (Adventure) ->  ()) {
        let request = makeRequest(persistedQueryName: "wknd-shared/adventure-by-slug", params: [ "slug": slug ] )
                
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            if ((error) != nil) {
                print("Unable to connect to AEM GraphQL endpoint")
                //completion()
            }
                    
            if (!data!.isEmpty) {
                let adventures = try! JSONDecoder().decode(Adventures.self, from: data!)
                DispatchQueue.main.async {
                    if (!adventures.data.adventureList.items.isEmpty) {
                        completion(adventures.data.adventureList.items[0])
                    }
                }
            }
        }.resume();
    }
    
    /// # imageUrl(..)
    /// Prefixes AEM image paths wit the AEM scheme/host
    func imageUrl(path: String) -> URL {
        return URL(string: "\(self.scheme)://\(self.host)\(path)")!
    }
        
    /// #makeRequest(..)
    /// Generic method for constructing and executing AEM GraphQL persisted queries
    private func makeRequest(persistedQueryName: String, params: [String: String] = [:]) -> URLRequest {
        // Encode optional parameters as required by AEM
        let persistedQueryParams = params.map { (param) -> String in
            encode(string: ";\(param.key)=\(param.value)")
        }.joined(separator: "")
        
        // Construct the AEM GraphQL persisted query URL, including optional query params
        let url: String = "\(self.scheme)://\(self.host)/graphql/execute.json/" + persistedQueryName + persistedQueryParams;

        var request = URLRequest(url: URL(string: url)!);

        // Add authentication to the AEM GraphQL persisted query requests as defined by the iOS application's configuration
        request = addAuthHeaders(request: request)
        
        return request
    }
    
    /// #encode(..)
    /// Encodes string for use in query. This is used to encode persisted query parameters.
    private func encode(string: String) -> String {
        return string.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? string
    }

    /// #addAuthHeaders(..)
    /// Adds auth headers to request as specified by the init(..) func called
    private func addAuthHeaders(request: URLRequest) -> URLRequest {
        var requestWithAuth = request;
        
        if self.token != nil {
            requestWithAuth.addValue("Bearer \(String(describing: self.token))", forHTTPHeaderField: "Authorization")
        } else if self.username != nil && self.password != nil {
            let basicAuth = encodeBasicAuth(username: self.username!, password: self.password!)
            requestWithAuth.addValue("Basic \(basicAuth)", forHTTPHeaderField: "Authorization")
        }
        
        return requestWithAuth;
    }
            
    /// #encodeBasicAuth(..)
    /// Base64 encodes basic auth username and password.
    private func encodeBasicAuth(username: String, password: String) -> String {
        return (username + ":" + password).data(using: .utf8)!.base64EncodedString()
    }
}
