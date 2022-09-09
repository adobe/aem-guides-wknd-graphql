# WKND NextJS Template App

This app demonstrates how to write a simple app rendering AEM Pages and Content fragments in Next JS.  

Adventures are retrieved from AEM as content fragments using AEM Headless GraphQL API.

![adventures](adventures.png "Adventures")

Page content is retrieved from AEM as page model using Sling JSON Exporter and can be edited in AEM Remote SPA Editor.

![editor](editor.png "Editor")

## Table of contents

<!--ts-->
   * [Getting Started](#getting-started)
      * [Start the AEM SDK Quickstart](#start-the-aem-sdk-quickstart)
      * [Download and install WKND Site package](#download-and-install-wknd-site-package)
      * [Set up AEM Project](#set-up-aem-project)
      * [Configure the root AEM page](#configure-the-root-aem-page)
      * [Bootstrap the Next.js App](#bootstrap-the-nextjs-app)
   * [Local development](#local-development)
   * [Run in production mode](#run-in-production-mode)
   * [Run on AEM 6.5](#run-on-aem-65)
   * [Troubleshooting](#troubleshooting)
     * [Supported browsers](#supported-browsers)
     * [Supported Node version](#supported-node-version)
     * [CORS errors from In-context Editing on a production build](#cors-errors-from-in-context-editing-on-a-production-build)
<!--te-->

## Getting Started

### Start the AEM SDK Quickstart

Download and install the AEM SDK Quickstart on port 4502, with default admin/admin credentials.

1. [Download latest AEM SDK](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html?fulltext=AEM*+SDK*&orderby=%40jcr%3Acontent%2Fjcr%3AlastModified&orderby.sort=desc&layout=list&p.offset=0&p.limit=1)
2. Unzip the AEM SDK to ~/aem-sdk
3. Run the AEM SDK Quickstart Jar

```bash
$ java -jar aem-sdk-quickstart-xxx.jar

# Provide `admin` as the admin user's password
```

AEM SDK will start and automatically launch on http://localhost:4502. Log in using the following credentials:
* Username: admin
* Password: admin

### Download and install WKND Site package

This tutorial has a dependency on WKND 1.1.0+'s project (for content).

1. [Download the latest version of aem-guides-wknd.all.x.x.x.zip](https://github.com/adobe/aem-guides-wknd/releases)
2. Log in to AEM SDK’s Package Manager at http://localhost:4502/crx/packmgr with the admin credentials.
3. Upload the aem-guides-wknd.all.x.x.x.zip downloaded in step 1
4. Tap the Install button for the entry aem-guides-wknd.all-x.x.x.zip

### Set up AEM Project

In the terminal, create an AEM project in which configurations and baseline content are managed. Always use the latest version of the AEM Archetype.

```bash
$ mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.2.1:generate \
 -D archetypeGroupId=com.adobe.aem \
 -D archetypeArtifactId=aem-project-archetype \
 -D archetypeVersion=37\
 -D aemVersion=cloud \
 -D appTitle="WKND App" \
 -D appId="wknd-app" \
 -D groupId="com.adobe.aem.guides.wkndapp" \
 -D frontendModule="react"
```

With the base AEM project is generated, a few adjustments ensure SPA Editor compatibility with Remote Next.js SPAs.
1. Remove ui.frontend project
2. Cross-Origin Resource Sharing (CORS) security policies: make sure that all your desired origins are allowed in `src/main/content/jcr_root/apps/wknd-app/osgiconfig/config`
3. Set AEM Page as Next.js Remote SPA Template: open `src/main/content/jcr_root/content/wknd-app/us/en/home/.content.xml` and update it as below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
          jcr:primaryType="cq:Page">
    <jcr:content
        cq:template="/conf/wknd-app/settings/wcm/templates/spa-next-remote-page"
        jcr:primaryType="cq:PageContent"
        jcr:title="WKND App Home Page"
        sling:resourceType="wknd-app/components/remotepagenext">
        <root
            jcr:primaryType="nt:unstructured"
            sling:resourceType="wcm/foundation/components/responsivegrid">
            <responsivegrid
                jcr:primaryType="nt:unstructured"
                sling:resourceType="wcm/foundation/components/responsivegrid">
                <text
                    jcr:primaryType="nt:unstructured"
                    sling:resourceType="wknd-app/components/text"
                    text="&lt;p>Hello World!&lt;/p>"
                    textIsRich="true">
                    <cq:responsive jcr:primaryType="nt:unstructured"/>
                </text>
            </responsivegrid>
        </root>
    </jcr:content>
</jcr:root>
```

Finally, deploy the AEM Project to AEM SDK.
* Ensure that AEM Author service is running on port 4502
* From the command line, navigate to the root of the AEM Maven project
* Use Maven to deploy the project to your local AEM SDK Author service

```bash
$ mvn clean install -PautoInstallSinglePackage
```

### Configure the root AEM page
With the AEM Project deployed, there is one last step to prepare SPA Editor to load your Next.js Remote SPA. In AEM, mark the AEM page that corresponds to the SPA’s root, `/content/wknd-app/us/en/home`, generated by the AEM Project Archetype.

1. Log in to AEM Author
2. Navigate to Sites > WKND App > us > en
3. Select the WKND App Home Page, and tap Properties
4. Navigate to the SPA tab
5. Fill out the Remote SPA Configuration: `http://localhost:3000`
6. Tap Save & Close

### Bootstrap the Next.js App

Run the following npx command to bootstrap your Next.js app from the template.

```bash
$ npx create-next-app \
    -e https://github.com/adobe/aem-nextjs-template \
    --use-npm \
    aem-nextjs-app
```

Make sure that your `.env.development` file has the correct values of your local environment. Below is an example.

```bash
NEXT_PUBLIC_URL=http://localhost:3000

NEXT_PUBLIC_AEM_HOST=http://localhost:4502
NEXT_GRAPHQL_ENDPOINT=/content/graphql/global/endpoint.json

NEXT_PUBLIC_AEM_SITE=wknd-app
NEXT_PUBLIC_AEM_PATH=/content/wknd-app/us/en/home
```

## Local development

To start developing your app, you first need to install all the npm dependencies.

```bash
$ npm install
```

Then, execute the below command to run the app in development mode.

```bash
$ npm run dev
```

## Run in production mode

Make sure you update `.env.production` with your own instances. Then execute the build command.

```bash
$ npm run build
```

Once it is built successfully, you can start the production server.

```bash
$ npm run start
```

## Run on AEM 6.5

The instructions in [Getting Started](#getting-started) are mainly targeted at AEM Cloud Service. To make this example work with AEM 6.5.12 or newer - use these steps.  

To bootstrap the AEM project - use the archetype as follows:

```bash
mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.2.1:generate \
 -D archetypeGroupId=com.adobe.aem \
 -D archetypeArtifactId=aem-project-archetype \
 -D archetypeVersion=37\
 -D aemVersion=6.5.12 \
 -D appTitle="WKND App" \
 -D appId="wknd-app" \
 -D groupId="com.adobe.aem.guides.wkndapp" \
 -D frontendModule="react"
```

Install [aem-guides-wknd.all-1.1.0-classic.zip](https://github.com/adobe/aem-guides-wknd/releases/download/aem-guides-wknd-1.1.0/aem-guides-wknd.all-1.1.0-classic.zip) - the `-classic.zip` contains all dependencies needed to make the WKND site work on 6.5. The rest of the steps are the same.  

_(source: https://github.com/duynguyen/aem-nextjs-template/issues/3)_

## Troubleshooting

### Supported browsers

At the current stage, this sample app and in-context editing in AEM work on **Google Chrome**.  
Testing for **Firefox** and **Safari** is on the way and might need adjustments to be working without errors.  

_(source: https://github.com/duynguyen/aem-nextjs-template/issues/4)_

### Supported Node version

It's recommended to use node version 16.x for now - testing a wider range of node versions is on the way and might need adjustments before they can be used.  

_(source: https://github.com/duynguyen/aem-nextjs-template/issues/5)_

### CORS errors from In-context Editing on a production build

When testing locally by running `npm run dev`, you can load the app at `http://localhost:3000` in AEM Remote Editor without any problem.  

When running `npm run start` for a production build, you might see CORS error because you are opening your Next.js app (e.g. `localhost:3000`) inside AEM (e.g. `localhost:4502`). You can add some Next configs to allow it or use a browser plugin to bypass CORS (development purpose only).

_(source: https://github.com/duynguyen/aem-nextjs-template/issues/6)_

