/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
const { createProxyMiddleware } = require('http-proxy-middleware');
const { REACT_APP_HOST_URI, REACT_APP_DEV_TOKEN } = process.env;

/*
    Set up a proxy with AEM for local development
    In a production enviroment this proxy should be set up at the webserver level or absolute URLs should be used.
*/

module.exports = function(app) {
  app.use(
    ['/content', '/graphql'],
    createProxyMiddleware({
      target: REACT_APP_HOST_URI,
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
          if (REACT_APP_DEV_TOKEN) {
              proxyReq.setHeader('Authorization', `Bearer ${REACT_APP_DEV_TOKEN}`);
          }
      }
    })
  );
};

