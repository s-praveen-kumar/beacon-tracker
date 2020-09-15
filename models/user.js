const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  _id: String,
  name: String,
  hash: String,
  role: String,
});
module.exports = mongoose.model("users", userSchema);
