const router = require("express").Router();
const Vehicle = require("../models/vehicle");
const Beacon = require("../models/beacon");
const authHelper = require("../utils/authHelper");

router.post("/register", async (req, res) => {
  if (!authHelper.requireLogin(req, res))
    return;
  //TODO: Validations
  if (
    req.body.aadharNo &&
    req.body.beaconId &&
    req.body.name &&
    req.body.vehicleNo &&
    req.body.contact &&
    req.body.routeId &&
    req.body.routeSpec
  ) {
    let vehicle = new Vehicle({
      aadharNo: req.body.aadharNo,
      beaconId: req.body.beaconId,
      name: req.body.name,
      vehicleNo: req.body.vehicleNo,
      contact: req.body.contact,
      routeId: req.body.routeId,
      routeSpec: req.body.routeSpec,
      journey: [{ checkpoint: req.body.routeSpec[0] }],
    });
    console.log("Vehicle registering :" + vehicle);

    try {
      let beacon = await Beacon.findOne({ _id: req.body.beaconId });
      if (!beacon) {
        beacon = new Beacon({ _id: req.body.beaconId });
        beacon = await beacon.save();
      }

      if (beacon.active) {
        res
      .status(400)
      .json({ success: false, msg: "Beacon already in use" });
        return;
      }
      vehicle = await vehicle.save();
      beacon.currentVehicle = vehicle._id;
      beacon.active = true;
      beacon.lastCheckpoint = vehicle.routeSpec[0];
      beacon = await beacon.save();

      console.log("SUCCESS");
        res.json({
          success: true,
          msg: "Vehicle Registered",
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: "Failed with error:" + err,
      });
    }

  } else {
    res
      .status(400)
      .json({ success: false, msg: "Missing or invalid parameters" }); //Bad request
  }
});
module.exports = router;