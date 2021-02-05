/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
import { Model, ModelClient } from '@adobe/aem-spa-page-model-manager';

/**
 * Custom ModelClient meant to demonstrate how to customize the request sent to the remote server
 */
export class CustomModelClient extends ModelClient {
    private _authorization: string | null;
    /**
     * @constructor
     * @private
     * @param [apiHost] Http host of the API.
     */
    constructor(apiHost?: string, authorization?:string) {
        super(apiHost);
        this._authorization = authorization || null;
    }

    /**
     * Returns http host of the API.
     * @returns API host or `null`.
     */
    get authorization(): string  {
        return this._authorization ? this._authorization : '';
    }

    /**
     * Fetches a model using the given a resource path
     *
     * @param {string} modelPath - Path to the model
     * @return {*}
     */
    fetch<M extends Model>(modelPath: string): Promise<M> {

        if (!modelPath) {
            let err = 'Fetching model rejected for path: ' + modelPath;
            return Promise.reject(new Error(err));
        }

        // Either the API host has been provided or we make an absolute request relative to the current host
        let url = `${this.apiHost}${modelPath}`;
        
        // set headers and include authorization if authorization set
        let httpHeaders = new Headers();
        httpHeaders.append('Content-Type', 'application/json');
        if(this.authorization) {
            httpHeaders.append('Authorization', 'Basic ' + btoa(this.authorization))
        }
        
        return fetch(
            url, {headers: httpHeaders }
            ).then((response) => {
                if ((response.status >= 200) && (response.status < 300)) {
                    return response.json() as Promise<M>;
                }
    
                throw { response };
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
}
