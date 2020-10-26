/* Routes module */

//Routes
const auth = require('../components/auth/network');


const router = (server) => {
  server.use('/auth', auth);
} 

module.exports = router;