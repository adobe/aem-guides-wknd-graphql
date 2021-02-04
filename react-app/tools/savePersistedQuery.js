const path = require('path')
const { AEMHeadless } = require('@adobe/aem-headless-client')
const { allAdventuresQuery, persistentPath } = require('./getQueryConfig')

const isProd = process.env.NODE_ENV === 'production'
require('dotenv').config({ path: path.join(process.cwd(), '.env' + (isProd ? '' : '.development')) })

const { AEM_USER, AEM_PASS, AEM_HOST_URI, AEM_GRAPHQL_ENDPOINT } = process.env
const sdk = new AEMHeadless(AEM_GRAPHQL_ENDPOINT, AEM_HOST_URI, [AEM_USER, AEM_PASS])

sdk.saveQuery(allAdventuresQuery, persistentPath)
  .then(data => console.log(data))
  .catch(e => console.error(e.toJSON()))
