/* Products model */

// Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  categories: Array,
  quantity: Number,
  tags: [String],
  media: Array
});

module.exports = new mongoose.model('product', productsSchema);