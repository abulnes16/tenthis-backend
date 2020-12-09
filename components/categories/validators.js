const { body } = require("express-validator");

const Validators = [
  body("name").notEmpty().isString(),
  body("description").notEmpty().isString(),
];

module.exports = Validators;
