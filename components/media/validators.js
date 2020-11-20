const { query } = require("express-validator");

const getValidators = [query("bulk").optional().isBoolean()];

module.exports = {
  getValidators,
};
