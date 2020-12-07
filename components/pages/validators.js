const { body } = require("express-validator");

const Validators = [
  body("title").notEmpty().isString(),
  body("description").notEmpty().isString(),
  body("html").notEmpty(),
  body("isMain").notEmpty(),
  body("isVisible").notEmpty(),
  body("css").optional(),
];

module.exports = Validators;
