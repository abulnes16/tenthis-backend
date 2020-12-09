const { body } = require("express-validator");

const Validators = [
  body("products").notEmpty().isArray(),
  body("store").notEmpty().isString(),
];

module.exports = {
  Validators,
};
