const router = require("express").Router();
const Vehicle = require("../models/vehicle");
const authHelper = require("../utils/authHelper");

router.post("/register", (req, res) => {
  if (!authHelper.requireLogin(req, res))
    return;
  //TODO: Validations
  if (
    req.body.aadharNo &&
    req.body.beaconId &&
    req.body.name &&
    req.body.vehicleNo &&
    req.body.contact &&
    req.body.routeSpec
  ) {
    const vehicle = new Vehicle({
      aadharNo: req.body.aadharNo,
      beaconId: req.body.beaconId,
      name: req.body.name,
      vehicleNo: req.body.vehicleNo,
      contact: req.body.contact,
      routeSpec: req.body.routeSpec,
    });
    console.log("Vehicle registering :" + vehicle);
    vehicle.save((err) => {
      if (!err) {
        console.log("SUCCESS");
        res.json({
          success: true,
          msg: "Vehicle Registered",
        });
      } else {
        console.log(err);
        res.status(500).json({
          success: false,
          msg: "Failed with error:" + err,
        });
      }
    });

  } else {
    res
      .status(400)
      .json({ success: false, msg: "Missing or invalid parameters" }); //Bad request
  }
});
module.exports = router;