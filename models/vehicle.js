const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema({
  //Todo: Aadhar number
  aadharNo: String,
  beaconId: String,
  name: String,
  vehicleNo: String,
  contact: String,
  entryTime: { type: Date, default: Date.now },
  routeSpec: {
    path: [String],
  },
});
module.exports = mongoose.model("Vehicle", vehicleSchema);
