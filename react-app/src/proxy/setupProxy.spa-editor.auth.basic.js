const { createProxyMiddleware } = require('http-proxy-middleware');
const {REACT_APP_HOST_URI, REACT_APP_AUTHORIZATION } = process.env;

/*
    Set up a proxy with AEM for local development
    In a production environment this proxy should be set up at the webserver level or absolute URLs should be used.
*/
module.exports = function(app) {

    /**
    * Filter to check if the request should be re-routed to AEM. The paths to be re-routed at:
    * - Starts with /content (AEM content)
    * - Starts with /graphql (AEM graphQL endpoint)
    * - Ends with .model.json (AEM Content Services)
    * 
    * @param {*} path the path being requested of the SPA
    * @param {*} req the request object
    * @returns true if the SPA request should be re-routed to AEM
    */
    const toAEM = function(path, req) {
        return path.startsWith('/content') || 
            path.startsWith('/graphq') ||
            path.endsWith('.model.json')
    }

    /**
    * Re-writes URLs being proxied to AEM such that they can resolve to real AEM resources
    * - The "root" case of `/.model.json` are rewritten to the SPA's home page in AEM
    * - .model.json requests for /adventure:xxx routes are rewritten to their corresponding adventure page under /content/wknd-app/us/en/home/adventure/ 
    * 
    * @param {*} path the path being requested of the SPA
    * @param {*} req the request object
    * @returns returns a re-written path, or nothing to use the @param path
    */
    const pathRewriteToAEM = function (path, req) { 
        if (path === '/.model.json') {
            return '/content/wknd-app/us/en/home.model.json';
        } else if (path.startsWith('/adventure:') && path.endsWith('.model.json')) {
            return '/content/wknd-app/us/en/home/adventure/' + path.split('/').pop();
        }    
    }

    /**
    * Register the proxy middleware using the toAEM filter and pathRewriteToAEM rewriter 
    */
    app.use(
        createProxyMiddleware(
            toAEM, // Only route the configured requests to AEM
            {
                target: REACT_APP_HOST_URI,
                changeOrigin: true,
                // Pass in credentials when developing against an Author environment
                auth: REACT_APP_AUTHORIZATION,
                pathRewrite: pathRewriteToAEM // Rewrite SPA paths being sent to AEM
            }
        )
    );

    /**
    * Enable CORS on requests from the SPA to AEM
    * 
    * If this rule is not in place, CORS errors will occur when running the SPA on http://localhost:3000
    */
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", REACT_APP_HOST_URI);
        next();
    });
};