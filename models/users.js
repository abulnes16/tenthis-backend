/* User model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  plan: { type: Schema.ObjectId, ref: "Plan", required: false },
  role: { type: String, required: true },
});

module.exports = new mongoose.model("user", userSchema);
