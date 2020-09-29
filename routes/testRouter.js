const router = require("express").Router();
const Beacon = require("../models/beacon");
const Checkpoint = require("../models/checkpoint");
const authHelper = require("../utils/authHelper");


router.get("/get", async (req, res) => {
    if (!authHelper.requireLogin(req, res))
    return;
    try {
        let activeBeacons = await Beacon.find({ active: true });
        let checkpoints = await Checkpoint.find({});
        res.json({ success: true, beacons: activeBeacons, checkpoints: checkpoints });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Error occured" });
    }
});
module.exports = router;
