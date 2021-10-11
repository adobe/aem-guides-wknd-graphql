# iOS SwiftUI App - WKND Adventures

A sample SwiftUI application that highlights Adobe Experience Manager's GraphQL APIs.

![WKNDAdventures Screenshot](https://user-images.githubusercontent.com/8974514/136282658-b39793ad-de6f-4919-a15e-03c4386817b0.jpg)

## Tutorial

A corresponding tutorial is available where you can learn how to setup and run the application to query data from an AEM environment using GraphQL.

## How to use

This application is designed to connect to an AEM Publish environment.

1. On the target **AEM Publish** environment install the [latest release of the WKND Reference site](https://github.com/adobe/aem-guides-wknd/releases/latest) using [Package Manager](http://localhost:4503/crx/packmgr/index.jsp) for local environments or using Cloud Manager's [CI/CD Pipeline](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/using-cloud-manager/configure-pipeline.html) for cloud environments.
1. Download and install [Xcode](https://developer.apple.com/xcode/) and open the folder `ios-swiftui-app`
1. Modify the file `WKNDAventures/Network.swift` and update `aemHost` to match your target AEM Publish environment

    ```swift
    // AEM Host, a domain exception for unsecure http request for 'localhost' has been added to the project's Info.plist
    private var aemHost: String = "http://localhost:4503"
    ```

1. Build using Xcode and deploy using the iOS simulator.

### Connect to AEM Author

The application was designed to connect to a Publish instance. Connecting directly to an **AEM Author** environment is useful during development, since the changes made are immediately reflected without having to publish. 

**Author** environments require authentication, the following updates to the `Network.swift` file need to be made.

**Basic authentication:**

```swift
// Client using Basic auth (admin:admin)
let requestChainTransport = RequestChainNetworkTransport(interceptorProvider: provider, endpointURL: url!, additionalHeaders: ["Authorization": "Basic YWRtaW46YWRtaW4="])
```

**[Developer access token](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/authentication/overview.html):**

```swift
// Client using developer access token
let bearerToken = "<developer access token here>"
let requestChainTransport = RequestChainNetworkTransport(interceptorProvider: provider, endpointURL: url!, additionalHeaders: ["Authorization": "Bearer \(bearerToken)"])
```

> Note, images will not load automatically when connecting to an author instance, as these are not served anonymously. Updates are needed for `Adventure.swift` to point to the `_authorUrl` and authentication headers will need to be added to the `WebImage` used.

A more detailed setup and tutorial can be found [here](#).

## System Requirements

 AEM as a Cloud Service | AEM 6.5 | Sample Content | Xcode   | iOS | 
------------------------|---------|--------------------|---------|-----|
Continual               | 6.5.10+ |  [WKND Site 1.0+](https://github.com/adobe/aem-guides-wknd/releases/latest) | 9.3+    | 14+

## Notes

Two 3rd party frameworks are used to power the application.

* [Apollo GraphQL client for iOS](https://www.apollographql.com/docs/ios/)
* [SDWebImage](https://github.com/SDWebImage/SDWebImage)

## Documentation

* [AEM Headless Tutorials](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/overview.html)
* [AEM Headless Developer Journey](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/headless-journey/developer/overview.html)