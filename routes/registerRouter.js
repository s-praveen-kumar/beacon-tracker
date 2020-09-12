const router = require("express").Router();
const Vehicle = require("../models/vehicle");

router.put("/registerVehicle", (req, res) => {
  if (
    req.body.beaconId &&
    req.body.name &&
    req.body.vehicleNo &&
    req.body.contact &&
    req.body.routeSpec
  ) {
    const vehicle = new Vehicle({
      beaconId: req.body.beaconId,
      name: req.body.name,
      vehicleNo: req.body.vehicleNo,
      contact: req.body.contact,
      routeSpec: req.body.routeSpec,
    });
    console.log("Vehicle registered :" + vehicle);
    vehicle.save();
    res.send({
      success: true,
      msg: "Vehicle Registered",
    });
  } else res.sendStatus(400); //Bad request
});

module.exports = router;
