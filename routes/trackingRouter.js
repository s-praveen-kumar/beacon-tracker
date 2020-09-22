const router = require("express").Router();

router.post("/track", (req, res) => {
    if (req.body.beaconId && req.body.checkpoint && req.body.secret) {
        
    } else {
        res
          .status(400)
          .json({ success: false, msg: "Missing or invalid parameters" });
      }
});
module.exports = router;
