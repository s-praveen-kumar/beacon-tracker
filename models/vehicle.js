const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema({
  aadharNo: String,
  beaconId: String,
  name: String,
  vehicleNo: String,
  contact: String,
  entryTime: { type: Date, default: Date.now },
  routeSpec: [String],
  journey: [{ checkpoint: String, reachedTime: { type:Date, default: Date.now } }],
});
module.exports = mongoose.model("Vehicle", vehicleSchema);
