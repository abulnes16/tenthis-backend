const { query, body } = require("express-validator");

const blockValidator = [query("unblock").optional().isBoolean()];

const configValidator = [
  body("name").notEmpty().isString(),
  body("logo").optional(),
  body("favicon").optional(),
  body("header").optional().isString(),
  body("footer").optional().isString(),
  body("css").optional().isString(),
  body("js").optional().isString(),
  body("useTemplate").notEmpty().isBoolean(),
  body('template').optional().isString(),
];

module.exports = {
  blockValidator,
  configValidator,
};
