const mongoose = require("mongoose");
const routeSchema = mongoose.Schema({
  name: String,
  path: [String],
});
module.exports = mongoose.model("Route", routeSchema);
