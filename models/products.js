/* Products model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: Schema.ObjectId, ref: "category" },
  quantity: Number,
  tags: [String],
  media: Array,
  store: { type: Schema.ObjectId, ref: "store" },
});

module.exports = new mongoose.model("product", productsSchema);
