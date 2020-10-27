const { body } = require("express-validator");

module.exports = [
  body('name').notEmpty(),
  body('price').notEmpty(),
  body('storage').notEmpty(),
  body('pages').notEmpty(),
  body('products').notEmpty(),
  body('templates').notEmpty(),
]