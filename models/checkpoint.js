const mongoose = require("mongoose");
const checkPointSchema = mongoose.Schema({
  id: mongoose.SchemaTypes.ObjectId,
  name: String,
  location: {
    lat: Number,
    lon: Number,
  },
  authSecret: String,
});
mongoose.model("Checkpoint", checkPointSchema);
