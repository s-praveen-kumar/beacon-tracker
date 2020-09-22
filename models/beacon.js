const mongoose = require("mongoose");
const beaconSchema = mongoose.Schema({
    _id: Number,
    active: Boolean,
    currentVehicle: String,
    lastCheckpoint: String,
});
module.exports = mongoose.model("beacon", beaconSchema);
