const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema({
  aadharNo: String,
  beaconId: String,
  name: String,
  vehicleNo: String,
  contact: String,
  entryTime: { type: Date, default: Date.now },
  routeSpec: [String],
  journey: [{ checkPoint: String, reachedTime: Date }],
});
module.exports = mongoose.model("Vehicle", vehicleSchema);
