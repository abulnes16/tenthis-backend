/* User model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  plan: { type: Schema.ObjectId, ref: "plan", required: false },
  role: { type: String, required: true },
  store: { type: String, required: false },
});

module.exports = new mongoose.model("user", userSchema);
