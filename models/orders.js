/* Orders model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  client: { type: Schema.ObjectId, ref: "user" },
  store: { type: Schema.ObjectId, ref: "store" },
  date: Date,
  total: Number,
  products: Array,
});

module.exports = new mongoose.model("order", ordersSchema);
