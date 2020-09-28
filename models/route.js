const mongoose = require("mongoose");
const routeSchema = mongoose.Schema({
  name: String,
  path: [String],
  route: Object,  //Route date from OSRM
});
module.exports = mongoose.model("Route", routeSchema);
