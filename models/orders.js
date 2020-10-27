/* Orders model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  numOrder: Number,
  client: { type: Schema.ObjectId, ref: 'User'},
  date: Date,
  total: Number,
  products: Array,
});

module.exports = new mongoose.model("order", ordersSchema);
