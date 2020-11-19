/* Routes module */

//Routes
const auth = require("../components/auth/network");
const plan = require("../components/plans/network");
const store = require("../components/stores/network");
const user = require("../components/users/network");
const template = require("../components/templates/network");
const category = require("../components/categories/network");
const product = require("../components/products/network");

const router = (server) => {
  server.use("/auth", auth);
  server.use("/user", user);
  server.use("/store", store);
  server.use("/plan", plan);
  server.use("/template", template);
  server.use("/category", category);
  server.use("/product", product);
};

module.exports = router;
