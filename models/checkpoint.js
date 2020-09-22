const mongoose = require("mongoose");
const checkPointSchema = mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lon: Number,
  },
  authSecret: String,
//  roads: Map, //"Dest_ID" -> {distance, worst_case_time}
});
module.exports = mongoose.model("Checkpoint", checkPointSchema);
