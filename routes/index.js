/* Routes module */

//Routes
const auth = require('../components/auth/network');
const plan = require('../components/plans/network');

const router = (server) => {
  server.use('/auth', auth);
  server.use('/plan', plan);
} 

module.exports = router;