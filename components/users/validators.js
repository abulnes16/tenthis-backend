const { body } = require("express-validator");

const Validator = [
  body("name").notEmpty().isString(),
  body("role").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("plan").optional().isString(),
];

module.exports = {
  Validator,
};
