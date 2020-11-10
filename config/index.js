const env = require('dotenv');

const path = `./config/${process.env.NODE_ENV === 'prod' ? 'prod.env': 'local.env'}`;

env.config({path});
