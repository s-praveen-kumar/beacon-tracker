const mongoose = require("mongoose");
const checkPointSchema = mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lon: Number,
  },
  authSecret: String,
});
module.exports = mongoose.model("Checkpoint", checkPointSchema);
