/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const { SERVICE_TOKEN, DEV_TOKEN, BASIC, NONE } = require('./proxy/authMethods');

const proxy = (() => {
    switch (process.env.REACT_APP_AUTH_METHOD) {
        case SERVICE_TOKEN:
            // Use Service token exchange for Cloud Env PROD
            return require('./proxy/setupProxy.auth.service-token');
        case DEV_TOKEN:
            // Use Dev token for local development with Cloud Env
            return require('./proxy/setupProxy.auth.dev-token');
        case NONE:
            // Auth not needed for local development with Local Publisher Env
            return require('./proxy/setupProxy.auth.none');
        case BASIC:
        default:
            // Use user/pass for local development with Local Author Env
            return require('./proxy/setupProxy.auth.basic');
    }
})();

/*
    Set up a proxy with AEM for local development
    In a production environment this proxy should be set up at the webserver level or absolute URLs should be used.
*/

module.exports = proxy;
