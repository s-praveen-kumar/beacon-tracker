const router = require("express").Router();
const Beacon = require("../models/beacon");
const Vehicle = require("../models/vehicle");
const Checkpoint = require("../models/checkpoint");
const authHelper = require("../utils/authHelper");
const sio = require("../utils/socket");

router.post("/track", async (req, res) => {
    try {
        if (req.body.beaconId && req.body.checkpoint && req.body.authSecret) {
            let cp = await Checkpoint.findById(req.body.checkpoint);
            if (!cp) {
                res.status(400).json({ success: false, msg: "Checkpoint not found" });
            } else if (cp.authSecret != req.body.authSecret) {
                res.status(403).json({ status: false, msg: "Invalid credentials" });
            } else {
                let beacon = await Beacon.findById(req.body.beaconId);
                if (!beacon || !beacon.active) {
                    return res
                    .status(400)
                    .json({ success: false, msg: "Invalid Beacon ID" });    
                }
                beacon.lastCheckpoint = cp._id;
                let vehicle = await Vehicle.findById(beacon.currentVehicle);
                vehicle.journey.push({ checkpoint: cp._id });
                await vehicle.save();
                await beacon.save();
                res.json({ success: true, msg: "OK" });
                sio.io().emit("track", { vehicleId: vehicle._id , journey: vehicle.journey});
            }
        } else {
            res
                .status(400)
                .json({ success: false, msg: "Missing or invalid parameters" });
        }
    } catch (err) {
        res.status(500).json({ success: false, msg: "Error occured" });
    }
});

router.get("/active", async (req, res) => {
    if (!authHelper.requireLogin(req, res))
    return;
    try {
        let activeBeacons = await Beacon.find({ active: true });
        let activeVehicles = [];
        for (let beacon of activeBeacons) {
            activeVehicles.push(await Vehicle.findById(beacon.currentVehicle));
        }
        res.json({ success: true, vehicles: activeVehicles });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Error occured" });
    }
});
module.exports = router;
