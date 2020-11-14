const { body } = require("express-validator");

const Validators = [
  body("name").notEmpty().isString(),
  body("description").notEmpty().isString(),
  body("html").notEmpty().isString(),
  body("css").optional().isString(),
  body("js").optional().isString(),
  body("media").optional(),
];

module.exports = {
  Validators,
};
