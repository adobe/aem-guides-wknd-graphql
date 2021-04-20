# AEM Guides WKND GraphQL - React App

An example React application that highlights Adobe Experience Manager's GraphQL APIs.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![React App Screenshot](./docs/react-screenshot.png)

## Configuring AEM

This project assumes the latest WKND Reference site has been deployed to the target AEM environment. A more detailed setup and tutorial can be found [here](https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/setup.html?lang=en#graphql).

1. Download the [latest release of WKND](https://github.com/adobe/aem-guides-wknd/releases/latest)
1. Install via [Package Manager](http://localhost:4502/crx/packmgr/index.jsp) on the local SDK Quickstart.

> To deploy to an AEM as a Cloud service environment integrate the [WKND repository with Git](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/managing-code/integrating-with-git.html) and deploy using Cloud Manager's [CI/CD Pipeline](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/using-cloud-manager/configure-pipeline.html)

## Start the App

Run the commands:

```
$ cd aem-guides-wknd-graphql/react-app
$ npm install
$ npm start
```

## Connecting to AEM

This project assumes that the AEM environment has the GraphQL API feature **enabled**. The GraphQL APIs are not enabled by default in AEM as a Cloud Service environments. Fu

### Install Sample Content

This project assumes the latest WKND Reference site has been deployed to the target AEM environment.

1. Download the [latest release of WKND](https://github.com/adobe/aem-guides-wknd/releases/latest)
1. Install via [Package Manager](http://localhost:4502/crx/packmgr/index.jsp) on the local SDK Quickstart.

> To deploy to an AEM as a Cloud service environment integrate the [WKND repository with Git](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/managing-code/integrating-with-git.html) and deploy using Cloud Manager's [CI/CD Pipeline](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/using-cloud-manager/configure-pipeline.html)

### Update Environment Variables

Several [environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables) are used by this project to connect to an AEM environment. Default connects to an AEM author environment running at http://localhost:4502. If you wish to change this behavior update the `.env.development` file accordingly:

* `REACT_APP_HOST_URI=http://localhost:4502` - Set to AEM target host
* `REACT_APP_GRAPHQL_ENDPOINT=/content/graphql/global/endpoint.json` - Set the GraphQL endpoint path
* `REACT_APP_AUTHORIZATION=admin:admin` - set basic auth credentials to use if connecting to an AEM Author environment (for development only). If connecting to a Publish environment, this setting is not necessary.
* `REACT_APP_DEV_TOKEN` - Dev token string. To connect to remote instance, beside Basic auth (user:pass) you can use Bearer auth with DEV token from Cloud console
* `REACT_APP_SERVICE_TOKEN` - Path to service token file. To connect to remote instance, authentication can be done with Service token also (download file from Cloud console)

### Proxy API Requests

When using the webpack development server (`npm start`) the project relies on a [proxy setup](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually) using `http-proxy-middleware`. The file is configured at [src/setupProxy.js](src/setupProxy.js) and relies on several custom environment variables set at `.env` and `.env.development`.

If connecting to a local AEM author environment, no updates are needed.

### CORS - Cross Origin Resource Sharing

This project relies on a CORS configuration running on the target AEM environment and assumes that the app is running on http://localhost:3000 in development mode. The [CORs configuration](https://github.com/adobe/aem-guides-wknd/blob/master/ui.config/src/main/content/jcr_root/apps/wknd/osgiconfig/config.author/com.adobe.granite.cors.impl.CORSPolicyImpl~wknd-graphql.cfg.json) is part of the [WKND Reference site](https://github.com/adobe/aem-guides-wknd).

![CORS Configuration](docs/cross-origin-resource-sharing-configuration.png)

*Sample CORS config for Author environment*

## GraphiQL Tool

[GraphiQL](https://github.com/graphql/graphiql) is a development tool used to explore the GraphQL API on an AEM environment. To install:

1. Navigate to the **[Software Distribution Portal](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html)** > **AEM as a Cloud Service**.
1. Download the latest **GraphiQL Content Package v.x.x.x**
1. Install via [Package Manager](http://localhost:4502/crx/packmgr/index.jsp)
1. Navigate to the GraphiQL IDE at [http://localhost:4502/content/graphiql.html](http://localhost:4502/content/graphiql.html) and begin exploring the GraphQL APIs.

## Installation

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
