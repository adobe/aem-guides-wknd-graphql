/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
const { createProxyMiddleware } = require('http-proxy-middleware');
const session = require('express-session')
const { getToken } = require('@adobe/aem-headless-client-nodejs');
const { REACT_APP_HOST_URI, REACT_APP_SERVICE_TOKEN } = process.env;

/*
    Set up a proxy with AEM for local development
    In a production environment this proxy should be set up at the webserver level or absolute URLs should be used.
*/

module.exports = function(app) {
    // Setup session
    app.use(session({
        secret: 'MY_SECRET',
        resave: false,
        saveUninitialized: true
    }))
    app.use(
        ['/content', '/graphql'],
        function (req, res, next) {
            if (!req.session.accessToken) {
                getToken(REACT_APP_SERVICE_TOKEN)
                    .then(({ accessToken, expires }) => {
                        console.log('Token received', accessToken.length, expires)
                        if (accessToken) {
                            req.session.accessToken = accessToken
                            req.headers.authorization = `Bearer ${accessToken}`
                        }
                        next()
                    })
                    .catch(e => {
                        console.error(e)
                        next()
                    })
            } else {
                req.headers.authorization = `Bearer ${req.session.accessToken}`
                next()
            }
        },
        createProxyMiddleware({
            target: REACT_APP_HOST_URI,
            changeOrigin: true
        })
    );
};

