const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
require('dotenv').config({ path: path.join(process.cwd(), '.env' + (isProd ? '' : '.development')) })
