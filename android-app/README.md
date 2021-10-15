# AEM Guides WKND GraphQL - Android App

An example Android app that highlights Adobe Experience Manager's GraphQL APIs and the [AEM Headless Client for Java](https://github.com/adobe/aem-headless-client-java).

![Android App](https://user-images.githubusercontent.com/8974514/137548423-7ade957d-dc0e-4c55-85f6-60e683dd251e.jpg)

## Tutorial

A corresponding [tutorial](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/overview.html) is available where you can learn how to setup and run the application to query data from an AEM environment using GraphQL.

## How to use

1. On the target AEM environment install the [latest release of the WKND Reference site](https://github.com/adobe/aem-guides-wknd/releases/latest) using [Package Manager](http://localhost:4502/crx/packmgr/index.jsp) for local environments or using Cloud Manager's [CI/CD Pipeline](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/using-cloud-manager/configure-pipeline.html) for cloud environments.
1. Download and install [Android Studio](https://developer.android.com/studio) and open the folder `android-app`
1. Modify the file `config.properties` at `app/src/main/assets/config.properties` and update `contentApi.endpoint` to match your target AEM environment:
    
    ```plain
    contentApi.endpoint=http://10.0.2.2:4502
    contentApi.user=admin
    contentApi.password=admin
    ```
    
    See [connecting to AEM environments](#Connecting-to-AEM-environments) for more details.
    
1. Download an [Android Virtual Device](https://developer.android.com/studio/run/managing-avds) (min API 28)
1. Build and deploy the app using the Android emulator. 

### Connecting to AEM environments

`10.0.2.2` is a [special alias](https://developer.android.com/studio/run/emulator-networking) for localhost when using the emulator. So `10.0.2.2:4502` is equivalent to `localhost:4502`. If connecting to an AEM publish environment (recommended), no authorization is required and `contentAPi.user` and `contentApi.password` can be left blank. 

If connecting to an AEM author environment [authorization](https://github.com/adobe/aem-headless-client-java#using-authorization) is required. By default the application is set up to use basic authentication with a username and password of `admin:admin`. The [AEMHeadlessClientBuilder](https://github.com/adobe/aem-headless-client-java/blob/main/client/src/main/java/com/adobe/aem/graphql/client/AEMHeadlessClientBuilder.java) provides the ability to use [token-based authentication](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/authentication/overview.html). To use token-based authentication update client builder in `AdventureLoader.java` and `AdventuresLoader.java`:

  ```java
  /* Comment out basicAuth
   if (user != null && password != null) {
     builder.basicAuth(user, password);
    }
  */
  
  // use token-authentication where `token` is a String representing the token
  builder.tokenAuth(token)
  ```
  
A more detailed setup and tutorial can be found [here](#).

## System Requirements

 AEM as a Cloud Service | AEM 6.5 | Sample Content | Android Studio   | Android SDK | 
------------------------|---------|--------------------|---------|-----|
Continual               | 6.5.10+ |  [WKND Site 1.0+](https://github.com/adobe/aem-guides-wknd/releases/latest) | Arctic Fox  | 28+

## Documentation

* [AEM Headless Tutorials](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/overview.html)
* [AEM Headless Developer Journey](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/headless-journey/developer/overview.html)
* [AEM Headless Client for JavaScript](https://github.com/adobe/aem-headless-client-js)


