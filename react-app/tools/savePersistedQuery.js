const path = require('path')
const { AEMHeadless } = require('@adobe/aem-headless-client')
const { allAdventuresQuery, persistentPath } = require('./getQueryConfig')

const isProd = process.env.NODE_ENV === 'production'
require('dotenv').config({ path: path.join(process.cwd(), '.env' + (isProd ? '' : '.development')) })

const { REACT_APP_AUTHORIZATION, REACT_APP_HOST_URI, REACT_APP_GRAPHQL_ENDPOINT } = process.env
const sdk = new AEMHeadless(REACT_APP_GRAPHQL_ENDPOINT, REACT_APP_HOST_URI, REACT_APP_AUTHORIZATION.split(':'))

sdk.saveQuery(allAdventuresQuery, persistentPath)
  .then(data => console.log(data))
  .catch(e => console.error(e.toJSON()))
