//
// Copyright 2022 Adobe
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
        
    var body: some Scene {
        WindowGroup {
            AdventureListView().environmentObject(initAem())
        }
    }
    
    private func initAem() -> Aem {
        do {
            let aemScheme: String = try Configuration.value(for: "AEM_SCHEME")
            let aemHost: String = try Configuration.value(for: "AEM_HOST")
            let aemAuthType: String = try Configuration.value(for: "AEM_AUTH_TYPE")
            
            if aemAuthType == "basic" {
                // Basic authentication/authorization
                let username: String = try Configuration.value(for: "AEM_USERNAME")
                let password: String = try Configuration.value(for: "AEM_PASSWORD")
                return Aem(scheme: aemScheme, host: aemHost, username: username, password: password);
            } else if aemAuthType == "token" {
                // Toked-based authentication/authorization
                let token: String = try Configuration.value(for: "AEM_TOKEN")
                return Aem(scheme: aemScheme, host: aemHost, token: token);
            } else {
                // No AEM authorization
                return Aem(scheme: aemScheme, host: aemHost);
            }
        } catch {
            fatalError("Could not initialize connection to AEM")
        }
    }
}
