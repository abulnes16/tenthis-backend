/* Routes module */

//Routes
const auth = require("../components/auth/network");
const plan = require("../components/plans/network");
const store = require('../components/stores/network');
const user = require("../components/users/network");

const router = (server) => {
  server.use("/auth", auth);
  server.use("/user", user);
  server.use('/store', store);
  server.use("/plan", plan);
};

module.exports = router;
