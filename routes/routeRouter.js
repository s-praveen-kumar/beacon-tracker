const router = require("express").Router();
const Route = require("../models/route");
const authHelper = require("../utils/authHelper");
const Checkpoint = require("../models/checkpoint");
const fetch = require("node-fetch");
const sio = require("../utils/socket")

const OSRM_SERVER = "https://routing.openstreetmap.de/routed-car";

async function fetchOSRM(coordinates) {
  const data = await fetch(
    OSRM_SERVER +
      `/route/v1/car/${coordinates}?steps=false&geometries=geojson&overview=full&continue_straight=true`
  );
  const res = await data.json();  return res.routes[0];
}

router.post("/create", async (req, res) => {
  if (!authHelper.requireLogin(req, res))
    return;
  if (req.body.name && req.body.path) {
    let coordinates = "";
    let checkPointArray = await Checkpoint.find({}, '-authSecret');
    let checkpoints = new Map(checkPointArray.map((i) => [i._id, i]));
    for (let cpId of req.body.path) {
      const cp = checkpoints.get(cpId);
      coordinates += cp.location.lon + "," + cp.location.lat + ";";
    }

    const route = new Route({
      name: req.body.name,
      path: req.body.path,
      route: await fetchOSRM(coordinates.slice(0,-1))
    });
    console.log("Registering new route: " + route);
    route.save((err) => {
      if (!err) {
        console.log("SUCCESS");
        res.json({
          success: true,
          msg: "New route Registered",
        });
        sio.io().emit("reload");
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


router.get("/get", (req, res) => {
  if (!authHelper.requireLogin(req, res)) return;
  Route.find((err, routes) => {
      if (err) {
          res.status(500).json({ success: false, msg: err });
      } else {
          res.json({ success: true, routes: routes });
      }
  })
})
module.exports = router;
