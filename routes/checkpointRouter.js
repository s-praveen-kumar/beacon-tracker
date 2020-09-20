const router = require("express").Router();
const CheckPoint = require("../models/checkpoint");
const authHelper = require("../utils/authHelper");


router.post("/create", (req, res) => {
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
        res.status(201).json({
          success: true,
          msg: "Checkpoint Created",
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