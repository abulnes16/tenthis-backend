/* Plans model */

// Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plansSchema = new Schema({
  name: String,
  price: Number,
  storage: Number,
  numPages: Number,
  numProducts: Number,
  numTemplates: Number
});

module.exports = new mongoose.model('plan', plansSchema);