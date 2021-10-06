# iOS SwiftUI App - WKND Adventures

An example SwiftUI application that highlights Adobe Experience Manager's GraphQL APIs.

## Tutorial

A corresponding tutorial is available where you can learn how to setup and run the application to consume data from a target AEM environment.

## How to use

1. Install the [latest release of the WKND Reference site](https://github.com/adobe/aem-guides-wknd/releases/latest) to the target AEM **Publish** environment using [Package Manager](http://localhost:4503/crx/packmgr/index.jsp) for local environments or using Cloud Manager's [CI/CD Pipeline](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/using-cloud-manager/configure-pipeline.html) for cloud environments.
1. Download and install [Xcode](https://developer.apple.com/xcode/) and open the folder `ios-swiftui-app`
1. Modify the file `WKNDAventures/Network.swift` and update `aemHost` to match your target AEM Publish environment

  ```swift
  // AEM Host, a domain exception for unsecure http request for 'localhost' has been added to the project's Info.plist
  private var aemHost: String = "http://localhost:4503"
  ```

A more detailed setup and tutorial can be found [here](#).

## System Requirements

 AEM as a Cloud Service | AEM 6.5 | Xcode   | iOS | 
------------------------|---------|---------|-----|
Continual               | 6.5.10+ |  9.3+   | 14+

## Notes

Two 3rd party frameworks are used to power the application.

* [Apollo GraphQL client for iOS](https://www.apollographql.com/docs/ios/)
* [SDWebImage](https://github.com/SDWebImage/SDWebImage)

## Documentation