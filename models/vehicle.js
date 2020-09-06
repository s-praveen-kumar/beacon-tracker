const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema({
  beaconId: String,
  name: String,
  vehicleNo: String,
  entryTime: Date,
  routeSpec: {
    path: [String],
  },
});
module.exports = mongoose.model("Vehicle", vehicleSchema);
