/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import AEMHeadless from '@adobe/aem-headless-client-js';


/**
 * This file defines a singleton that exposes AEM concerns to the rest of the app.
 * This includes:
 * - getters that invoke AEM GraphQL persisted queries
 * - helper functions for resources, such as images, that need to be served from AEM
 */
class AemHeadlessClient {

  /**
   * Create an instance of the AEM Headles Client for JS used to communicate with AEM Headless GraphQL endpoints.
   * 
   * @param {*} serviceURL the AEM HOST this Next.js app will connect to.
   */
  constructor({ serviceURL }) {
    this.aemHeadlessClient = new AEMHeadless({
      serviceURL: serviceURL,
      endpoint: 'The endpoint is not used as it only applies to client-side GraphQL queries which are not Adobe best practices.',
      auth: this._getAuth(),
      fetch: fetch
    });
  }

  /**
   * Convenience method for turning auth schemes specified in the .env.* files into auth signatures recognized by the AEM Headless client for JS.
   * @returns a valid auth object based on env variables
   */
  _getAuth() {
    let auth;

    if (process.env.AEM_AUTH_METHOD === 'basic') {
      auth = [ process.env.AEM_AUTH_USER, process.env.AEM_AUTH_PASSWORD];
    } else if (process.env.AEM_AUTH_METHOD === 'dev-token') {
      auth = process.env.AEM_AUTH_DEV_TOKEN;
    }
    
    return auth;
  }

  /**
   * Generates an absoluate URL resolvable to AEM. This is typically used for images.
   * 
   * @param {*} urlPath 
   * @returns the urlPath prefixd with the AEM service host
   */
  serveFromAem(urlPath) {
    return `${process.env.NEXT_PUBLIC_AEM_HOST}${urlPath}`;
  }

  /**
   * Invokes the 'adventures-all` persisted query using the parameterizable namespace.
   * 
   * @returns a GraphQL response of all adventures.
   */
  async getAllAdventures() {
    const queryAdventuresAll = process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT + '/adventures-all';
      
    try {
      return await this.aemHeadlessClient.runPersistedQuery(queryAdventuresAll);
    } catch(e) {
      console.error(e)
    }    
  }

  /**
   * Invokes the 'adventures-all` persisted query using the parameterizable namespace.
   * This then collects all the slugs (aka id's) fot the adventures. This is ultimately used to power the SSG of adventure detail pages.
   * 
   * @returns a list of slugs of all adventures. 
   */
  async getAdventureSlugs() {
    let adventures = [];
    try {
      const res = await this.getAllAdventures();
      adventures = res?.data?.adventureList?.items || [];
    } catch(e) {
      console.error(e)
    }
    
    return adventures.map((item) => ({
      params: {
        slug: [item.slug],
      }
    }));
  }

  /**
   * Invokes the 'adventure-by-slug` persisted query using the parameterizable namespace.
   * This is used to power the adventure details page.
   * @param {*} slug the adventure's slug
   * @returns the adventure's details.
   */
  async getAdventuresBySlug(slug) {
    const queryVariables = {'slug': slug};
    const queryAdventuresBySlug = process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT + '/adventure-by-slug';

    try {
      return await this.aemHeadlessClient.runPersistedQuery(queryAdventuresBySlug, queryVariables);
    } catch(e) {
      console.error(e);
    }
  }
}

/**
 * Export the initialized AEM Headless client object for use in the Next.js app
 */
export default new AemHeadlessClient({ serviceURL: process.env.NEXT_PUBLIC_AEM_HOST });