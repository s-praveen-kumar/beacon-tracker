const router = require("express").Router();
const CheckPoint = require("../models/checkpoint");
const authHelper = require("../utils/authHelper");
const sio = require("../utils/socket");

router.get("/get", (req, res) => {
  if (!authHelper.requireLogin(req, res))
    return;
  CheckPoint.find({},'-authSecret',(err, cps) => {
      if (err) {
          res.status(500).json({ success: false, msg: err });
      } else {
          res.json({ success: true, checkpoints: cps });
      }
  })
});

router.post("/create", (req, res) => {
  if (!authHelper.requireLogin(req, res))
    return;
    if (req.body.authData.role != "admin") {
      return res
        .status(403)
        .json({ success: false, msg: "Only admins can create checkpoints" });
    }
  if (req.body.name && req.body.id && req.body.lat && req.body.lon && req.body.authSecret) {
    const checkPoint = new CheckPoint({
	    _id: req.body.id,
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
        if (err.code == 11000) {
          //Duplicate key
          return res.status(400).json({
            success: false,
            msg: "Checkpoint already exists",
          });
        }
        res.status(500).json({
          success: false,
          msg: "Failed with error:" + err,
        });
        sio.io().emit("reload");
      }
    });
  } else {
    res
      .status(400)
      .json({ success: false, msg: "Missing or invalid parameters" });
  }
});
module.exports = router;
