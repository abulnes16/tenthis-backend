/* Plans validations module */

//Express-validators
const { body } = require("express-validator");

const createValidators = [
  body("name").notEmpty().isString(),
  body("price").notEmpty().isNumeric(),
  body("storage").notEmpty().isNumeric(),
  body("pages").notEmpty().isNumeric(),
  body("products").notEmpty().isNumeric(),
  body("templates").notEmpty().isNumeric(),
];

const updateValidators = [
  body("name").isString(),
  body("price").isNumeric(),
  body("storage").isNumeric(),
  body("pages").isNumeric(),
  body("products").isNumeric(),
  body("templates").isNumeric(),
];

module.exports = {
  createValidators,
  updateValidators,
};
