/* Auth validators module */

//Express-validators
const { body } = require("express-validator");

const registerValidators = [
  body("name").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  body("storeName").notEmpty().isString(),
  body("plan").notEmpty(),
  body("role").notEmpty(),
];

const loginValidators = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
];

module.exports = {
  registerValidators,
  loginValidators,
};
