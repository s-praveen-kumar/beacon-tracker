const router = require("express").Router();
const Route = require("../models/route");
const authHelper = require("../utils/authHelper");

router.post("/create", (req, res) => {
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
