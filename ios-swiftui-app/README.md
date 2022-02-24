# iOS SwiftUI App - WKND Adventures

An example SwiftUI application that highlights Adobe Experience Manager's GraphQL APIs.

![WKNDAdventures Screenshot](https://user-images.githubusercontent.com/8974514/136282658-b39793ad-de6f-4919-a15e-03c4386817b0.jpg)

## Tutorial

A corresponding [tutorial is available](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/example-apps/ios-swiftui-app.html) where you can learn how to setup and run the application to query data from an AEM environment using GraphQL.

## How to use

This application is designed to connect to an AEM Author or Publish environment.

1. On the target **AEM** environment install the [latest release of the WKND Reference site](https://github.com/adobe/aem-guides-wknd/releases/latest) using [Package Manager](http://localhost:4503/crx/packmgr/index.jsp) for local environments or using Cloud Manager's [CI/CD Pipeline](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/using-cloud-manager/configure-pipeline.html) for cloud environments.
1. Download and install [Xcode](https://developer.apple.com/xcode/) and open the folder `ios-swiftui-app`
1. Modify the file `Config.xcconfig` file and update `AEM_HOST` to match your target AEM environment

    ```plain
    // Target hostname for AEM environment, do not include http:// or https://
    AEM_HOST = localhost:4503

    // GraphQL Endpoint
    AEM_GRAPHQL_ENDPOINT = /content/cq:graphql/wknd/endpoint.json
    ```

1. Set the authentication method in the file `Config.xcconfig` based on your use case. `basic` and `token` based authentication is supported. If connecting to an **AEM Publish** environment no authentication is needed and the auth methods can be commented out.
1. Build using Xcode and deploy using the iOS simulator.

### Connect to AEM Author

The application was designed to connect to a Publish instance. Connecting directly to an **AEM Author** environment is useful during development, since the changes made are immediately reflected without having to publish. 

**Author** environments require authentication, the following updates to the `Config.xcconfig` file need to be made.

**Basic authentication:**

```plain
// Support for Basic Authentication - Set AUTH_METHOD to basic and set BASIC_AUTH_CREDENTIALS
AUTH_METHOD = basic

// Basic Authentication Info
BASIC_AUTH_CREDENTIALS = admin:admin
```

**Token authentication:**

```plain
// Support for Token Authentication - set AUTH_METHOD to token
AUTH_METHOD = token

// Bearer token value, ensure AUTH_METHOD=token to use.
BEARER_TOKEN = <token here>
```

A more detailed setup and tutorial can be found [here](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/example-apps/ios-swiftui-app.html).

## System Requirements

 AEM as a Cloud Service | AEM 6.5 | Sample Content | Xcode   | iOS | 
------------------------|---------|--------------------|---------|-----|
Continual               | 6.5.10+ |  [WKND Site 1.0+](https://github.com/adobe/aem-guides-wknd/releases/latest) | 9.3+    | 14+

## Notes

Two 3rd party frameworks are used to power the application.

* [Apollo GraphQL client for iOS](https://www.apollographql.com/docs/ios/)
* [SDWebImage](https://github.com/SDWebImage/SDWebImage)

## Documentation

* [AEM Headless iOS SwiftUI App Tutorial](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/example-apps/ios-swiftui-app.html)
* [AEM Headless Tutorials](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/overview.html)
* [AEM Headless Developer Journey](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/headless-journey/developer/overview.html)