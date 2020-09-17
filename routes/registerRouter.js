const router = require("express").Router();
const Vehicle = require("../models/vehicle");
const CheckPoint = require("../models/checkpoint");
const Route = require("../models/route");
const authHelper = require("../utils/authHelper");

router.post("/registerVehicle", (req, res) => {
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

router.post("/registerCheckpoint", (req, res) => {
  if (!authHelper.requireLogin(req, res))
    return;
  if (req.body.name && req.body.lat && req.body.lon && req.body.authSecret) {
    const checkPoint = new CheckPoint({
      name: req.body.name,
      location: { lat: req.body.lat, lon: req.body.lon },
      authSecret: req.body.authSecret,
      roads: req.body.roads,
    });
    console.log("Registering new checkpoint: " + checkPoint);
    checkPoint.save((err) => {
      if (!err) {
        console.log("SUCCESS");
        res.json({
          success: true,
          msg: "Checkpoint Registered",
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
      .json({ success: false, msg: "Missing or invalid parameters" });
  }
});
module.exports = router;

router.post("/registerRoute", (req, res) => {
  if (!authHelper.requireLogin(req, res))
    return;
  if (req.body.name && req.body.path) {
    const route = new Route({
      name: req.body.name,
      path: req.body.path,
    });
    console.log("Registering new route: " + route);
    route.save((err) => {
      if (!err) {
        console.log("SUCCESS");
        res.json({
          success: true,
          msg: "New route Registered",
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
      .json({ success: false, msg: "Missing or invalid parameters" });
  }
});
