const { body } = require("express-validator");

const Validator = [
  body("name").notEmpty().isString(),
  body("description").notEmpty().isString(),
  body("price").notEmpty().isNumeric(),
  body("category").notEmpty().isString(),
  body("quantity").notEmpty().isNumeric(),
  body("tags").optional().isString(),
  body("media").optional(),
];

module.exports = Validator;
