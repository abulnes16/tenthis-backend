const { body } = require("express-validator");

const updateValidator = [
  body("name").notEmpty().isString(),
  body("role").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("plan").notEmpty().isString(),
];

module.exports = {
  updateValidator,
};
